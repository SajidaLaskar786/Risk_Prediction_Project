# EC2 Setup Guide for Risk Prediction Project

This guide explains how to deploy the Risk Prediction Project on an Ubuntu EC2 instance from scratch.

It is written for developers with very basic production deployment knowledge.

---

# 1. Architecture Overview

Your deployment contains:

| Component | Purpose |
|---|---|
| React UI | Frontend application |
| FastAPI | Backend API |
| Gunicorn | Runs FastAPI in production |
| Nginx | Reverse proxy + serves frontend |
| Systemd | Keeps backend running |
| EC2 Ubuntu | Hosting server |

Flow:

```text
Browser
   |
   v
Nginx (Port 80)
   |
   |---- React Frontend
   |
   |---- /api ---> FastAPI Backend (Port 8000)
```

---

# 2. Prerequisites

Before starting:

- AWS account
- EC2 Ubuntu instance
- SSH key pair (`.pem` file)
- Security Group allowing:
  - Port 22 (SSH)
  - Port 80 (HTTP)

---

# 3. Create EC2 Instance

## Step 1 — Open AWS EC2 Console

Go to:

```text
AWS Console → EC2 → Instances
```

Click:

```text
Launch Instance
```

---

## Step 2 — Configure Instance

### Name

```text
risk-prediction-server
```

### AMI

Choose:

```text
Ubuntu Server 24.04 LTS
```

### Instance Type

```text
t2.micro
preferably with 4GB RAM
```

### Key Pair

Choose existing `.pem` key or create new one.

Download and save it safely.

---

## Step 3 — Security Group

Allow:

| Type | Port |
|---|---|
| SSH | 22 |
| HTTP | 80 |
| TCP | 8000 |

---

## Step 4 — Launch Instance

Click:

```text
Launch Instance
```

---

# 4. Connect to EC2

From terminal:

```bash
chmod 400 my-key.pem
```

Connect:

```bash
ssh -i my-key.pem ubuntu@<EC2_PUBLIC_IP>
```

---

# 5. Update Server

Run:

```bash
sudo apt update -y
```

---

# 6. Install Required Software

```bash
sudo apt install -y \
    python3-pip \
    python3-venv \
    git \
    nginx
```

---

# 7. Install Node.js 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify:

```bash
node -v
npm -v
```

---

# 8. Start Nginx

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

# 9. Clone GitHub Repository

```bash
cd /home/ubuntu

git clone https://github.com/SajidaLaskar786/Risk_Prediction_Project.git
```

---

# 10. Fix Permissions

```bash
chmod o+x /home/ubuntu
chmod -R 755 /home/ubuntu/Risk_Prediction_Project
```

---

# 11. Backend Setup

```bash
cd /home/ubuntu/Risk_Prediction_Project

python3 -m venv venv

source venv/bin/activate

pip install --upgrade pip

pip install -r requirement.txt

pip install gunicorn uvicorn
```

---

# 12. Test Backend Manually

```bash
uvicorn api.main:app --host 0.0.0.0 --port 8000
```

Press CTRL + C to stop.

---

# 13. Frontend Setup

```bash
cd /home/ubuntu/Risk_Prediction_Project/UI
```

Install dependencies:

```bash
npm install
```

---


# 15. Build React Application

```bash
npm run build
```

---

# 16. Create Systemd Service

```bash
sudo nano /etc/systemd/system/risk-prediction-backend.service
```

Paste:

```ini
[Unit]
Description=FastAPI Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/Risk_Prediction_Project

Environment="PATH=/home/ubuntu/Risk_Prediction_Project/api/venv/bin"

ExecStart=/home/ubuntu/Risk_Prediction_Project/api/venv/bin/gunicorn \
  -w 4 \
  -k uvicorn.workers.UvicornWorker \
  -b 0.0.0.0:8000 \
  api.main:app

Restart=always

[Install]
WantedBy=multi-user.target
```

---

# 17. Start Backend Service

```bash
sudo systemctl daemon-reload

sudo systemctl enable risk-prediction-backend

sudo systemctl start risk-prediction-backend

sudo systemctl status risk-prediction-backend
```

---

# 18. Configure Nginx

```bash
sudo rm -f /etc/nginx/sites-enabled/default

sudo nano /etc/nginx/sites-available/riskpredictionapp
```

Paste:

```nginx
server {
    listen 80;
    server_name _;

    root /home/ubuntu/Risk_Prediction_Project/UI/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000/;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

# 19. Enable Nginx Configuration

```bash
sudo ln -sf /etc/nginx/sites-available/riskpredictionapp \
/etc/nginx/sites-enabled/riskpredictionapp
```

---

# 20. Test Nginx

```bash
sudo nginx -t
```

---

# 21. Restart Nginx

```bash
sudo systemctl restart nginx
```

---

# 22. Open Application

```text
http://<EC2_PUBLIC_IP>
```

---

# 23. Useful Debug Commands

## Backend Logs

```bash
sudo journalctl -u risk-prediction-backend -f
```

## Last 200 Backend Logs

```bash
sudo journalctl -u risk-prediction-backend -n 200 --no-pager
```

## Nginx Error Logs

```bash
sudo tail -f /var/log/nginx/error.log
```

## Nginx Access Logs

```bash
sudo tail -f /var/log/nginx/access.log
```

---

# 24. Common Problems

## 502 Bad Gateway

Cause:
Backend not running.

Check:

```bash
sudo systemctl status risk-prediction-backend
```

---

## ModuleNotFoundError

Ensure:

```ini
WorkingDirectory=/home/ubuntu/Risk_Prediction_Project
```

and:

```ini
ExecStart=... api.main:app
```

---

## `/undefined/mht`

Cause:
Wrong environment variable name.

Correct:

```env
REACT_APP_MODEL_SERVICE_URL=/api
```

Then rebuild:

```bash
npm run build
```

---

# 25. Restart Commands

Restart backend:

```bash
sudo systemctl restart risk-prediction-backend
```

Restart nginx:

```bash
sudo systemctl restart nginx
```

---

# 26. Deployment Update Flow

## Backend Changes

```bash
cd /home/ubuntu/Risk_Prediction_Project

git pull

sudo systemctl restart risk-prediction-backend
```

---

## Frontend Changes

```bash
cd /home/ubuntu/Risk_Prediction_Project/UI

git pull

npm install

npm run build

sudo systemctl restart nginx
```

---

# Deployment Completed

Your production setup now includes:

- React frontend
- FastAPI backend
- Gunicorn
- Nginx reverse proxy
- Auto-restarting backend service
- Production-ready deployment flow
