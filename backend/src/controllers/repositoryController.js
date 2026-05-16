import Repository from '../models/Repository.js';
import { analyzeGitHubRepository } from '../services/githubService.js';
import { generateRepositorySummary, generateQuickInsights, generateReadme } from '../services/aiService.js';

// @desc    Analyze a repository
// @route   POST /api/repository/analyze
// @access  Public
export const analyzeRepository = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a GitHub repository URL',
      });
    }

    // Validate GitHub URL format
    if (!url.includes('github.com')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid GitHub repository URL',
      });
    }

    console.log(`Analyzing repository: ${url}`);

    // Analyze repository using GitHub API
    let analysis;
    try {
      analysis = await analyzeGitHubRepository(url);
      console.log('GitHub analysis completed successfully');
    } catch (error) {
      console.error('GitHub API error:', error.message);
      // Return more specific error messages
      if (error.message.includes('Repository not found')) {
        return res.status(404).json({
          success: false,
          message: 'Repository not found. Please check the URL and ensure the repository is public.',
        });
      } else if (error.message.includes('rate limit')) {
        return res.status(429).json({
          success: false,
          message: 'GitHub API rate limit exceeded. Please add a GITHUB_TOKEN to your .env file or try again later.',
        });
      } else if (error.message.includes('Invalid GitHub URL')) {
        return res.status(400).json({
          success: false,
          message: 'Invalid GitHub URL format. Please use: https://github.com/owner/repo',
        });
      }
      throw error;
    }

    // Generate AI summary
    let aiSummary;
    try {
      aiSummary = await generateRepositorySummary({
        metadata: analysis.metadata,
        languages: analysis.languages,
        structure: analysis.structure,
        contributors: analysis.contributors,
        commits: analysis.commits,
        frameworks: detectFrameworks(analysis.structure)
      });
      console.log('AI summary generated successfully');
      
      // Debug: Check the type of topFolders before processing
      console.log('topFolders type:', typeof aiSummary?.structure?.topFolders);
      console.log('topFolders value:', aiSummary?.structure?.topFolders);
      
      // Deep clone to avoid reference issues and ensure proper serialization
      aiSummary = JSON.parse(JSON.stringify(aiSummary));
      
    } catch (error) {
      console.error('AI summary generation error:', error.message);
      // Continue without AI summary if it fails
      aiSummary = {
        overview: {
          summary: 'AI summary generation failed',
          architecture: '',
          activityLevel: 'Unknown',
          complexityScore: 0,
          lastUpdated: new Date()
        },
        technologies: {
          frontend: { languages: [], frameworks: [], tools: [] },
          backend: { languages: [], frameworks: [], tools: [] },
          languages: []
        },
        structure: {
          summary: '',
          totalFiles: 0,
          totalFolders: 0,
          topFolders: []
        },
        improvements: [],
        metrics: {
          contributors: 0,
          commits: 0,
          stars: 0,
          forks: 0,
          openIssues: 0
        }
      };
    }

    // Generate additional insights from AI summary
    const aiInsights = generateQuickInsights(aiSummary);

    // Ensure folders is properly parsed if it's a string
    let folders = analysis.structure.folders;
    if (typeof folders === 'string') {
      try {
        folders = JSON.parse(folders);
      } catch (e) {
        console.error('Failed to parse folders string:', e);
        folders = [];
      }
    }

    // Ensure aiSummary.structure exists and topFolders is properly formatted
    if (!aiSummary.structure) {
      aiSummary.structure = {
        summary: '',
        totalFiles: 0,
        totalFolders: 0,
        topFolders: []
      };
    }

    // Ensure topFolders is an array
    if (!Array.isArray(aiSummary.structure.topFolders)) {
      aiSummary.structure.topFolders = [];
    }

    // Clean and validate each folder object
    aiSummary.structure.topFolders = aiSummary.structure.topFolders
      .filter(f => f && typeof f === 'object')
      .map(f => ({
        name: String(f.name || ''),
        files: Number(f.files || 0),
        type: String(f.type || 'directory')
      }))
      .slice(0, 10); // Limit to top 10 folders

    // Prepare data for database
    const repositoryData = {
      name: analysis.metadata.name,
      owner: analysis.metadata.owner,
      url: analysis.metadata.url,
      description: analysis.metadata.description,
      techStack: extractTechStack(analysis.languages),
      languages: analysis.languages,
      frameworks: detectFrameworks(analysis.structure),
      totalFiles: analysis.structure.totalFiles,
      totalLines: 0, // GitHub API doesn't provide this directly
      dependencies: 0, // Would need package.json parsing
      devDependencies: 0, // Would need package.json parsing
      structure: {
        folders: Array.isArray(folders)
          ? folders.map(f => ({
              name: String(f.name || ''),
              files: Number(f.files || 0),
              type: String(f.type || 'directory')
            }))
          : [],
        totalFolders: Number(analysis.structure.totalFolders || 0),
        totalFiles: Number(analysis.structure.totalFiles || 0),
      },
      insights: [
        ...(Array.isArray(analysis.insights) ? analysis.insights : []),
        ...aiInsights
      ],
      aiSummary: aiSummary,
      codeMetrics: {
        complexity: 0, // Would need code analysis
        maintainability: 0, // Would need code analysis
        duplicateCode: 0, // Would need code analysis
        technicalDebt: 'Unknown',
        securityIssues: 0,
      },
      githubData: {
        stars: analysis.metadata.stars || 0,
        forks: analysis.metadata.forks || 0,
        watchers: analysis.metadata.watchers || 0,
        openIssues: analysis.metadata.openIssues || 0,
        contributors: Array.isArray(analysis.contributors)
          ? analysis.contributors.map(c => ({
              login: c.login || '',
              avatar: c.avatar || '',
              contributions: c.contributions || 0,
              url: c.url || ''
            }))
          : [],
        recentCommits: Array.isArray(analysis.commits)
          ? analysis.commits.map(c => ({
              sha: c.sha || '',
              message: c.message || '',
              author: c.author || '',
              date: c.date ? new Date(c.date) : new Date(),
              url: c.url || ''
            }))
          : [],
        license: analysis.metadata.license || 'No license',
        topics: Array.isArray(analysis.metadata.topics) ? analysis.metadata.topics : [],
        createdAt: analysis.metadata.createdAt ? new Date(analysis.metadata.createdAt) : new Date(),
        updatedAt: analysis.metadata.updatedAt ? new Date(analysis.metadata.updatedAt) : new Date(),
        pushedAt: analysis.metadata.pushedAt ? new Date(analysis.metadata.pushedAt) : new Date(),
      },
    };

    // Save to database
    try {
      const repository = await Repository.create(repositoryData);
      console.log('Repository saved to database successfully');

      res.status(201).json({
        success: true,
        message: 'Repository analyzed successfully',
        data: repository,
      });
    } catch (dbError) {
      console.error('Database error:', dbError.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to save repository data. Please check your database connection.',
        error: dbError.message,
      });
    }
  } catch (error) {
    console.error('Error analyzing repository:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze repository. Please try again.',
      error: error.message,
    });
  }
};

