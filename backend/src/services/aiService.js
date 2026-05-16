/**
 * AI Service for generating repository summaries and insights
 * Uses mock AI responses initially (can be replaced with actual AI API integration)
 */

/**
 * Generate architecture summary based on repository structure
 * @param {object} structure - Repository structure data
 * @param {object} languages - Language distribution
 * @param {array} frameworks - Detected frameworks
 * @returns {string} - Architecture summary
 */
const generateArchitectureSummary = (structure, languages, frameworks) => {
  const fileCount = structure.totalFiles || 0;
  const folderCount = structure.totalFolders || 0;
  const primaryLanguage = Object.keys(languages)[0] || 'Unknown';
  const frameworkList = frameworks.length > 0 ? frameworks.join(', ') : 'None detected';

  return `This repository follows a ${folderCount > 50 ? 'complex' : folderCount > 20 ? 'moderate' : 'simple'} architecture with ${fileCount} files organized across ${folderCount} directories. The codebase is primarily written in ${primaryLanguage}${frameworks.length > 0 ? ` and utilizes ${frameworkList}` : ''}. The project structure suggests a ${frameworks.includes('React') || frameworks.includes('Vue.js') ? 'modern frontend' : 'backend-focused'} application with ${structure.totalFiles > 100 ? 'extensive' : 'focused'} functionality.`;
};

/**
 * Explain project purpose based on metadata and structure
 * @param {object} metadata - Repository metadata
 * @param {object} languages - Language distribution
 * @param {array} frameworks - Detected frameworks
 * @returns {string} - Project purpose explanation
 */
const explainProjectPurpose = (metadata, languages, frameworks) => {
  const description = metadata.description || 'No description provided';
  const topics = metadata.topics || [];
  const primaryLang = Object.keys(languages)[0] || 'Unknown';
  
  let purpose = `${metadata.name} is a ${primaryLang}-based project`;
  
  if (frameworks.length > 0) {
    purpose += ` built with ${frameworks.join(' and ')}`;
  }
  
  if (description !== 'No description provided') {
    purpose += `. ${description}`;
  }
  
  if (topics.length > 0) {
    purpose += ` The project focuses on ${topics.slice(0, 3).join(', ')}.`;
  }
  
  return purpose;
};

/**
 * Identify frontend and backend technologies
 * @param {object} languages - Language distribution
 * @param {array} frameworks - Detected frameworks
 * @param {object} structure - Repository structure
 * @returns {object} - Frontend and backend technologies
 */
const identifyTechnologies = (languages, frameworks, structure) => {
  const fileTypes = structure.fileTypes || {};
  
  const frontend = {
    languages: [],
    frameworks: [],
    tools: []
  };
  
  const backend = {
    languages: [],
    frameworks: [],
    tools: []
  };
  
  // Identify frontend technologies
  if (languages['JavaScript'] || languages['TypeScript']) {
    frontend.languages.push(languages['JavaScript'] ? 'JavaScript' : 'TypeScript');
  }
  if (languages['HTML'] || fileTypes['html']) {
    frontend.languages.push('HTML');
  }
  if (languages['CSS'] || fileTypes['css']) {
    frontend.languages.push('CSS');
  }
  
  frameworks.forEach(fw => {
    if (['React', 'Vue.js', 'Angular', 'Svelte'].includes(fw)) {
      frontend.frameworks.push(fw);
    }
  });
  
  if (fileTypes['jsx'] || fileTypes['tsx']) {
    if (!frontend.frameworks.includes('React')) {
      frontend.frameworks.push('React');
    }
  }
  
  // Identify backend technologies
  if (languages['Python']) {
    backend.languages.push('Python');
    if (fileTypes['py']) {
      backend.frameworks.push('Possible Flask/Django/FastAPI');
    }
  }
  if (languages['Java']) {
    backend.languages.push('Java');
    backend.frameworks.push('Possible Spring/Jakarta EE');
  }
  if (languages['Go']) {
    backend.languages.push('Go');
  }
  if (languages['Rust']) {
    backend.languages.push('Rust');
  }
  if (languages['Ruby']) {
    backend.languages.push('Ruby');
    backend.frameworks.push('Possible Rails/Sinatra');
  }
  if (languages['PHP']) {
    backend.languages.push('PHP');
    backend.frameworks.push('Possible Laravel/Symfony');
  }
  if (languages['C#']) {
    backend.languages.push('C#');
    backend.frameworks.push('Possible .NET/ASP.NET');
  }
  
  // Check for Node.js backend
  if (fileTypes['js'] && (languages['JavaScript'] || languages['TypeScript'])) {
    if (!frontend.frameworks.length || fileTypes['js'] > 50) {
      backend.languages.push('Node.js');
    }
  }
  
  return { frontend, backend };
};

