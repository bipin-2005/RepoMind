# RepoMind Troubleshooting Guide

This guide helps you resolve common issues when using RepoMind.

## Table of Contents
- [Repository Analysis Errors](#repository-analysis-errors)
- [Database Connection Issues](#database-connection-issues)
- [GitHub API Issues](#github-api-issues)
- [Frontend Connection Issues](#frontend-connection-issues)
- [Common Error Messages](#common-error-messages)

---

## Repository Analysis Errors

### Error: "Failed to analyze repository. Please check the URL and try again."

This is a generic error that can have multiple causes. Check the backend console logs for specific error details.

#### Possible Causes & Solutions:

**1. Invalid GitHub URL Format**
- **Error Message**: "Invalid GitHub URL format"
- **Solution**: Ensure your URL follows one of these formats:
  - `https://github.com/owner/repo`
  - `https://github.com/owner/repo.git`
  - `github.com/owner/repo`

**2. Repository Not Found (404)**
- **Error Message**: "Repository not found"
- **Causes**:
  - Repository doesn't exist
  - Repository is private and you don't have access
  - Typo in the repository name or owner
- **Solutions**:
  - Verify the repository exists by visiting the URL in your browser
  - For private repositories, add a GitHub Personal Access Token (see below)
  - Double-check the spelling of owner and repository name

**3. GitHub API Rate Limit Exceeded (403)**
- **Error Message**: "GitHub API rate limit exceeded"
- **Cause**: Without authentication, GitHub limits you to 60 requests per hour
- **Solution**: Add a GitHub Personal Access Token to your `.env` file

**How to add GitHub Token:**

1. Generate a token at: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `public_repo` (for public repos) or `repo` (for private repos)
   - Copy the generated token

2. Edit `repomind/backend/.env`:
   ```env
   GITHUB_TOKEN=your_actual_token_here
   ```

3. Restart the backend server

**4. Database Connection Failed**
- **Error Message**: "Failed to save repository data"
- **Cause**: MongoDB connection issue
- **Solution**: See [Database Connection Issues](#database-connection-issues)

**5. Network/Timeout Issues**
- **Symptoms**: Request takes too long and times out
- **Solutions**:
  - Check your internet connection
  - Try a smaller repository first
  - Check if GitHub is accessible: https://www.githubstatus.com/

---

## Database Connection Issues

### Error: "MongooseError: Operation `repositories.insertOne()` buffering timed out"

**Causes**:
- MongoDB server is not running
- Incorrect MongoDB URI
- Network connectivity issues
- MongoDB Atlas IP whitelist restrictions

**Solutions**:

1. **Verify MongoDB URI** in `repomind/backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

2. **For MongoDB Atlas**:
   - Go to your cluster → Network Access
   - Add your IP address or use `0.0.0.0/0` (allow all) for testing
   - Wait 2-3 minutes for changes to propagate

3. **For Local MongoDB**:
   - Ensure MongoDB is running: `mongod`
   - Use local URI: `MONGODB_URI=mongodb://localhost:27017/repomind`

4. **Test Connection**:
   ```bash
   # In backend directory
   node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI || 'your-uri').then(() => console.log('Connected!')).catch(err => console.error('Error:', err));"
   ```

---

## GitHub API Issues

### Rate Limiting

**Without Token**: 60 requests/hour per IP
**With Token**: 5,000 requests/hour

**Check your rate limit**:
```bash
curl https://api.github.com/rate_limit
```

**Solutions**:
1. Add GitHub token (see above)
2. Wait for rate limit to reset (shown in error message)
3. Use a different network/IP

### Authentication Issues

**Error**: "Bad credentials"
- **Cause**: Invalid or expired GitHub token
- **Solution**: Generate a new token and update `.env`

---

## Frontend Connection Issues

### Error: "Network Error" or "Failed to fetch"

**Causes**:
- Backend server is not running
- Wrong API URL
- CORS issues

**Solutions**:

1. **Verify Backend is Running**:
   - Check terminal for: "🚀 RepoMind API Server Running"
   - Test: Open `http://localhost:5000/api/health` in browser
   - Should see: `{"success":true,"message":"RepoMind API is running"}`

2. **Check API URL** in `repomind/frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Verify CORS Settings** in `repomind/backend/.env`:
   ```env
   CORS_ORIGIN=http://localhost:3002
   ```
   (Match your frontend port)

4. **Restart Both Servers**:
   ```bash
   # Terminal 1 - Backend
   cd repomind/backend
   npm run dev

   # Terminal 2 - Frontend
   cd repomind/frontend
   npm run dev
   ```

---

## Common Error Messages

### "Please provide a GitHub repository URL"
- **Cause**: Empty URL field
- **Solution**: Enter a valid GitHub repository URL

### "Please provide a valid GitHub repository URL"
- **Cause**: URL doesn't contain "github.com"
- **Solution**: Use a GitHub URL (not GitLab, Bitbucket, etc.)

### "AI summary generation failed"
- **Impact**: Analysis continues but without AI insights
- **Cause**: Error in AI service (non-critical)
- **Solution**: Check backend logs for details; repository data is still saved

### "No repositories found"
- **Cause**: No repositories have been analyzed yet
- **Solution**: Go to Repository Analyzer and analyze a repository first

---

## Debugging Steps

### 1. Check Backend Logs

Look for detailed error messages in the backend terminal:
```
Analyzing repository: https://github.com/owner/repo
GitHub API error: Repository not found
```

### 2. Check Browser Console

Open Developer Tools (F12) → Console tab:
- Look for network errors
- Check API request/response details

### 3. Test API Directly

Use curl or Postman to test the API:

```bash
# Health check
curl http://localhost:5000/api/health

# Analyze repository
curl -X POST http://localhost:5000/api/repository/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://github.com/facebook/react"}'
```

### 4. Verify Environment Variables

```bash
# Backend
cd repomind/backend
cat .env

# Frontend
cd repomind/frontend
cat .env
```

### 5. Check Dependencies

```bash
# Backend
cd repomind/backend
npm list

# Frontend
cd repomind/frontend
npm list
```

---

## Still Having Issues?

1. **Clear and Reinstall**:
   ```bash
   # Backend
   cd repomind/backend
   rm -rf node_modules package-lock.json
   npm install

   # Frontend
   cd repomind/frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check System Requirements**:
   - Node.js v14 or higher: `node --version`
   - npm v6 or higher: `npm --version`
   - Internet connection
   - MongoDB access

3. **Try a Known Working Repository**:
   - Test with: `https://github.com/facebook/react`
   - This is a public, well-known repository

4. **Enable Detailed Logging**:
   
   In `repomind/backend/.env`:
   ```env
   NODE_ENV=development
   ```

5. **Check GitHub Status**:
   - Visit: https://www.githubstatus.com/
   - Ensure GitHub API is operational

---

## Quick Fixes Checklist

- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 3002
- [ ] MongoDB is accessible
- [ ] GitHub URL is correct and public
- [ ] Internet connection is working
- [ ] No firewall blocking ports 5000 or 3002
- [ ] Environment variables are set correctly
- [ ] Dependencies are installed (`npm install`)

---

## Getting Help

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/yourusername/repomind/issues)
2. Create a new issue with:
   - Error message (from backend logs)
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)
   - Repository URL you're trying to analyze (if public)

---

*Last Updated: 2026-05-16*