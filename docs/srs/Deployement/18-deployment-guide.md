# Deployment Guide

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-DEP-018  
**Standard:** IEEE/ISO/IEC 12207:2017 §6.4.9 — Software Installation Process  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Prerequisites

Before deploying, verify all of the following:

```
Pre-Deployment Checklist
────────────────────────
[ ] All UAT test cases passed (Acceptance Record signed)
[ ] No critical or high-severity open defects
[ ] Git tag v1.0.0 created on main branch
[ ] .env.example files are up to date
[ ] All migrations tested on a staging database
[ ] SSL certificate arranged (Let's Encrypt or institutional CA)
[ ] Server provisioned with min specs (4-core CPU, 8 GB RAM, 100 GB SSD)
[ ] Domain name or IP address assigned
[ ] Team has SSH access to server
```

---

## 2. Server Setup

### 2.1 Install Dependencies

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js
node --version   # Should print v20.x.x
npm --version

# Install Python 3.10+
sudo apt install -y python3.10 python3-pip python3-venv

# Install PostgreSQL 15
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2 globally
sudo npm install -g pm2

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx
```

---

## 3. PostgreSQL Setup

### 3.1 Create Database and Users

```bash
# Open PostgreSQL as superuser
sudo -u postgres psql

# Inside psql:
CREATE DATABASE sdts_production;
CREATE USER sdts_app WITH ENCRYPTED PASSWORD 'STRONG_APP_PASSWORD';
CREATE USER sdts_ai_readonly WITH ENCRYPTED PASSWORD 'STRONG_AI_PASSWORD';
CREATE USER sdts_migrate WITH ENCRYPTED PASSWORD 'STRONG_MIGRATE_PASSWORD';

-- App user: full access to all tables
GRANT CONNECT ON DATABASE sdts_production TO sdts_app;
GRANT USAGE, CREATE ON SCHEMA public TO sdts_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sdts_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sdts_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO sdts_app;

-- AI readonly user
GRANT CONNECT ON DATABASE sdts_production TO sdts_ai_readonly;
GRANT USAGE ON SCHEMA public TO sdts_ai_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO sdts_ai_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO sdts_ai_readonly;

-- Migrate user: full DDL access
GRANT ALL PRIVILEGES ON DATABASE sdts_production TO sdts_migrate;

\q
```

### 3.2 Configure PostgreSQL (Performance Tuning)

Edit `/etc/postgresql/15/main/postgresql.conf`:

```conf
max_connections = 100
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
wal_level = replica
```

Restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

---

## 4. Deploy the Backend

### 4.1 Clone and Install

```bash
cd /opt
sudo git clone https://github.com/your-org/sdts.git
sudo chown -R $USER:$USER /opt/sdts

cd /opt/sdts/backend
npm install --production
```

### 4.2 Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

Fill in all values:

```env
PORT=5000
NODE_ENV=production
DATABASE_URL="postgresql://sdts_app:STRONG_APP_PASSWORD@localhost:5432/sdts_production"
JWT_SECRET="GENERATE_WITH: node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\""
JWT_EXPIRES_IN="8h"
REFRESH_TOKEN_SECRET="ANOTHER_256_BIT_SECRET"
FRONTEND_URL="https://sdts.university.edu"
AI_SERVICE_URL="http://127.0.0.1:5001"
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
SMTP_FROM="noreply@university.edu"
```

### 4.3 Run Database Migrations

```bash
cd /opt/sdts/backend

# Apply all pending migrations
npx prisma migrate deploy

# Seed initial admin account
npx prisma db seed
```

**Seed creates:** `admin@sdts.edu` / `Admin@123` — **change this password immediately after first login.**

### 4.4 Build TypeScript

```bash
npm run build
# Output: dist/ folder
```

### 4.5 Start with PM2

```bash
# Start API in cluster mode (uses all CPU cores)
pm2 start dist/server.js --name sdts-api -i max

# Save PM2 process list (auto-restart on reboot)
pm2 save

# Set PM2 to start on boot
pm2 startup
# Run the printed command (starts with: sudo env PATH=...)
```

---

## 5. Deploy the Python AI Service

### 5.1 Install Dependencies

```bash
cd /opt/sdts/ai_service

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 5.2 Configure Environment

```bash
cp .env.example .env
nano .env
```

