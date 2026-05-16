# 🚀 RepoMind - Quick Setup Guide

Follow these steps to get RepoMind up and running on your local machine.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] MongoDB installed and running
- [ ] Git installed
- [ ] A code editor (VS Code recommended)

## Step-by-Step Setup

### 1️⃣ Install Dependencies

#### Frontend
```bash
cd repomind/frontend
npm install
```

#### Backend
```bash
cd repomind/backend
npm install
```

### 2️⃣ Configure Environment

The `.env` file is already created in the backend folder. Update it if needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/repomind
CORS_ORIGIN=http://localhost:3000
```

### 3️⃣ Start MongoDB

Make sure MongoDB is running:

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud) by updating the `MONGODB_URI` in `.env`

### 4️⃣ Start the Application

#### Terminal 1 - Backend
```bash
cd repomind/backend
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 RepoMind API Server Running
Port: 5000
```

#### Terminal 2 - Frontend
```bash
cd repomind/frontend
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜ Local: http://localhost:3000
```

### 5️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🎯 What You'll See

1. **Dashboard Page** - Overview with analytics, charts, and insights
2. **Repository Analyzer** - Analyze GitHub repos or upload ZIP files
3. **Sidebar Navigation** - Easy navigation between pages
4. **Dark Theme UI** - Modern glassmorphism design

## 🧪 Testing the Features

### Test Dashboard
- View repository statistics
- Check the language distribution chart
- Review AI insights
- See recent activity feed

### Test Repository Analyzer
1. Click "Repository Analyzer" in sidebar
2. Enter a GitHub URL: `https://github.com/username/repo`
3. Click "Analyze Repository"
4. Wait for analysis (mock data will load)
5. View the results

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# If not, start it
mongod
```

### Port Already in Use
```bash
# Frontend (change port in vite.config.js)
# Backend (change PORT in .env)
```

### Dependencies Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
- Make sure backend is running on port 5000
- Check CORS_ORIGIN in backend/.env matches frontend URL

## 📦 Project Structure

```
repomind/
├── frontend/          # React app (Port 3000)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── data/
│   └── package.json
│
├── backend/           # Express API (Port 5000)
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── server.js
│   └── package.json
│
└── README.md
```

## ✅ Verification Checklist

After setup, verify:

- [ ] Frontend loads at http://localhost:3000
- [ ] Backend API responds at http://localhost:5000/api/health
- [ ] MongoDB connection successful
- [ ] Dashboard displays mock data
- [ ] Repository Analyzer accepts input
- [ ] Navigation works between pages
- [ ] Charts render correctly
- [ ] Dark theme applied
- [ ] Responsive on mobile view

## 🎨 Features to Explore

1. **Dashboard**
   - Repository overview cards
   - Tech stack pie chart
   - AI insights panel
   - Recent activity feed
   - Quick action buttons

2. **Repository Analyzer**
   - GitHub URL input
   - ZIP file upload
   - Project structure view
   - Technology detection
   - Dependencies list
   - Architecture summary

## 🚀 Next Steps

1. Explore the codebase
2. Customize the UI/theme
3. Add real GitHub API integration
4. Implement authentication
5. Deploy to production

## 💡 Tips

- Use `npm run dev` for hot reload during development
- Check browser console for errors
- MongoDB must be running before starting backend
- Frontend proxies API calls to backend via Vite config

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com)

## 🆘 Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check port availability
5. Review the main README.md

---

**Happy Coding! 🎉**