/**
 * Summarize folder structure
 * @param {object} structure - Repository structure
 * @returns {string} - Folder structure summary
 */
const summarizeFolderStructure = (structure) => {
  const folders = structure.folders || [];
  const topFolders = folders.slice(0, 5);
  
  if (topFolders.length === 0) {
    return 'The repository has a flat structure with files in the root directory.';
  }
  
  let summary = `The repository is organized into ${structure.totalFolders} directories. `;
  summary += `Key directories include: ${topFolders.map(f => `${f.name} (${f.files} files)`).join(', ')}. `;
  
  // Detect common patterns
  const folderNames = folders.map(f => f.name.toLowerCase());
  if (folderNames.some(n => n.includes('src') || n.includes('source'))) {
    summary += 'The project follows a standard source code organization pattern. ';
  }
  if (folderNames.some(n => n.includes('test') || n.includes('spec'))) {
    summary += 'Test files are properly organized in dedicated directories. ';
  }
  if (folderNames.some(n => n.includes('doc') || n.includes('docs'))) {
    summary += 'Documentation is maintained in a separate directory. ';
  }
  
  return summary;
};

/**
 * Detect possible improvements
 * @param {object} metadata - Repository metadata
 * @param {object} structure - Repository structure
 * @param {object} languages - Language distribution
 * @returns {array} - List of improvement suggestions
 */
const detectImprovements = (metadata, structure, languages) => {
  const improvements = [];
  const fileTypes = structure.fileTypes || {};
  const folders = structure.folders || [];
  const folderNames = folders.map(f => f.name.toLowerCase());
  
  // Documentation improvements
  if (!fileTypes['md'] || fileTypes['md'] < 3) {
    improvements.push({
      category: 'Documentation',
      priority: 'high',
      suggestion: 'Add comprehensive documentation (README, CONTRIBUTING, API docs)',
      impact: 'Improves project accessibility and contributor onboarding'
    });
  }
  
  // Testing improvements
  if (!folderNames.some(n => n.includes('test') || n.includes('spec'))) {
    improvements.push({
      category: 'Testing',
      priority: 'high',
      suggestion: 'Implement automated testing (unit, integration, e2e)',
      impact: 'Increases code reliability and reduces bugs'
    });
  }
  
  // CI/CD improvements
  if (!fileTypes['yml'] && !fileTypes['yaml']) {
    improvements.push({
      category: 'DevOps',
      priority: 'medium',
      suggestion: 'Set up CI/CD pipeline (GitHub Actions, GitLab CI, etc.)',
      impact: 'Automates testing and deployment processes'
    });
  }
  
  // License improvements
  if (metadata.license === 'No license') {
    improvements.push({
      category: 'Legal',
      priority: 'medium',
      suggestion: 'Add an open-source license (MIT, Apache 2.0, GPL, etc.)',
      impact: 'Clarifies usage rights and protects contributors'
    });
  }
  
  // Code organization
  if (structure.totalFiles > 100 && structure.totalFolders < 10) {
    improvements.push({
      category: 'Architecture',
      priority: 'medium',
      suggestion: 'Improve code organization by creating more modular directories',
      impact: 'Enhances maintainability and code navigation'
    });
  }
  
  // Security improvements
  if (fileTypes['env'] || fileTypes['config']) {
    improvements.push({
      category: 'Security',
      priority: 'high',
      suggestion: 'Ensure sensitive files are in .gitignore and use environment variables',
      impact: 'Prevents accidental exposure of secrets and credentials'
    });
  }
  
  // Type safety
  if (languages['JavaScript'] && !languages['TypeScript'] && structure.totalFiles > 50) {
    improvements.push({
      category: 'Code Quality',
      priority: 'medium',
      suggestion: 'Consider migrating to TypeScript for better type safety',
      impact: 'Reduces runtime errors and improves developer experience'
    });
  }
  
  // Dependency management
  if (fileTypes['json'] && !folderNames.some(n => n.includes('node_modules'))) {
    improvements.push({
      category: 'Dependencies',
      priority: 'low',
      suggestion: 'Regularly update dependencies and audit for vulnerabilities',
      impact: 'Maintains security and access to latest features'
    });
  }
  
  return improvements;
};

