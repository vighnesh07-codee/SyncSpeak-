# 🚀 Vercel Deployment Guide for Sync-Speak

## Prerequisites
- GitHub account and repository
- Vercel account (vercel.com)
- Deployed MongoDB (MongoDB Atlas)

---

## Step 1: Deploy Backend to Vercel

### 1.1 Push to GitHub
```bash
cd d:\test\Sync-speak
git add .
git commit -m "Add Vercel configuration"
git push
```

### 1.2 Create Backend Project on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Select the `backend` folder as the root directory
4. Click "Deploy"

### 1.3 Add Environment Variables
After deployment, go to **Settings → Environment Variables** and add:

```
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key
COOKIE_SECRET = your_cookie_secret_key
NODE_ENV = production
FRONTEND_URL = https://your-frontend.vercel.app (set after frontend deployment)
```

**Save your backend Vercel URL** (e.g., `https://sync-speak-backend.vercel.app`)

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Frontend Project on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the same GitHub repository
3. Select the `frontend` folder as the root directory
4. In **Build and Output Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 2.2 Add Environment Variables
Add the backend URL:
```
VITE_BACKEND_URL = https://your-backend.vercel.app (from Step 1.3)
```

### 2.3 Deploy
Click "Deploy" and wait for completion. Save your frontend URL.

---

## Step 3: Update Backend Frontend URL

1. Go back to your **Backend Project Settings → Environment Variables**
2. Update `FRONTEND_URL` with your frontend Vercel URL (e.g., `https://sync-speak-frontend.vercel.app`)
3. **Redeploy** the backend project (Settings → Deployments → Redeploy)

---

## Testing Checklist

✅ Backend deployed and accessible  
✅ Frontend deployed and accessible  
✅ Environment variables set correctly  
✅ Test login with demo credentials:
   - Email: `demo@example.com`
   - Password: `demo123`
✅ Test sending/receiving messages  
✅ Check console for CORS errors  

---

## Quick Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `https://your-app.vercel.app` | Web application |
| Backend | `https://your-backend.vercel.app` | API server |
| Database | MongoDB Atlas | Data storage |

---

## Troubleshooting

### CORS Errors
- Check `FRONTEND_URL` environment variable in backend
- Ensure backend is redeployed after changing env vars

### Socket.io Connection Issues
- Verify `FRONTEND_URL` matches frontend deployment URL
- Check browser console for connection errors

### 404 on API Calls
- Verify `VITE_BACKEND_URL` in frontend environment variables
- Check that backend is running and accessible

### MongoDB Connection Failed
- Verify `MONGODB_URI` is correct
- Add Vercel IPs to MongoDB Atlas IP whitelist (or allow all `0.0.0.0/0` for testing)

---

## Local Development

To test locally before deployment:

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm run dev
# Runs on http://localhost:5173

# Terminal 3 - Seed demo user (optional)
cd backend
npm run seed
```

---

## Commands Reference

```bash
# Build frontend
cd frontend && npm run build

# Start backend in production
cd backend && npm start

# Seed demo user
cd backend && npm run seed

# Deploy both to Vercel
vercel --prod  # Run from root after installing Vercel CLI
```