```env
AI_SERVICE_PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sdts_production
DB_USER=sdts_ai_readonly
DB_PASSWORD=STRONG_AI_PASSWORD
MODEL_DIR=/opt/sdts/ai_service/models
```

### 5.3 Initial Model Training

If deploying with historical data available:

```bash
source venv/bin/activate
python training/train_all.py
# Trained models saved to models/ directory
```

If no historical data yet (< 100 records), the rule-based fallback will be active automatically.

### 5.4 Start with Gunicorn

```bash
# Start as a background service
source /opt/sdts/ai_service/venv/bin/activate
gunicorn -w 2 -b 127.0.0.1:5001 app:app --daemon \
  --access-logfile /var/log/sdts/ai_access.log \
  --error-logfile /var/log/sdts/ai_error.log

# Create log directory first
sudo mkdir -p /var/log/sdts
```

---

## 6. Build and Deploy the Frontend

```bash
cd /opt/sdts/frontend

# Install dependencies
npm install

# Create .env.production
echo "VITE_API_URL=https://sdts.university.edu/api" > .env.production

# Build for production
npm run build
# Output: dist/ folder

# Copy to Nginx web root
sudo mkdir -p /var/www/sdts
sudo cp -r dist/* /var/www/sdts/
sudo chown -R www-data:www-data /var/www/sdts
```

---

## 7. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/sdts
```

Paste the following:

```nginx
server {
    listen 80;
    server_name sdts.university.edu;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name sdts.university.edu;

    ssl_certificate     /etc/letsencrypt/live/sdts.university.edu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sdts.university.edu/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com";

    # Frontend (React SPA)
    location / {
        root /var/www/sdts;
        index index.html;
        try_files $uri $uri/ /index.html;  # SPA routing
    }

    # Backend API
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/sdts /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Obtain SSL certificate
sudo certbot --nginx -d sdts.university.edu

# Reload Nginx
sudo systemctl reload nginx
```

---

## 8. Post-Deployment Smoke Tests

Run each of the following manually after deployment:

```
Smoke Test Checklist
────────────────────
[ ] https://sdts.university.edu loads (shows login page)
[ ] Login as admin@sdts.edu (immediately change password)
[ ] Dashboard loads in < 3 seconds
[ ] POST /api/auth/login returns a JWT
[ ] Admin can view student list
[ ] No 500 errors in /var/log/nginx/error.log
[ ] PM2 shows sdts-api as "online" (pm2 list)
[ ] AI service responds: curl http://127.0.0.1:5001/health
[ ] SSL certificate valid (browser shows padlock)
[ ] Database backup runs: sudo -u postgres pg_dump sdts_production > test_backup.sql
```

---

## 9. Setting Up Daily Database Backups

```bash
# Create backup script
sudo nano /usr/local/bin/backup-sdts.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/var/backups/sdts
mkdir -p $BACKUP_DIR
sudo -u postgres pg_dump sdts_production | gzip > $BACKUP_DIR/sdts_$DATE.sql.gz
# Keep last 30 backups
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

```bash
sudo chmod +x /usr/local/bin/backup-sdts.sh

# Schedule daily at 2:00 AM
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-sdts.sh
```

---

## 10. Rollback Procedure

If the deployment fails:

1. Stop Node API: `pm2 stop sdts-api`
2. Restore database: `sudo -u postgres psql sdts_production < pre_migration_backup.sql`
3. Check out previous Git tag: `git checkout v0.9.0` (or previous version)
4. Rebuild and restart: `npm run build && pm2 restart sdts-api`
5. Notify supervisor of rollback.

---

## 11. Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | 256-bit random string for JWT signing |
| `REFRESH_TOKEN_SECRET` | Yes | Separate secret for refresh tokens |
| `JWT_EXPIRES_IN` | Yes | Access token lifetime (default: 8h) |
| `AI_SERVICE_URL` | Yes | Internal URL of Python AI service |
| `FRONTEND_URL` | Yes | Frontend origin (for CORS) |
| `SMTP_HOST` | Yes | Email server hostname |
| `SMTP_PORT` | Yes | Email server port |
| `SMTP_USER` | Yes | Email auth username |
| `SMTP_PASS` | Yes | Email auth password |
| `SMTP_FROM` | Yes | Sender email address |
| `NODE_ENV` | Yes | `production` (disables stack traces in responses) |
| `PORT` | No | API port (default: 5000) |