/**
 * Generate complete AI summary for a repository
 * @param {object} analysisData - Complete repository analysis data
 * @returns {object} - AI-generated summary
 */
export const generateRepositorySummary = async (analysisData) => {
  try {
    const { metadata, languages, structure, contributors, commits } = analysisData;
    const frameworks = analysisData.frameworks || [];
    
    // Generate all summary components
    const architectureSummary = generateArchitectureSummary(structure, languages, frameworks);
    const projectPurpose = explainProjectPurpose(metadata, languages, frameworks);
    const technologies = identifyTechnologies(languages, frameworks, structure);
    const folderStructure = summarizeFolderStructure(structure);
    const improvements = detectImprovements(metadata, structure, languages);
    
    // Calculate activity score
    const daysSinceUpdate = Math.floor(
      (new Date() - new Date(metadata.pushedAt)) / (1000 * 60 * 60 * 24)
    );
    const activityScore = daysSinceUpdate < 7 ? 'Very Active' : 
                         daysSinceUpdate < 30 ? 'Active' : 
                         daysSinceUpdate < 90 ? 'Moderate' : 'Inactive';
    
    // Calculate complexity score (1-10)
    const complexityScore = Math.min(10, Math.floor(
      (structure.totalFiles / 100) + 
      (structure.totalFolders / 20) + 
      (Object.keys(languages).length / 2)
    ));
    
    return {
      overview: {
        summary: projectPurpose,
        architecture: architectureSummary,
        activityLevel: activityScore,
        complexityScore: complexityScore,
        lastUpdated: metadata.pushedAt
      },
      technologies: {
        frontend: technologies.frontend,
        backend: technologies.backend,
        languages: Object.keys(languages).map(lang => ({
          name: lang,
          percentage: languages[lang]
        }))
      },
      structure: {
        summary: folderStructure,
        totalFiles: structure.totalFiles,
        totalFolders: structure.totalFolders,
        topFolders: (structure.folders || []).slice(0, 5)
      },
      improvements: improvements,
      metrics: {
        contributors: contributors.length,
        commits: commits.length,
        stars: metadata.stars,
        forks: metadata.forks,
        openIssues: metadata.openIssues
      },
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating AI summary:', error);
    throw new Error(`Failed to generate AI summary: ${error.message}`);
  }
};

/**
 * Generate quick insights for dashboard
 * @param {object} summary - AI-generated summary
 * @returns {array} - Quick insights
 */
export const generateQuickInsights = (summary) => {
  const insights = [];
  
  // Activity insight
  insights.push({
    type: summary.overview.activityLevel === 'Very Active' || summary.overview.activityLevel === 'Active' ? 'success' : 'warning',
    icon: 'Activity',
    title: `${summary.overview.activityLevel} Development`,
    description: `Project is ${summary.overview.activityLevel.toLowerCase()}`,
    severity: 'low'
  });
  
  // Complexity insight
  if (summary.overview.complexityScore > 7) {
    insights.push({
      type: 'info',
      icon: 'Code',
      title: 'Complex Codebase',
      description: `Complexity score: ${summary.overview.complexityScore}/10`,
      severity: 'medium'
    });
  }
  
  // Technology stack insight
  const totalTechs = summary.technologies.frontend.languages.length + 
                     summary.technologies.backend.languages.length;
  if (totalTechs > 3) {
    insights.push({
      type: 'info',
      icon: 'Layers',
      title: 'Diverse Tech Stack',
      description: `Uses ${totalTechs} different technologies`,
      severity: 'low'
    });
  }
  
  // Improvement opportunities
  const highPriorityImprovements = summary.improvements.filter(i => i.priority === 'high');
  if (highPriorityImprovements.length > 0) {
    insights.push({
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Improvement Opportunities',
      description: `${highPriorityImprovements.length} high-priority improvements identified`,
      severity: 'high'
    });
  }
  
  return insights;
};

/**
 * Generate comprehensive README.md content
 * @param {object} repository - Repository data from database
 * @returns {string} - Generated README markdown
 */
export const generateReadme = async (repository) => {
  try {
    const { name, description, languages, frameworks, techStack, aiSummary, githubData, structure } = repository;
    
    // Extract primary language
    const primaryLanguage = Object.keys(languages || {})[0] || 'Unknown';
    const languageList = Object.keys(languages || {}).join(', ');
    
    // Build tech stack section
    const frontendTechs = aiSummary?.technologies?.frontend?.languages || [];
    const backendTechs = aiSummary?.technologies?.backend?.languages || [];
    const frameworkList = frameworks || [];
    
    // Generate installation instructions based on detected technologies
    const installInstructions = generateInstallInstructions(languages, structure);
    
    // Generate usage examples
    const usageExamples = generateUsageExamples(languages, frameworkList);
    
    // Generate API documentation if backend detected
    const apiDocs = backendTechs.length > 0 ? generateApiDocs(backendTechs, frameworkList) : '';
    
    // Build README content
    let readme = `# ${name}\n\n`;
    
    // Add badges
    readme += `![GitHub stars](https://img.shields.io/github/stars/${githubData?.owner || 'user'}/${name}?style=social)\n`;
    readme += `![GitHub forks](https://img.shields.io/github/forks/${githubData?.owner || 'user'}/${name}?style=social)\n`;
    readme += `![GitHub issues](https://img.shields.io/github/issues/${githubData?.owner || 'user'}/${name})\n`;
    if (githubData?.license && githubData.license !== 'No license') {
      readme += `![License](https://img.shields.io/badge/license-${githubData.license.replace(/ /g, '%20')}-blue)\n`;
    }
    readme += `\n`;
    
    // Project Overview
    readme += `## 📋 Overview\n\n`;
    readme += `${description || aiSummary?.overview?.summary || 'A software project built with modern technologies.'}\n\n`;
    
    if (aiSummary?.overview?.architecture) {
      readme += `### Architecture\n\n`;
      readme += `${aiSummary.overview.architecture}\n\n`;
    }
    
    // Tech Stack
    readme += `## 🛠️ Tech Stack\n\n`;
    
    if (frontendTechs.length > 0) {
      readme += `### Frontend\n`;
      frontendTechs.forEach(tech => {
        readme += `- ${tech}\n`;
      });
      if (aiSummary?.technologies?.frontend?.frameworks?.length > 0) {
        aiSummary.technologies.frontend.frameworks.forEach(fw => {
          readme += `- ${fw}\n`;
        });
      }
      readme += `\n`;
    }
    
    if (backendTechs.length > 0) {
      readme += `### Backend\n`;
      backendTechs.forEach(tech => {
        readme += `- ${tech}\n`;
      });
      if (aiSummary?.technologies?.backend?.frameworks?.length > 0) {
        aiSummary.technologies.backend.frameworks.forEach(fw => {
          readme += `- ${fw}\n`;
        });
      }
      readme += `\n`;
    }
    
    if (!frontendTechs.length && !backendTechs.length && techStack?.length > 0) {
      techStack.forEach(tech => {
        readme += `- ${tech}\n`;
      });
      readme += `\n`;
    }
    
    // Installation
    readme += `## 🚀 Installation\n\n`;
    readme += installInstructions;
    readme += `\n`;
    
    // Usage
    readme += `## 💻 Usage\n\n`;
    readme += usageExamples;
    readme += `\n`;
    
    // API Documentation
    if (apiDocs) {
      readme += `## 📚 API Documentation\n\n`;
      readme += apiDocs;
      readme += `\n`;
    }
    
    // Project Structure
    if (aiSummary?.structure?.summary) {
      readme += `## 📁 Project Structure\n\n`;
      readme += `${aiSummary.structure.summary}\n\n`;
      
      if (aiSummary.structure.topFolders?.length > 0) {
        readme += `### Key Directories\n\n`;
        readme += `\`\`\`\n`;
        aiSummary.structure.topFolders.forEach(folder => {
          readme += `${folder.name}/     # ${folder.files} files\n`;
        });
        readme += `\`\`\`\n\n`;
      }
    }
    
    // Contributing
    readme += `## 🤝 Contributing\n\n`;
    readme += `Contributions are welcome! Please feel free to submit a Pull Request.\n\n`;
    readme += `1. Fork the project\n`;
    readme += `2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)\n`;
    readme += `3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)\n`;
    readme += `4. Push to the branch (\`git push origin feature/AmazingFeature\`)\n`;
    readme += `5. Open a Pull Request\n\n`;
    
    // License
    readme += `## 📄 License\n\n`;
    if (githubData?.license && githubData.license !== 'No license') {
      readme += `This project is licensed under the ${githubData.license}.\n\n`;
    } else {
      readme += `This project does not have a specified license. Please contact the repository owner for usage rights.\n\n`;
    }
    
    // Contributors
    if (githubData?.contributors?.length > 0) {
      readme += `## 👥 Contributors\n\n`;
      readme += `Thanks to these wonderful people:\n\n`;
      githubData.contributors.slice(0, 5).forEach(contributor => {
        readme += `- [@${contributor.login}](${contributor.url}) - ${contributor.contributions} contributions\n`;
      });
      readme += `\n`;
    }
    
    // Footer
    readme += `---\n\n`;
    readme += `*This README was generated with ❤️ by [RepoMind](https://github.com/yourusername/repomind)*\n`;
    
    return readme;
  } catch (error) {
    console.error('Error generating README:', error);
    throw new Error(`Failed to generate README: ${error.message}`);
  }
};

/**
 * Generate installation instructions based on detected technologies
 */
const generateInstallInstructions = (languages, structure) => {
  let instructions = '';
  const hasPackageJson = structure?.fileTypes?.json > 0;
  const hasPython = languages?.Python;
  const hasRuby = languages?.Ruby;
  const hasGo = languages?.Go;
  const hasRust = languages?.Rust;
  
  instructions += `### Prerequisites\n\n`;
  
  if (hasPackageJson || languages?.JavaScript || languages?.TypeScript) {
    instructions += `- Node.js (v14 or higher)\n`;
    instructions += `- npm or yarn\n\n`;
    instructions += `### Steps\n\n`;
    instructions += `1. Clone the repository:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `git clone <repository-url>\n`;
    instructions += `cd ${structure?.name || 'project'}\n`;
    instructions += `\`\`\`\n\n`;
    instructions += `2. Install dependencies:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `npm install\n`;
    instructions += `# or\n`;
    instructions += `yarn install\n`;
    instructions += `\`\`\`\n\n`;
    instructions += `3. Start the development server:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `npm run dev\n`;
    instructions += `# or\n`;
    instructions += `yarn dev\n`;
    instructions += `\`\`\`\n`;
  } else if (hasPython) {
    instructions += `- Python 3.8 or higher\n`;
    instructions += `- pip\n\n`;
    instructions += `### Steps\n\n`;
    instructions += `1. Clone the repository:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `git clone <repository-url>\n`;
    instructions += `cd ${structure?.name || 'project'}\n`;
    instructions += `\`\`\`\n\n`;
    instructions += `2. Create a virtual environment:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `python -m venv venv\n`;
    instructions += `source venv/bin/activate  # On Windows: venv\\Scripts\\activate\n`;
    instructions += `\`\`\`\n\n`;
    instructions += `3. Install dependencies:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `pip install -r requirements.txt\n`;
    instructions += `\`\`\`\n`;
  } else if (hasGo) {
    instructions += `- Go 1.16 or higher\n\n`;
    instructions += `### Steps\n\n`;
    instructions += `1. Clone the repository:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `git clone <repository-url>\n`;
    instructions += `cd ${structure?.name || 'project'}\n`;
    instructions += `\`\`\`\n\n`;
    instructions += `2. Install dependencies:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `go mod download\n`;
    instructions += `\`\`\`\n\n`;
    instructions += `3. Build and run:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `go build\n`;
    instructions += `./project\n`;
    instructions += `\`\`\`\n`;
  } else if (hasRust) {
    instructions += `- Rust (latest stable)\n`;
    instructions += `- Cargo\n\n`;
    instructions += `### Steps\n\n`;
    instructions += `1. Clone the repository:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `git clone <repository-url>\n`;
    instructions += `cd ${structure?.name || 'project'}\n`;
    instructions += `\`\`\`\n\n`;
    instructions += `2. Build and run:\n`;
    instructions += `\`\`\`bash\n`;
    instructions += `cargo build --release\n`;
    instructions += `cargo run\n`;
    instructions += `\`\`\`\n`;
  } else {
    instructions += `Please refer to the project documentation for specific installation instructions.\n`;
  }
  
  return instructions;
};

/**
 * Generate usage examples
 */
const generateUsageExamples = (languages, frameworks) => {
  let usage = '';
  
  if (frameworks.includes('React') || frameworks.includes('Vue.js')) {
    usage += `### Development\n\n`;
    usage += `Start the development server:\n\n`;
    usage += `\`\`\`bash\n`;
    usage += `npm run dev\n`;
    usage += `\`\`\`\n\n`;
    usage += `The application will be available at \`http://localhost:3000\`\n\n`;
    usage += `### Production Build\n\n`;
    usage += `Create a production build:\n\n`;
    usage += `\`\`\`bash\n`;
    usage += `npm run build\n`;
    usage += `\`\`\`\n`;
  } else if (languages?.Python) {
    usage += `### Running the Application\n\n`;
    usage += `\`\`\`bash\n`;
    usage += `python main.py\n`;
    usage += `\`\`\`\n\n`;
    usage += `### Running Tests\n\n`;
    usage += `\`\`\`bash\n`;
    usage += `pytest\n`;
    usage += `\`\`\`\n`;
  } else if (languages?.Go) {
    usage += `### Running the Application\n\n`;
    usage += `\`\`\`bash\n`;
    usage += `go run main.go\n`;
    usage += `\`\`\`\n\n`;
    usage += `### Running Tests\n\n`;
    usage += `\`\`\`bash\n`;
    usage += `go test ./...\n`;
    usage += `\`\`\`\n`;
  } else {
    usage += `Please refer to the project documentation for usage instructions.\n`;
  }
  
  return usage;
};

/**
 * Generate API documentation section
 */
const generateApiDocs = (backendTechs, frameworks) => {
  let apiDocs = '';
  
  apiDocs += `This project provides a RESTful API. Below are the main endpoints:\n\n`;
  apiDocs += `### Base URL\n\n`;
  apiDocs += `\`\`\`\n`;
  apiDocs += `http://localhost:3000/api\n`;
  apiDocs += `\`\`\`\n\n`;
  apiDocs += `### Endpoints\n\n`;
  apiDocs += `#### GET /api/resource\n`;
  apiDocs += `Get all resources\n\n`;
  apiDocs += `**Response:**\n`;
  apiDocs += `\`\`\`json\n`;
  apiDocs += `{\n`;
  apiDocs += `  "success": true,\n`;
  apiDocs += `  "data": []\n`;
  apiDocs += `}\n`;
  apiDocs += `\`\`\`\n\n`;
  apiDocs += `#### POST /api/resource\n`;
  apiDocs += `Create a new resource\n\n`;
  apiDocs += `**Request Body:**\n`;
  apiDocs += `\`\`\`json\n`;
  apiDocs += `{\n`;
  apiDocs += `  "name": "Resource Name",\n`;
  apiDocs += `  "description": "Resource Description"\n`;
  apiDocs += `}\n`;
  apiDocs += `\`\`\`\n\n`;
  apiDocs += `*Note: This is a template. Please refer to the actual API implementation for complete documentation.*\n`;
  
  return apiDocs;
};

// Made with Bob