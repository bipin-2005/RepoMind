# RepoMind - AI-Powered Developer Dashboard

An intelligent repository analysis dashboard built with React, Express, and MongoDB. RepoMind helps developers analyze repositories, generate documentation, and improve code quality through AI-powered insights.

![RepoMind Dashboard](https://img.shields.io/badge/Status-MVP%20Complete-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-brightgreen)

## Live Link : https://repo-mind-six.vercel.app/

## 🚀 Features

### ✅ Implemented (MVP)
- **Dashboard**: Analytics and insights for your repositories
  - Repository overview with statistics
  - Tech stack visualization with interactive charts
  - AI-powered insights and recommendations
  - Recent activity feed
  - Quick action buttons
  
- **Repository Analyzer**: Analyze GitHub repositories and uploaded projects
  - GitHub URL input for repository analysis
  - ZIP file upload support
  - Project structure visualization
  - Technology detection
  - Dependency analysis
  - Architecture summary

- **Modern UI/UX**
  - Dark theme with glassmorphism effects
  - Responsive design (mobile, tablet, desktop)
  - Smooth animations and transitions
  - Clean, developer-focused interface

### 🔜 Coming Soon
- Documentation Generator
- Test Generator
- AI Assistant Chat
- User Authentication
- GitHub Integration
- Real-time Analysis

## 📦 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Git installed

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd repomind
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 3. Backend Setup

```bash
# Navigate to backend directory (from root)
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit the .env file with your settings

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. MongoDB Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB (if not running)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in backend/.env
```

## 📁 Project Structure

```
repomind/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── common/     # Button, Card, Input, etc.
│   │   │   ├── layout/     # Sidebar, Navbar, Layout
│   │   │   └── dashboard/  # Dashboard-specific components
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   └── RepositoryAnalyzer.jsx
│   │   ├── services/       # API service layer
│   │   ├── data/           # Mock data
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                  # Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── models/         # MongoDB models
│   │   ├── config/         # Configuration files
│   │   └── server.js       # Entry point
│   ├── .env                # Environment variables
│   └── package.json
│
└── README.md
```

## 📸 Screenshots

<table>
  <tr>
    <td align="center">
      <strong>📊 Dashboard</strong><br><br>
      <img src="https://github.com/user-attachments/assets/fe7a9213-010f-4966-92e5-fbc9547f8fda" alt="Dashboard" width="100%">
    </td>
    <td align="center">
      <strong>🔍 Repository Analyzer</strong><br><br>
      <img src="https://github.com/user-attachments/assets/71c5bafe-4f5e-485d-9a62-5ab67e82ce62" alt="Repository Analyzer" width="100%">
    </td>
  </tr>

  <tr>
    <td align="center">
      <strong>📂 Repository Overview</strong><br><br>
      <img src="https://github.com/user-attachments/assets/ad32112a-c626-4cae-8a2b-71de12b74b61" alt="Repository Overview" width="100%">
    </td>
    <td align="center">
      <strong>📈 AI Insights</strong><br><br>
      <img src="https://github.com/user-attachments/assets/69189840-69b9-4cc2-b2ef-df197bb8f575" alt="AI Insights" width="100%">
    </td>
  </tr>
</table>

## 🎯 Usage

### Analyzing a Repository

1. Navigate to the **Repository Analyzer** page
2. Enter a GitHub repository URL or upload a ZIP file
3. Click "Analyze Repository"
4. View the analysis results including:
   - Project structure
   - Technologies detected
   - Dependencies
   - Architecture summary

### Viewing Dashboard

1. The **Dashboard** displays:
   - Repository overview statistics
   - Language distribution chart
   - AI insights and recommendations
   - Recent activity feed
   - Quick action buttons

## 🔧 Configuration

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend Environment Variables

The `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/repomind
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=http://localhost:3000
```

## 📊 API Endpoints

### Repository Endpoints

- `POST /api/repository/analyze` - Analyze a repository
- `GET /api/repository` - Get all repositories
- `GET /api/repository/:id` - Get repository by ID
- `DELETE /api/repository/:id` - Delete repository

### Health Check

- `GET /api/health` - Check API status

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme optimized for developers
- **Glassmorphism**: Frosted glass effect on cards and components
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Animations**: Smooth transitions and hover effects
- **Typography**: Clean, readable fonts with proper hierarchy

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Heroku/Railway)

```bash
cd backend
# Set environment variables on your platform
# Deploy using platform-specific commands
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by GitHub, Vercel, and modern SaaS dashboards
- Icons by Lucide React
- Charts by Recharts

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for developers**

## 🎯 Roadmap

- [ ] Add user authentication
- [ ] Implement real GitHub API integration
- [ ] Add documentation generator
- [ ] Add test generator
- [ ] Implement AI chat assistant
- [ ] Add code quality metrics
- [ ] Support for multiple programming languages
- [ ] Export reports as PDF
- [ ] Team collaboration features
- [ ] CI/CD integration

## 💡 Tips

- Make sure MongoDB is running before starting the backend
- Use `npm run dev` for development with hot reload
- Check the browser console for any errors
- The app uses mock data initially - connect to real APIs for production

## 🐛 Known Issues

- File upload currently uses mock data
- GitHub API integration pending
- AI features use mock responses

## 📚 Documentation

For detailed documentation, visit the `/docs` folder (coming soon).
