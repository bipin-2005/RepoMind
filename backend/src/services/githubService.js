import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Parse GitHub repository URL to extract owner and repo name
 * @param {string} url - GitHub repository URL
 * @returns {object} - { owner, repo }
 */
export const parseGitHubUrl = (url) => {
  try {
    // Handle various GitHub URL formats
    const patterns = [
      /github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?$/,
      /github\.com\/([^\/]+)\/([^\/]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          owner: match[1],
          repo: match[2].replace('.git', '')
        };
      }
    }

    throw new Error('Invalid GitHub URL format');
  } catch (error) {
    throw new Error(`Failed to parse GitHub URL: ${error.message}`);
  }
};

/**
 * Create GitHub API client with optional authentication
 * @returns {object} - Axios instance configured for GitHub API
 */
const createGitHubClient = () => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'RepoMind-App'
  };

  // Add GitHub token if available and valid (for higher rate limits)
  // Only add token if it's not the placeholder value
  if (process.env.GITHUB_TOKEN &&
      process.env.GITHUB_TOKEN !== 'your_github_token_here' &&
      process.env.GITHUB_TOKEN !== 'your_github_personal_access_token_here') {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  return axios.create({
    baseURL: GITHUB_API_BASE,
    headers
  });
};

/**
 * Fetch repository metadata from GitHub
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @returns {object} - Repository metadata
 */
export const fetchRepositoryMetadata = async (owner, repo) => {
  try {
    const client = createGitHubClient();
    const response = await client.get(`/repos/${owner}/${repo}`);
    
    return {
      id: response.data.id,
      name: response.data.name,
      fullName: response.data.full_name,
      owner: response.data.owner.login,
      ownerAvatar: response.data.owner.avatar_url,
      description: response.data.description || 'No description provided',
      url: response.data.html_url,
      homepage: response.data.homepage,
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      watchers: response.data.watchers_count,
      openIssues: response.data.open_issues_count,
      language: response.data.language,
      createdAt: response.data.created_at,
      updatedAt: response.data.updated_at,
      pushedAt: response.data.pushed_at,
      size: response.data.size,
      defaultBranch: response.data.default_branch,
      isPrivate: response.data.private,
      isFork: response.data.fork,
      hasIssues: response.data.has_issues,
      hasWiki: response.data.has_wiki,
      license: response.data.license?.name || 'No license',
      topics: response.data.topics || []
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Repository not found');
    } else if (error.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please add GITHUB_TOKEN to .env');
    }
    throw new Error(`Failed to fetch repository metadata: ${error.message}`);
  }
};

/**
 * Fetch repository languages
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @returns {object} - Languages with percentages
 */
export const fetchRepositoryLanguages = async (owner, repo) => {
  try {
    const client = createGitHubClient();
    const response = await client.get(`/repos/${owner}/${repo}/languages`);
    
    const languages = response.data;
    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    
    // Convert bytes to percentages
    const languagePercentages = {};
    for (const [lang, bytes] of Object.entries(languages)) {
      languagePercentages[lang] = parseFloat(((bytes / total) * 100).toFixed(2));
    }
    
    return languagePercentages;
  } catch (error) {
    console.error('Error fetching languages:', error.message);
    return {};
  }
};

/**
 * Fetch repository contributors
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {number} limit - Maximum number of contributors to fetch
 * @returns {array} - List of contributors
 */
export const fetchRepositoryContributors = async (owner, repo, limit = 10) => {
  try {
    const client = createGitHubClient();
    const response = await client.get(`/repos/${owner}/${repo}/contributors`, {
      params: { per_page: limit }
    });
    
    return response.data.map(contributor => ({
      login: contributor.login,
      avatar: contributor.avatar_url,
      contributions: contributor.contributions,
      url: contributor.html_url
    }));
  } catch (error) {
    console.error('Error fetching contributors:', error.message);
    return [];
  }
};

/**
 * Fetch repository structure (tree)
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} branch - Branch name (default: main/master)
 * @returns {object} - Repository structure
 */
