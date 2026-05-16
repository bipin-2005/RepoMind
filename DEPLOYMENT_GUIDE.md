# RepoMind Deployment Guide

Complete guide for deploying RepoMind to Vercel (Frontend) and Render (Backend).

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - For repository hosting
2. **Vercel Account** - For frontend deployment (free tier available)
3. **Render Account** - For backend deployment (free tier available)
4. **MongoDB Atlas Account** - For database (free tier available)
5. **OpenAI API Key** - For AI features
6. **GitHub Personal Access Token** - For repository analysis

---

## 🗄️ Step 1: Setup MongoDB Atlas

### 1.1 Create Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0)
3. Create a database user with password
4. Whitelist all IP addresses (0.0.0.0/0) for Render access
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/repomind?retryWrites=true&w=majority
   ```

### 1.2 Note Your Credentials

Save these for later:
- MongoDB URI
- Database name: `repomind`

---

## 🚀 Step 2: Deploy Backend to Render

### 2.1 Push Code to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2.2 Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- **Name**: `repomind-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**

Click **"Advanced"** and add these environment variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
CORS_ORIGIN=<your-vercel-frontend-url>
GITHUB_TOKEN=<your-github-token>
OPENAI_API_KEY=<your-openai-key>
```

**Note:** You'll update `CORS_ORIGIN` after deploying the frontend.

### 2.3 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://repomind-backend.onrender.com`

### 2.4 Test Backend

Visit: `https://your-backend-url.onrender.com/api/health`

You should see:
```json
{
  "status": "ok",
  "message": "RepoMind API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🌐 Step 3: Deploy Frontend to Vercel

### 3.1 Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 3.2 Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:

**Framework Preset:** Vite

**Root Directory:** `frontend`

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**

Add this environment variable:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url` with your actual Render backend URL.

### 3.3 Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Note your frontend URL: `https://repomind.vercel.app`

### 3.4 Update Backend CORS

Go back to Render dashboard:

1. Open your backend service
2. Go to **"Environment"**
3. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
4. Save changes (service will redeploy)

---

## 🔧 Step 4: Configuration Files

### 4.1 Frontend Environment Variables

Create `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 4.2 Backend Environment Variables

Ensure these are set in Render:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/repomind
CORS_ORIGIN=https://your-app.vercel.app
GITHUB_TOKEN=ghp_your_github_token
OPENAI_API_KEY=sk-your_openai_key
```

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Backend

```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "RepoMind API is running"
}
```

### 5.2 Test Frontend

1. Visit your Vercel URL
2. Open browser DevTools → Network tab
3. Check API calls are going to your Render backend
4. Test repository analysis feature

### 5.3 Test Full Flow

1. Navigate to Repository Analyzer
2. Enter a GitHub repository URL
3. Click "Analyze Repository"
4. Verify data loads correctly
5. Check Dashboard displays analysis

---

## 🔐 Step 6: Secure Your Deployment

### 6.1 Environment Variables Security

✅ **Never commit these to Git:**
- `.env` files
- API keys
- Database credentials
- Tokens

✅ **Use platform environment variables:**
- Vercel: Dashboard → Project → Settings → Environment Variables
- Render: Dashboard → Service → Environment

### 6.2 CORS Configuration

The backend is configured to accept requests from:
- Your Vercel frontend URL
- `localhost:3000` (development)
- `localhost:5173` (Vite dev server)

### 6.3 Rate Limiting (Optional)

Consider adding rate limiting to your backend:

```bash
cd backend
npm install express-rate-limit
```

Update `backend/src/server.js`:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🔄 Step 7: Continuous Deployment

### 7.1 Automatic Deployments

Both Vercel and Render support automatic deployments:

**Vercel:**
- Automatically deploys on push to `main` branch
- Preview deployments for pull requests

**Render:**
- Automatically deploys on push to `main` branch
- Manual deploy option available

