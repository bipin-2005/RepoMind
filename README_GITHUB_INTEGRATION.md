# GitHub Repository Analysis Integration

This document describes the GitHub API integration implemented in RepoMind.

## Overview

The application now uses the **GitHub REST API** to fetch real repository data instead of mock data. This provides accurate, live information about GitHub repositories including metadata, languages, contributors, commits, and more.

## Features Implemented

### 1. GitHub Repository URL Parsing
- Supports various GitHub URL formats
- Extracts owner and repository name
- Located in: `backend/src/services/githubService.js`

### 2. GitHub API Integration
- Fetches repository metadata (stars, forks, watchers, issues)
- Detects programming languages with percentages
- Retrieves repository structure and file tree
- Gets top contributors with avatars
- Fetches recent commits
- Generates AI-powered insights based on repository data

### 3. Real-Time Data Display
- **Dashboard**: Shows latest analyzed repository with live GitHub stats
- **Repository Analyzer**: Analyzes any public GitHub repository
- **Contributors**: Displays top contributors with avatars and commit counts
- **Recent Activity**: Shows recent commits as activity feed
- **Insights**: AI-generated insights based on repository metrics

## API Endpoints

### Backend Routes

#### Analyze Repository
```
POST /api/repository/analyze
Body: { "url": "https://github.com/owner/repo" }
```

#### Get All Repositories
```
GET /api/repository
```

#### Get Repository by ID
```
GET /api/repository/:id
```

## GitHub API Rate Limits

### Without Authentication
- 60 requests per hour per IP address

### With GitHub Token (Recommended)
- 5,000 requests per hour

## Setup Instructions

### 1. Get a GitHub Personal Access Token (Optional but Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo` (for public repositories)
4. Copy the generated token

### 2. Configure Environment Variables

Edit `backend/.env`:

```env
# Add your GitHub token (optional but recommended for higher rate limits)
GITHUB_TOKEN=your_github_personal_access_token_here
```

### 3. Install Dependencies

Backend:
```bash
cd repomind/backend
npm install
```

Frontend:
```bash
cd repomind/frontend
npm install
```

### 4. Start the Application

Terminal 1 - Backend:
```bash
cd repomind/backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd repomind/frontend
npm run dev
```

### 5. Test the Integration

1. Open the application at `http://localhost:3000`
2. Navigate to "Repository Analyzer"
3. Enter a GitHub repository URL (e.g., `https://github.com/facebook/react`)
4. Click "Analyze Repository"
5. View the real GitHub data displayed

## Data Retrieved from GitHub API

### Repository Metadata
- Name, description, owner
- Stars, forks, watchers
- Open issues count
- Creation and update dates
- License information
- Repository topics/tags

### Languages
- Programming languages used
- Percentage distribution
- Byte count per language

### Contributors
- Top 10 contributors
- Avatar images
- Contribution counts
- GitHub profile links

### Repository Structure
- Total files and folders
- File type distribution
- Top folders by file count

### Recent Commits
- Last 10 commits
- Commit messages
- Author names
- Commit dates and SHAs

### AI-Generated Insights
- Repository popularity assessment
- Activity level analysis
- Language diversity insights
- Codebase size evaluation
- Issue management status

## Files Modified/Created

### Backend
- ✅ `backend/src/services/githubService.js` (NEW) - GitHub API integration
- ✅ `backend/src/controllers/repositoryController.js` - Updated to use GitHub service
- ✅ `backend/src/models/Repository.js` - Added githubData schema fields

### Frontend
- ✅ `frontend/src/pages/Dashboard.jsx` - Updated to display real GitHub data
- ✅ `frontend/src/pages/RepositoryAnalyzer.jsx` - Updated to call real API
- ✅ `frontend/src/services/api.js` - Already configured for API calls

## UI Features Preserved

All existing UI components remain unchanged:
- ✅ Responsive design
- ✅ Dark theme with glassmorphism
- ✅ Animated transitions
- ✅ Loading states
- ✅ Error handling
- ✅ Card layouts
- ✅ Charts and visualizations

## Error Handling

The application handles various error scenarios:
- Invalid GitHub URLs
- Repository not found (404)
- API rate limit exceeded (403)
- Network errors
- Missing data gracefully handled with fallbacks

## Testing Examples

Try analyzing these popular repositories:
- `https://github.com/facebook/react`
- `https://github.com/microsoft/vscode`
- `https://github.com/nodejs/node`
- `https://github.com/vercel/next.js`
- `https://github.com/tailwindlabs/tailwindcss`

## Limitations

1. **Public Repositories Only**: Currently supports only public repositories
2. **No File Content Analysis**: Doesn't analyze actual code content (would require additional API calls)
3. **Basic Insights**: AI insights are rule-based, not using advanced AI models
4. **Rate Limits**: Subject to GitHub API rate limits

## Future Enhancements

- [ ] Support for private repositories (with OAuth)
- [ ] Deep code analysis using GitHub's code search API
- [ ] Integration with OpenAI for advanced insights
- [ ] Caching mechanism to reduce API calls
- [ ] Webhook support for real-time updates
- [ ] Batch repository analysis
- [ ] Export reports as PDF

## Troubleshooting

### "Repository not found" Error
- Verify the GitHub URL is correct
- Ensure the repository is public
- Check if the repository exists

### "API rate limit exceeded" Error
- Add a GitHub token to `.env` file
- Wait for the rate limit to reset (1 hour)
- Use a different IP address or GitHub account

### "Failed to analyze repository" Error
- Check backend server is running
- Verify MongoDB is connected
- Check network connectivity
- Review backend console for detailed errors

## Support

For issues or questions:
1. Check the console logs (browser and backend)
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check GitHub API status: https://www.githubstatus.com/

---

**Made with Bob** 🤖