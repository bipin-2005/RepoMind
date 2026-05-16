import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Code2,
  FileCode,
  Languages,
  Star,
  GitFork,
  Eye,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import TechStackChart from '../components/dashboard/TechStackChart';
import InsightCard from '../components/dashboard/InsightCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import AISummary from '../components/dashboard/AISummary';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';
import { repositoryAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [repository, setRepository] = useState(null);
  const [insights, setInsights] = useState([]);
  const [recentActions, setRecentActions] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await repositoryAPI.getAll();
        
        if (!isMounted) return;
        
        if (response.success && response.data && response.data.length > 0) {
          const latestRepo = response.data[0];
          setRepository(latestRepo);
          setInsights(latestRepo.insights || []);
          
          // Transform recent commits to activity feed format
          if (latestRepo.githubData?.recentCommits) {
            const activities = latestRepo.githubData.recentCommits.map((commit, index) => ({
              id: index + 1,
              action: commit.message,
              repository: latestRepo.name,
              time: new Date(commit.date).toLocaleString(),
              icon: 'GitCommit',
              status: 'completed'
            }));
            setRecentActions(activities);
          }
          
          // Transform languages to chart data
          if (latestRepo.languages) {
            const languageColors = {
              JavaScript: '#f7df1e',
              TypeScript: '#3178c6',
              Python: '#3776ab',
              Java: '#007396',
              Go: '#00add8',
              Rust: '#ce422b',
              Ruby: '#cc342d',
              PHP: '#777bb4',
              'C++': '#00599c',
              'C#': '#239120',
              CSS: '#264de4',
              HTML: '#e34c26'
            };
            
            const languageDistribution = Object.entries(latestRepo.languages).map(([name, value]) => ({
              name,
              value,
              color: languageColors[name] || '#6b7280'
            }));
            
            setChartData({ languageDistribution });
          }
        }
      } catch (err) {
        if (!isMounted) return;
        setError('Failed to load repository data');
        console.error('Error fetching repository:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (error || !repository) {
    return (
      <div className="space-y-5 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-100 mb-1">Dashboard</h1>
            <p className="text-sm text-slate-500">
              Repository intelligence and AI-powered insights
            </p>
          </div>
        </div>
        <Card padding="lg">
          <div className="text-center py-16">
            <div className="bg-slate-850 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 border border-slate-800">
              <FolderGit2 className="text-slate-600" size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">No Repository Analyzed</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
              Start by analyzing a GitHub repository to unlock AI-powered insights and metrics
            </p>
            <a
              href="/analyzer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-blue-600 hover:bg-accent-blue-700 text-white text-sm font-medium rounded-md transition-smooth border border-accent-blue-500/50"
            >
              <Code2 size={16} strokeWidth={2} />
              Analyze Repository
            </a>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-100 mb-1 tracking-tight">Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Repository intelligence and AI-powered insights
          </p>
        </div>
        <Badge variant="success" size="sm" dot className="self-start sm:self-auto">
          Analyzed 2m ago
        </Badge>
      </div>
      
      {/* Repository Overview Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        <StatCard
          title="Repository"
          value={repository.name}
          icon={FolderGit2}
          color="primary"
        />
        <StatCard
          title="Stars"
          value={repository.githubData?.stars || 0}
          icon={Star}
          color="warning"
        />
        <StatCard
          title="Forks"
          value={repository.githubData?.forks || 0}
          icon={GitFork}
          color="success"
        />
        <StatCard
          title="Open Issues"
          value={repository.githubData?.openIssues || 0}
          icon={AlertCircle}
          color="error"
        />
      </div>
      
      {/* Repository Details Card */}
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-base sm:text-lg font-semibold text-slate-100 tracking-tight break-words">
                {repository.name}
              </h2>
              <Badge variant="primary" size="xs" dot>Active</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-1.5 leading-relaxed">{repository.description}</p>
            <p className="text-xs text-slate-500">
              Analyzed {new Date(repository.analyzedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repository.techStack && repository.techStack.length > 0 ? (
            repository.techStack.map((tech, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {tech}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary" size="sm">No tech stack detected</Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 separator">
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Total Files</p>
            <p className="text-base font-semibold text-slate-200 tabular-nums">
              {repository.structure?.totalFiles?.toLocaleString() || 0}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Watchers</p>
            <p className="text-base font-semibold text-slate-200 tabular-nums">
              {repository.githubData?.watchers?.toLocaleString() || 0}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Contributors</p>
            <p className="text-base font-semibold text-slate-200 tabular-nums">
              {repository.githubData?.contributors?.length || 0}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Languages</p>
            <p className="text-base font-semibold text-slate-200 tabular-nums">
              {repository.languages ? Object.keys(repository.languages).length : 0}
            </p>
          </div>
        </div>
      </Card>
      
      {/* Charts and Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Tech Stack Chart */}
        {chartData?.languageDistribution && (
          <TechStackChart data={chartData.languageDistribution} />
        )}
        
        {/* Recent Activity */}
        {recentActions.length > 0 && (
          <ActivityFeed activities={recentActions} />
        )}
      </div>
      
      {/* AI Summary Section */}
      {repository?.aiSummary && (
        <AISummary aiSummary={repository.aiSummary} />
      )}
      
      {/* AI Insights Section */}
      {insights.length > 0 && (
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-100 mb-3">AI Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
            {insights.map((insight, index) => (
              <InsightCard key={insight.id || index} insight={insight} />
            ))}
          </div>
        </div>
      )}
      
      {/* Contributors Section */}
      {repository.githubData?.contributors && repository.githubData.contributors.length > 0 && (
        <Card>
          <h3 className="text-sm sm:text-base font-semibold text-slate-100 mb-3 sm:mb-4">Top Contributors</h3>
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
            {repository.githubData.contributors.slice(0, 5).map((contributor, index) => (
              <div key={index} className="text-center group">
                <img
                  src={contributor.avatar}
                  alt={contributor.login}
                  className="w-12 h-12 rounded mx-auto mb-2 border border-slate-800/50 group-hover:border-accent-blue-500/40 transition-smooth"
                />
                <p className="text-xs font-medium text-slate-200 truncate">{contributor.login}</p>
                <p className="text-[10px] text-slate-500 tabular-nums">{contributor.contributions} commits</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {/* Quick Actions */}
      <Card>
        <h3 className="text-sm sm:text-base font-semibold text-slate-100 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/readme-generator')}
            className="p-3 rounded text-left transition-smooth group hover:bg-slate-850/60 border border-slate-800/40 hover:border-accent-blue-500/30"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="bg-accent-blue-500/10 p-1.5 rounded border border-slate-800/40 group-hover:border-accent-blue-500/30 transition-smooth">
                <Sparkles className="text-accent-blue-400" size={16} strokeWidth={2} />
              </div>
              <h4 className="text-sm font-semibold text-slate-200">Generate README</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Create professional documentation with AI
            </p>
          </button>
          
          <button className="p-3 rounded text-left transition-smooth group border border-slate-800/40 opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="bg-success-500/10 p-1.5 rounded border border-slate-800/40">
                <Code2 className="text-success-400" size={16} strokeWidth={2} />
              </div>
              <h4 className="text-sm font-semibold text-slate-200">Generate Tests</h4>
              <span className="ml-auto text-[10px] bg-slate-850 text-slate-500 px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider">Soon</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-generate unit tests for your code
            </p>
          </button>
          
          <button
            onClick={() => navigate('/analyzer')}
            className="p-3 rounded text-left transition-smooth group hover:bg-slate-850/60 border border-slate-800/40 hover:border-accent-cyan-500/30"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="bg-accent-cyan-500/10 p-1.5 rounded border border-slate-800/40 group-hover:border-accent-cyan-500/30 transition-smooth">
                <FolderGit2 className="text-accent-cyan-400" size={16} strokeWidth={2} />
              </div>
              <h4 className="text-sm font-semibold text-slate-200">Analyze Repository</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Start analyzing a new repository
            </p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

// Made with Bob