export const fetchRepositoryStructure = async (owner, repo, branch = null) => {
  try {
    const client = createGitHubClient();
    
    // Get default branch if not specified
    if (!branch) {
      const repoData = await client.get(`/repos/${owner}/${repo}`);
      branch = repoData.data.default_branch;
    }
    
    // Fetch repository tree
    const response = await client.get(`/repos/${owner}/${repo}/git/trees/${branch}`, {
      params: { recursive: 1 }
    });
    
    const tree = response.data.tree;
    
    // Analyze structure
    const structure = {
      totalFiles: 0,
      totalFolders: 0,
      fileTypes: {},
      folders: []
    };
    
    const folderMap = new Map();
    
    tree.forEach(item => {
      if (item.type === 'blob') {
        structure.totalFiles++;
        
        // Count file types
        const ext = item.path.split('.').pop();
        structure.fileTypes[ext] = (structure.fileTypes[ext] || 0) + 1;
        
        // Track folder
        const folderPath = item.path.split('/').slice(0, -1).join('/');
        if (folderPath) {
          folderMap.set(folderPath, (folderMap.get(folderPath) || 0) + 1);
        }
      } else if (item.type === 'tree') {
        structure.totalFolders++;
      }
    });
    
    // Convert folder map to array
    structure.folders = Array.from(folderMap.entries())
      .map(([name, files]) => ({ name, files, type: 'directory' }))
      .sort((a, b) => b.files - a.files)
      .slice(0, 10); // Top 10 folders
    
    return structure;
  } catch (error) {
    console.error('Error fetching repository structure:', error.message);
    return {
      totalFiles: 0,
      totalFolders: 0,
      fileTypes: {},
      folders: []
    };
  }
};

/**
 * Fetch recent commits
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {number} limit - Maximum number of commits to fetch
 * @returns {array} - List of recent commits
 */
export const fetchRecentCommits = async (owner, repo, limit = 10) => {
  try {
    const client = createGitHubClient();
    const response = await client.get(`/repos/${owner}/${repo}/commits`, {
      params: { per_page: limit }
    });
    
    return response.data.map(commit => ({
      sha: commit.sha.substring(0, 7),
      message: commit.commit.message.split('\n')[0],
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url
    }));
  } catch (error) {
    console.error('Error fetching commits:', error.message);
    return [];
  }
};

/**
 * Fetch repository README
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @returns {string} - README content
 */
export const fetchRepositoryReadme = async (owner, repo) => {
  try {
    const client = createGitHubClient();
    const response = await client.get(`/repos/${owner}/${repo}/readme`, {
      headers: { 'Accept': 'application/vnd.github.v3.raw' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching README:', error.message);
    return null;
  }
};

/**
 * Analyze repository comprehensively
 * @param {string} url - GitHub repository URL
 * @returns {object} - Complete repository analysis
 */
export const analyzeGitHubRepository = async (url) => {
  try {
    // Parse URL
    const { owner, repo } = parseGitHubUrl(url);
    
    // Fetch all data in parallel
    const [
      metadata,
      languages,
      contributors,
      structure,
      commits
    ] = await Promise.all([
      fetchRepositoryMetadata(owner, repo),
      fetchRepositoryLanguages(owner, repo),
      fetchRepositoryContributors(owner, repo, 10),
      fetchRepositoryStructure(owner, repo),
      fetchRecentCommits(owner, repo, 10)
    ]);
    
    // Generate insights based on data
    const insights = generateInsights(metadata, languages, structure);
    
    return {
      metadata,
      languages,
      contributors,
      structure,
      commits,
      insights,
      analyzedAt: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Repository analysis failed: ${error.message}`);
  }
};

/**
 * Generate insights from repository data
 * @param {object} metadata - Repository metadata
 * @param {object} languages - Language distribution
 * @param {object} structure - Repository structure
 * @returns {array} - Generated insights
 */
const generateInsights = (metadata, languages, structure) => {
  const insights = [];
  
  // Popularity insight
  if (metadata.stars > 1000) {
    insights.push({
      type: 'success',
      icon: 'Star',
      title: 'Popular Repository',
      description: `This repository has ${metadata.stars.toLocaleString()} stars`,
      severity: 'low'
    });
  }
  
  // Activity insight
  const daysSinceUpdate = Math.floor(
    (new Date() - new Date(metadata.pushedAt)) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceUpdate < 7) {
    insights.push({
      type: 'success',
      icon: 'Activity',
      title: 'Active Development',
      description: `Last updated ${daysSinceUpdate} day(s) ago`,
      severity: 'low'
    });
  } else if (daysSinceUpdate > 180) {
    insights.push({
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Inactive Repository',
      description: `No updates in ${daysSinceUpdate} days`,
      severity: 'medium'
    });
  }
  
  // Language diversity
  const languageCount = Object.keys(languages).length;
  if (languageCount > 5) {
    insights.push({
      type: 'info',
      icon: 'Code',
      title: 'Multi-Language Project',
      description: `Uses ${languageCount} different programming languages`,
      severity: 'low'
    });
  }
  
  // Size insight
  if (structure.totalFiles > 500) {
    insights.push({
      type: 'info',
      icon: 'FolderTree',
      title: 'Large Codebase',
      description: `Contains ${structure.totalFiles} files`,
      severity: 'low'
    });
  }
  
  // Issues insight
  if (metadata.openIssues > 50) {
    insights.push({
      type: 'warning',
      icon: 'AlertCircle',
      title: 'Many Open Issues',
      description: `${metadata.openIssues} open issues need attention`,
      severity: 'medium'
    });
  }
  
  return insights;
};

// Made with Bob