// Helper function to extract tech stack from languages
const extractTechStack = (languages) => {
  const techStack = [];
  const languageKeys = Object.keys(languages);

  if (languageKeys.includes('JavaScript')) techStack.push('JavaScript');
  if (languageKeys.includes('TypeScript')) techStack.push('TypeScript');
  if (languageKeys.includes('Python')) techStack.push('Python');
  if (languageKeys.includes('Java')) techStack.push('Java');
  if (languageKeys.includes('Go')) techStack.push('Go');
  if (languageKeys.includes('Rust')) techStack.push('Rust');
  if (languageKeys.includes('Ruby')) techStack.push('Ruby');
  if (languageKeys.includes('PHP')) techStack.push('PHP');
  if (languageKeys.includes('C++')) techStack.push('C++');
  if (languageKeys.includes('C#')) techStack.push('C#');

  return techStack;
};

// Helper function to detect frameworks from structure
const detectFrameworks = (structure) => {
  const frameworks = [];
  const fileTypes = structure.fileTypes || {};

  // Check for common framework indicators
  if (fileTypes['jsx'] || fileTypes['tsx']) {
    frameworks.push('React');
  }
  if (fileTypes['vue']) {
    frameworks.push('Vue.js');
  }
  if (fileTypes['svelte']) {
    frameworks.push('Svelte');
  }

  return frameworks;
};

// @desc    Get repository by ID
// @route   GET /api/repository/:id
// @access  Public
export const getRepositoryById = async (req, res) => {
  try {
    const repository = await Repository.findById(req.params.id);

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: 'Repository not found',
      });
    }

    res.status(200).json({
      success: true,
      data: repository,
    });
  } catch (error) {
    console.error('Error fetching repository:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching repository',
      error: error.message,
    });
  }
};

// @desc    Get all repositories
// @route   GET /api/repository
// @access  Public
export const getAllRepositories = async (req, res) => {
  try {
    const repositories = await Repository.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: repositories.length,
      data: repositories,
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching repositories',
      error: error.message,
    });
  }
};

// @desc    Delete repository
// @route   DELETE /api/repository/:id
// @access  Public
export const deleteRepository = async (req, res) => {
  try {
    const repository = await Repository.findById(req.params.id);

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: 'Repository not found',
      });
    }

    await repository.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Repository deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting repository:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting repository',
      error: error.message,
    });
  }
};

// @desc    Generate README for repository
// @route   POST /api/repository/:id/generate-readme
// @access  Public
export const generateRepositoryReadme = async (req, res) => {
  try {
    const repository = await Repository.findById(req.params.id);

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: 'Repository not found',
      });
    }

    // Generate README content
    const readmeContent = await generateReadme(repository);

    res.status(200).json({
      success: true,
      message: 'README generated successfully',
      data: {
        content: readmeContent,
        repositoryId: repository._id,
        repositoryName: repository.name,
        generatedAt: new Date().toISOString()
      },
    });
  } catch (error) {
    console.error('Error generating README:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating README',
      error: error.message,
    });
  }
};

// Made with Bob