### 7.2 Deployment Workflow

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel and Render will automatically deploy
```

### 7.3 Rollback

**Vercel:**
1. Go to Deployments
2. Find previous deployment
3. Click "Promote to Production"

**Render:**
1. Go to Events
2. Find previous deployment
3. Click "Redeploy"

---

## 📊 Step 8: Monitoring

### 8.1 Vercel Analytics

1. Go to your project in Vercel
2. Navigate to **Analytics** tab
3. View performance metrics

### 8.2 Render Logs

1. Go to your service in Render
2. Click **"Logs"** tab
3. Monitor real-time logs

### 8.3 MongoDB Atlas Monitoring

1. Go to MongoDB Atlas dashboard
2. View **Metrics** tab
3. Monitor database performance

---

## 🐛 Troubleshooting

### Issue: CORS Errors

**Solution:**
1. Verify `CORS_ORIGIN` in Render matches your Vercel URL exactly
2. Check browser console for exact error
3. Ensure no trailing slashes in URLs

### Issue: API Not Connecting

**Solution:**
1. Check `VITE_API_URL` in Vercel environment variables
2. Verify backend health endpoint works
3. Check Render logs for errors

### Issue: MongoDB Connection Failed

**Solution:**
1. Verify MongoDB URI is correct
2. Check IP whitelist includes 0.0.0.0/0
3. Verify database user has correct permissions

### Issue: Build Failures

**Frontend:**
```bash
# Clear cache and rebuild
cd frontend
rm -rf node_modules dist
npm install
npm run build
```

**Backend:**
```bash
# Check dependencies
cd backend
npm install
npm start
```

### Issue: Environment Variables Not Loading

**Solution:**
1. Verify variables are set in platform dashboard
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

---

## 🚀 Performance Optimization

### Frontend Optimization

1. **Enable Vercel Analytics**
   - Automatic performance monitoring
   - Core Web Vitals tracking

2. **Image Optimization**
   - Use Vercel Image Optimization
   - Lazy load images

3. **Code Splitting**
   - Already configured with Vite
   - Automatic chunk splitting

### Backend Optimization

1. **Database Indexing**
   ```javascript
   // Add indexes to frequently queried fields
   repositorySchema.index({ url: 1 });
   repositorySchema.index({ analyzedAt: -1 });
   ```

2. **Caching**
   - Implement Redis for API caching
   - Cache GitHub API responses

3. **Connection Pooling**
   - MongoDB connection pooling (already configured)

---

## 📈 Scaling

### Free Tier Limits

**Vercel:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic scaling

**Render:**
- 750 hours/month (free tier)
- Sleeps after 15 min inactivity
- 512 MB RAM

**MongoDB Atlas:**
- 512 MB storage
- Shared cluster
- Limited connections

### Upgrade Path

When you need more:

1. **Vercel Pro** ($20/month)
   - More bandwidth
   - Advanced analytics
   - Team collaboration

2. **Render Starter** ($7/month)
   - No sleep
   - More resources
   - Better performance

3. **MongoDB Atlas M10** ($57/month)
   - Dedicated cluster
   - More storage
   - Better performance

---

## 🔒 Security Checklist

- [ ] All API keys in environment variables
- [ ] CORS properly configured
- [ ] MongoDB IP whitelist configured
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] Rate limiting implemented
- [ ] Input validation on backend
- [ ] Error messages don't expose sensitive info
- [ ] Dependencies regularly updated

---

## 📝 Maintenance

### Regular Tasks

**Weekly:**
- Check error logs
- Monitor performance metrics
- Review API usage

**Monthly:**
- Update dependencies
- Review security advisories
- Check database size

**Quarterly:**
- Review and optimize queries
- Update documentation
- Performance audit

---

## 🎉 Success!

Your RepoMind application is now deployed and running in production!

**Frontend:** https://your-app.vercel.app
**Backend:** https://your-backend.onrender.com
**Database:** MongoDB Atlas

---

## 📞 Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review platform documentation:
   - [Vercel Docs](https://vercel.com/docs)
   - [Render Docs](https://render.com/docs)
   - [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com/
- **MongoDB Atlas**: https://cloud.mongodb.com/
- **GitHub Repository**: https://github.com/your-username/repomind

---

*Deployment guide created for RepoMind v1.0.0*
*Last updated: 2024*