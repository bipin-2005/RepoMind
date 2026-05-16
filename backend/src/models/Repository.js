import mongoose from 'mongoose';

// Define folder schema separately
const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  files: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    required: false
  }
}, { _id: false });

// Define structure schema separately
const structureSchema = new mongoose.Schema({
  folders: {
    type: [folderSchema],
    default: []
  },
  totalFolders: {
    type: Number,
    default: 0
  },
  totalFiles: {
    type: Number,
    default: 0
  }
}, { _id: false });

// Define AI summary folder schema (same as folderSchema but separate to avoid conflicts)
const aiSummaryFolderSchema = new mongoose.Schema({
  name: String,
  files: Number,
  type: String
}, { _id: false });

const repositorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: String,
  techStack: [String],
  languages: {
    type: Map,
    of: Number,
  },
  frameworks: [String],
  totalFiles: Number,
  totalLines: Number,
  dependencies: Number,
  devDependencies: Number,
  structure: {
    type: structureSchema,
    default: () => ({})
  },
  insights: [{
    type: {
      type: String,
      enum: ['warning', 'success', 'error', 'info'],
    },
    icon: String,
    title: String,
    description: String,
    severity: {
      type: String,
      enum: ['high', 'medium', 'low'],
    },
    count: Number,
    score: Number,
  }],
  codeMetrics: {
    complexity: Number,
    maintainability: Number,
    duplicateCode: Number,
    technicalDebt: String,
    securityIssues: Number,
  },
  githubData: {
    stars: Number,
    forks: Number,
    watchers: Number,
    openIssues: Number,
    contributors: [{
      login: String,
      avatar: String,
      contributions: Number,
      url: String,
    }],
    recentCommits: [{
      sha: String,
      message: String,
      author: String,
      date: Date,
      url: String,
    }],
    license: String,
    topics: [String],
    createdAt: Date,
    updatedAt: Date,
    pushedAt: Date,
  },
  aiSummary: {
    overview: {
      summary: String,
      architecture: String,
      activityLevel: String,
      complexityScore: Number,
      lastUpdated: Date
    },
    technologies: {
      frontend: {
        languages: [String],
        frameworks: [String],
        tools: [String]
      },
      backend: {
        languages: [String],
        frameworks: [String],
        tools: [String]
      },
      languages: [{
        name: String,
        percentage: Number
      }]
    },
    structure: {
      summary: String,
      totalFiles: Number,
      totalFolders: Number,
      topFolders: [aiSummaryFolderSchema]
    },
    improvements: [{
      category: String,
      priority: String,
      suggestion: String,
      impact: String
    }],
    metrics: {
      contributors: Number,
      commits: Number,
      stars: Number,
      forks: Number,
      openIssues: Number
    },
    generatedAt: Date
  },
  analyzedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Repository = mongoose.model('Repository', repositorySchema);

export default Repository;

// Made with Bob
