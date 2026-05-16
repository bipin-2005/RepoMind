import React, { useState } from 'react';
import { Github, Upload, Search, Folder, Package, Code2, FileText } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';
import { repositoryAPI } from '../services/api';

const RepositoryAnalyzer = () => {
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  
  const handleAnalyze = async () => {
    if (!githubUrl) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Analyzing repository:', githubUrl);
      const response = await repositoryAPI.analyze({ url: githubUrl });
      console.log('Analysis response:', response);
      
      if (response.success) {
        setAnalysisData(response.data);
        setAnalyzed(true);
      } else {
        const errorMsg = response.message || 'Failed to analyze repository';
        console.error('Analysis failed:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('Analysis error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        fullError: err
      });
      
      // Get the most specific error message available
      const errorMsg = err.response?.data?.message ||
                      err.response?.data?.error ||
                      err.message ||
                      'Failed to analyze repository. Please check the URL and try again.';
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      // Simulate file upload and analysis
      setTimeout(() => {
        setAnalysisData(repositoryAnalysis);
        setAnalyzed(true);
        setLoading(false);
      }, 2000);
    }
  };
  
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-100 mb-1">Repository Analyzer</h1>
        <p className="text-sm text-slate-500">
          Analyze GitHub repositories or upload projects for AI-powered insights
        </p>
      </div>
      
      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* GitHub URL Input */}
        <Card>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="bg-accent-blue-500/10 p-1.5 rounded border border-slate-800/50">
              <Github className="text-accent-blue-400" size={18} strokeWidth={2} />
            </div>
            <h3 className="text-base font-semibold text-slate-100">Analyze from GitHub</h3>
          </div>
          
          <Input
            label="GitHub Repository URL"
            placeholder="https://github.com/username/repository"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            icon={Github}
            className="mb-4"
          />
          
          <Button
            variant="primary"
            className="w-full"
            icon={Search}
            onClick={handleAnalyze}
            loading={loading}
            disabled={!githubUrl || loading}
          >
            Analyze Repository
          </Button>
          
          {error && (
            <div className="mt-4 p-3 bg-error-500/10 border border-error-500/30 rounded-md">
              <p className="text-xs text-error-300 flex items-center gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-error-400"></span>
                {error}
              </p>
            </div>
          )}
          
          {!error && (
            <div className="mt-4 p-3 bg-accent-blue-500/10 border border-accent-blue-500/30 rounded-md">
              <p className="text-xs text-accent-blue-300 flex items-center gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-accent-blue-400"></span>
                Tip: Repository must be public or accessible
              </p>
            </div>
          )}
        </Card>
        
        {/* File Upload */}
        <Card>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="bg-success-500/10 p-1.5 rounded border border-slate-800/50">
              <Upload className="text-success-400" size={18} strokeWidth={2} />
            </div>
            <h3 className="text-base font-semibold text-slate-100">Upload Project</h3>
          </div>
          
          <div className="border-2 border-dashed border-slate-800 rounded-md p-8 text-center hover:border-accent-blue-500/50 transition-smooth cursor-pointer bg-slate-900/30">
            <input
              type="file"
              accept=".zip"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={loading}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto text-slate-600 mb-3" size={40} strokeWidth={1.5} />
              <p className="text-sm text-slate-300 font-medium mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-600">
                ZIP files only (Max 50MB)
              </p>
            </label>
          </div>
          
          <div className="mt-4 p-3 bg-warning-500/10 border border-warning-500/30 rounded-md">
            <p className="text-xs text-warning-300 flex items-center gap-2">
              <span className="inline-block w-1 h-1 rounded-full bg-warning-400"></span>
              Only ZIP files are supported for upload
            </p>
          </div>
        </Card>
      </div>
      
      {/* Loading State */}
      {loading && (
        <Card padding="lg">
          <Loader size="lg" text="Analyzing repository... This may take a moment" />
        </Card>
      )}
      
      {/* Analysis Results */}
      {analyzed && analysisData && !loading && (
        <div className="space-y-4 animate-slide-up">
          {/* Repository Overview */}
          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-slate-100">
                    {analysisData.name}
                  </h3>
                  <Badge variant="primary" size="xs" dot>Analyzed</Badge>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{analysisData.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 separator">
              {analysisData.githubData && (
                <>
                  <div>
                    <p className="text-xs text-slate-600 mb-1 font-medium">Stars</p>
                    <p className="text-base font-semibold text-slate-200 tabular-nums">
                      {analysisData.githubData.stars?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1 font-medium">Forks</p>
                    <p className="text-base font-semibold text-slate-200 tabular-nums">
                      {analysisData.githubData.forks?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1 font-medium">Watchers</p>
                    <p className="text-base font-semibold text-slate-200 tabular-nums">
                      {analysisData.githubData.watchers?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1 font-medium">Issues</p>
                    <p className="text-base font-semibold text-slate-200 tabular-nums">
                      {analysisData.githubData.openIssues?.toLocaleString() || 0}
                    </p>
                  </div>
                </>
              )}
            </div>
          </Card>
          
          {/* Contributors */}
          {analysisData.githubData?.contributors && analysisData.githubData.contributors.length > 0 && (
            <Card>
              <h3 className="text-base font-semibold text-slate-100 mb-4">Top Contributors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {analysisData.githubData.contributors.map((contributor, index) => (
                  <div key={index} className="text-center group">
                    <img
                      src={contributor.avatar}
                      alt={contributor.login}
                      className="w-12 h-12 rounded-md mx-auto mb-2 border border-slate-800 group-hover:border-accent-blue-500/50 transition-smooth"
                    />
                    <p className="text-xs font-medium text-slate-200 truncate">{contributor.login}</p>
                    <p className="text-[10px] text-slate-600 tabular-nums">{contributor.contributions} commits</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Project Structure and Technologies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Project Structure */}
            <Card>
              <div className="flex items-center gap-2.5 mb-4">
                <Folder className="text-accent-blue-400" size={18} strokeWidth={2} />
                <h3 className="text-base font-semibold text-slate-100">Project Structure</h3>
              </div>
              
              <div className="space-y-1.5">
                {analysisData.structure?.folders && analysisData.structure.folders.length > 0 ? (
                  analysisData.structure.folders.map((folder, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 hover:bg-slate-850 rounded-md transition-smooth"
                    >
                      <div className="flex items-center gap-2">
                        <Folder size={14} strokeWidth={2} className="text-slate-500" />
                        <span className="text-sm text-slate-200 font-mono">{folder.name}</span>
                      </div>
                      <Badge variant="secondary" size="xs">
                        {folder.files}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-xs">No folder structure available</p>
                )}
              </div>
              
              <div className="mt-4 pt-4 separator grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600 mb-1 font-medium">Total Folders</p>
                  <p className="text-base font-semibold text-slate-200 tabular-nums">
                    {analysisData.structure?.totalFolders || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1 font-medium">Total Files</p>
                  <p className="text-base font-semibold text-slate-200 tabular-nums">
                    {analysisData.structure?.totalFiles || 0}
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Technologies Detected */}
            <Card>
              <div className="flex items-center gap-2.5 mb-4">
                <Code2 className="text-success-400" size={18} strokeWidth={2} />
                <h3 className="text-base font-semibold text-slate-100">Technologies Detected</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">Languages</p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisData.languages && Object.keys(analysisData.languages).length > 0 ? (
                      Object.entries(analysisData.languages).map(([lang, percentage], index) => (
                        <Badge key={index} variant="primary" size="sm">
                          {lang} {percentage}%
                        </Badge>
                      ))
                    ) : (
                      <p className="text-slate-600 text-xs">No languages detected</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisData.techStack && analysisData.techStack.length > 0 ? (
                      analysisData.techStack.map((tech, index) => (
                        <Badge key={index} variant="success" size="sm">
                          {tech}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-slate-600 text-xs">No tech stack detected</p>
                    )}
                  </div>
                </div>
                
                {analysisData.frameworks && analysisData.frameworks.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 mb-2 font-medium">Frameworks</p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisData.frameworks.map((framework, index) => (
                        <Badge key={index} variant="info" size="sm">
                          {framework}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {analysisData.githubData?.topics && analysisData.githubData.topics.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 mb-2 font-medium">Topics</p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisData.githubData.topics.map((topic, index) => (
                        <Badge key={index} variant="warning" size="sm">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          {/* Recent Commits */}
          {analysisData.githubData?.recentCommits && analysisData.githubData.recentCommits.length > 0 && (
            <Card>
              <div className="flex items-center gap-2.5 mb-4">
                <Code2 className="text-accent-cyan-400" size={18} strokeWidth={2} />
                <h3 className="text-base font-semibold text-slate-100">Recent Commits</h3>
              </div>
              
              <div className="space-y-2">
                {analysisData.githubData.recentCommits.map((commit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 p-2.5 hover:bg-slate-850 rounded-md transition-smooth"
                  >
                    <Badge variant="secondary" size="xs" className="font-mono flex-shrink-0">
                      {commit.sha}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-200 leading-relaxed">{commit.message}</p>
                      <p className="text-[10px] text-slate-600 mt-1">
                        {commit.author} • {new Date(commit.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* AI Insights */}
          {analysisData.insights && analysisData.insights.length > 0 && (
            <Card>
              <h3 className="text-base font-semibold text-slate-100 mb-3">AI Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisData.insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md border ${
                      insight.type === 'success' ? 'bg-success-500/10 border-success-500/20' :
                      insight.type === 'warning' ? 'bg-warning-500/10 border-warning-500/20' :
                      insight.type === 'error' ? 'bg-error-500/10 border-error-500/20' :
                      'bg-accent-blue-500/10 border-accent-blue-500/20'
                    }`}
                  >
                    <h4 className="text-sm font-semibold text-slate-200 mb-1">{insight.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{insight.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="primary" icon={FileText} size="sm">
              Generate Documentation
            </Button>
            <Button variant="secondary" icon={Code2} size="sm">
              Generate Tests
            </Button>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositoryAnalyzer;

// Made with Bob
