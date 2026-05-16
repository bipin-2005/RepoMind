// Mock data for RepoMind Dashboard

export const dashboardData = {
  repository: {
    id: 'repo-001',
    name: 'awesome-react-app',
    owner: 'johndoe',
    url: 'https://github.com/johndoe/awesome-react-app',
    description: 'A modern React application with best practices',
    totalFiles: 247,
    totalLines: 15420,
    lastAnalyzed: '2026-05-16T08:00:00Z',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    languages: {
      JavaScript: 65,
      TypeScript: 25,
      CSS: 8,
      HTML: 2
    },
    frameworks: ['React', 'Express.js', 'Vite'],
    dependencies: 42,
    devDependencies: 18
  },

  insights: [
    {
      id: 1,
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Missing Documentation',
      description: '15 files lack proper documentation comments',
      severity: 'medium',
      count: 15
    },
    {
      id: 2,
      type: 'success',
      icon: 'CheckCircle',
      title: 'Code Quality Score',
      description: 'Overall complexity score: 7.5/10',
      severity: 'low',
      score: 7.5
    },
    {
      id: 3,
      type: 'info',
      icon: 'Zap',
      title: 'Performance Optimization',
      description: '3 performance improvements suggested',
      severity: 'low',
      count: 3
    },
    {
      id: 4,
      type: 'error',
      icon: 'XCircle',
      title: 'Duplicate Code Detected',
      description: '5 instances of duplicate code found',
      severity: 'high',
      count: 5
    }
  ],

  recentActions: [
    {
      id: 1,
      action: 'Repository analyzed',
      repository: 'awesome-react-app',
      time: '2 minutes ago',
      icon: 'Search',
      status: 'completed'
    },
    {
      id: 2,
      action: 'README.md generated',
      repository: 'awesome-react-app',
      time: '1 hour ago',
      icon: 'FileText',
      status: 'completed'
    },
    {
      id: 3,
      action: 'Unit tests created',
      repository: 'awesome-react-app',
      time: '3 hours ago',
      icon: 'TestTube',
      status: 'completed'
    },
    {
      id: 4,
      action: 'Architecture analyzed',
      repository: 'awesome-react-app',
      time: '5 hours ago',
      icon: 'GitBranch',
      status: 'completed'
    },
    {
      id: 5,
      action: 'Dependencies scanned',
      repository: 'awesome-react-app',
      time: '1 day ago',
      icon: 'Package',
      status: 'completed'
    }
  ],

  documentation: {
    documented: 182,
    undocumented: 65,
    percentage: 73.7,
    readmeGenerated: true,
    apiDocsGenerated: true,
    setupInstructions: true
  },

  testCoverage: {
    unitTests: 145,
    integrationTests: 32,
    e2eTests: 12,
    totalTests: 189,
    coverage: 78.5,
    missingTests: 23,
    edgeCases: 15
  },

  codeMetrics: {
    complexity: 7.5,
    maintainability: 82,
    duplicateCode: 2.3,
    technicalDebt: 'Low',
    securityIssues: 0
  }
};

export const repositoryAnalysis = {
  structure: {
    folders: [
      { name: 'src', files: 145, type: 'directory' },
      { name: 'public', files: 8, type: 'directory' },
      { name: 'tests', files: 42, type: 'directory' },
      { name: 'config', files: 12, type: 'directory' },
      { name: 'docs', files: 18, type: 'directory' }
    ],
    totalFolders: 23,
    totalFiles: 247
  },

  dependencies: [
    { name: 'react', version: '^18.2.0', type: 'production' },
    { name: 'react-dom', version: '^18.2.0', type: 'production' },
    { name: 'react-router-dom', version: '^6.20.0', type: 'production' },
    { name: 'axios', version: '^1.6.0', type: 'production' },
    { name: 'express', version: '^4.18.0', type: 'production' },
    { name: 'mongoose', version: '^8.0.0', type: 'production' },
    { name: 'vite', version: '^5.0.8', type: 'development' },
    { name: 'tailwindcss', version: '^3.3.6', type: 'development' }
  ],

  technologies: {
    frontend: ['React', 'Vite', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js'],
    database: ['MongoDB'],
    testing: ['Jest', 'React Testing Library'],
    tools: ['ESLint', 'Prettier', 'Git']
  },

  architectureSummary: {
    pattern: 'Component-based architecture with separation of concerns',
    frontend: 'React with functional components and hooks',
    backend: 'RESTful API with Express.js',
    database: 'MongoDB with Mongoose ODM',
    authentication: 'JWT-based authentication',
    deployment: 'Docker containerization ready'
  }
};

export const aiSuggestions = [
  {
    id: 1,
    category: 'Performance',
    title: 'Implement code splitting',
    description: 'Use React.lazy() and Suspense for route-based code splitting to improve initial load time',
    priority: 'high',
    estimatedImpact: 'Reduce bundle size by ~30%'
  },
  {
    id: 2,
    category: 'Security',
    title: 'Add input validation',
    description: 'Implement comprehensive input validation on all API endpoints',
    priority: 'high',
    estimatedImpact: 'Prevent injection attacks'
  },
  {
    id: 3,
    category: 'Code Quality',
    title: 'Extract reusable hooks',
    description: 'Create custom hooks for repeated logic in components',
    priority: 'medium',
    estimatedImpact: 'Improve code reusability by 40%'
  },
  {
    id: 4,
    category: 'Testing',
    title: 'Increase test coverage',
    description: 'Add unit tests for utility functions and edge cases',
    priority: 'medium',
    estimatedImpact: 'Reach 85% code coverage'
  },
  {
    id: 5,
    category: 'Documentation',
    title: 'Add JSDoc comments',
    description: 'Document all public functions and components with JSDoc',
    priority: 'low',
    estimatedImpact: 'Improve developer experience'
  }
];

export const chartData = {
  languageDistribution: [
    { name: 'JavaScript', value: 65, color: '#f7df1e' },
    { name: 'TypeScript', value: 25, color: '#3178c6' },
    { name: 'CSS', value: 8, color: '#264de4' },
    { name: 'HTML', value: 2, color: '#e34c26' }
  ],

  complexityTrend: [
    { month: 'Jan', complexity: 6.2 },
    { month: 'Feb', complexity: 6.8 },
    { month: 'Mar', complexity: 7.1 },
    { month: 'Apr', complexity: 7.3 },
    { month: 'May', complexity: 7.5 }
  ],

  testCoverageTrend: [
    { month: 'Jan', coverage: 65 },
    { month: 'Feb', coverage: 70 },
    { month: 'Mar', coverage: 73 },
    { month: 'Apr', coverage: 76 },
    { month: 'May', coverage: 78.5 }
  ]
};

// Made with Bob
