import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import MarkdownPreview from '../components/common/MarkdownPreview';
import { repositoryAPI } from '../services/api';

const ReadmeGenerator = () => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readmeContent, setReadmeContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const response = await repositoryAPI.getAll();
      if (response.success && response.data) {
        setRepositories(response.data);
        if (response.data.length > 0) {
          setSelectedRepo(response.data[0]);
        }
      }
    } catch (err) {
      setError('Failed to load repositories');
      console.error('Error fetching repositories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReadme = async () => {
    if (!selectedRepo) return;

    try {
      setGenerating(true);
      setError(null);
      const response = await repositoryAPI.generateReadme(selectedRepo._id);
      
      if (response.success && response.data) {
        setReadmeContent(response.data.content);
      }
    } catch (err) {
      setError('Failed to generate README. Please try again.');
      console.error('Error generating README:', err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" text="Loading repositories..." />
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">README Generator</h1>
          <p className="text-slate-400">
            Generate comprehensive README files for your repositories
          </p>
        </div>
        
        <Card>
          <div className="text-center py-12">
            <FileText className="mx-auto text-slate-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No Repositories Found</h3>
            <p className="text-slate-400 mb-6">
              Analyze a repository first to generate a README
            </p>
            <a
              href="/analyzer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <Sparkles size={20} />
              Analyze Repository
            </a>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">README Generator</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Generate comprehensive, professional README files powered by AI
        </p>
      </div>

      {/* Repository Selection */}
      <Card>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3 sm:mb-4">Select Repository</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {repositories.map((repo) => (
            <button
              key={repo._id}
              onClick={() => setSelectedRepo(repo)}
              className={`p-4 rounded-lg text-left transition-all duration-300 ${
                selectedRepo?._id === repo._id
                  ? 'bg-primary-500/20 border-2 border-primary-500'
                  : 'glass-hover border-2 border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-200">{repo.name}</h3>
                {selectedRepo?._id === repo._id && (
                  <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 line-clamp-2 mb-2">
                {repo.description || 'No description'}
              </p>
              <div className="flex flex-wrap gap-2">
                {repo.techStack?.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {selectedRepo && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-4 border-t border-slate-700">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-slate-400">
                Generate README for: <span className="text-slate-200 font-medium">{selectedRepo.name}</span>
              </p>
            </div>
            <Button
              onClick={handleGenerateReadme}
              disabled={generating}
              className="flex items-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate README
                </>
              )}
            </Button>
          </div>
        )}
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-l-4 border-red-500">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-red-400 mb-1">Error</h3>
              <p className="text-slate-300">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* README Preview */}
      {readmeContent && (
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary-500/10 p-3 rounded-lg">
              <FileText className="text-primary-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-100">Generated README</h2>
              <p className="text-sm text-slate-400">
                Review and download your AI-generated README
              </p>
            </div>
          </div>

          <MarkdownPreview 
            content={readmeContent} 
            fileName={`${selectedRepo?.name || 'README'}.md`}
          />
        </Card>
      )}

      {/* Features Info */}
      {!readmeContent && !generating && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">What's Included</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary-500/10 p-2 rounded-lg flex-shrink-0">
                <FileText className="text-primary-400" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-slate-200 mb-1">Project Overview</h4>
                <p className="text-sm text-slate-400">
                  Comprehensive description of your project's purpose and goals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-emerald-500/10 p-2 rounded-lg flex-shrink-0">
                <Sparkles className="text-emerald-400" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-slate-200 mb-1">Tech Stack</h4>
                <p className="text-sm text-slate-400">
                  Detailed list of technologies, frameworks, and tools used
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-500/10 p-2 rounded-lg flex-shrink-0">
                <FileText className="text-blue-400" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-slate-200 mb-1">Installation Guide</h4>
                <p className="text-sm text-slate-400">
                  Step-by-step instructions for setting up the project
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-purple-500/10 p-2 rounded-lg flex-shrink-0">
                <FileText className="text-purple-400" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-slate-200 mb-1">Usage Examples</h4>
                <p className="text-sm text-slate-400">
                  Code examples and usage instructions for your project
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-500/10 p-2 rounded-lg flex-shrink-0">
                <FileText className="text-orange-400" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-slate-200 mb-1">API Documentation</h4>
                <p className="text-sm text-slate-400">
                  API endpoints and usage (if backend is detected)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-pink-500/10 p-2 rounded-lg flex-shrink-0">
                <FileText className="text-pink-400" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-slate-200 mb-1">Contributing Guide</h4>
                <p className="text-sm text-slate-400">
                  Guidelines for contributors and collaboration
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReadmeGenerator;

// Made with Bob