import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { 
  Brain, 
  Code, 
  Layers, 
  FolderTree, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

const AISummary = ({ aiSummary }) => {
  if (!aiSummary) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">AI-Generated Summary</h2>
        </div>
        <p className="text-gray-500">No AI summary available yet.</p>
      </Card>
    );
  }

  const {
    overview = {},
    technologies = { frontend: {}, backend: {}, languages: [] },
    structure = {},
    improvements = [],
    metrics = {}
  } = aiSummary;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getActivityColor = (level) => {
    switch (level) {
      case 'Very Active':
        return 'text-green-600 bg-green-100';
      case 'Active':
        return 'text-blue-600 bg-blue-100';
      case 'Moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'Inactive':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
      {/* Overview Section */}
      <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">AI-Generated Summary</h2>
          <Badge variant="info" className="ml-auto">
            Powered by AI
          </Badge>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Project Purpose */}
          {overview.summary && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Project Purpose</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{overview.summary}</p>
            </div>
          )}

          {/* Architecture */}
          {overview.architecture && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Architecture Overview</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{overview.architecture}</p>
            </div>
          )}

          {/* Metrics */}
          {(overview.activityLevel || overview.complexityScore || metrics.contributors || metrics.commits) && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 border-t">
              {overview.activityLevel && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Activity Level</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getActivityColor(overview.activityLevel)}`}>
                    {overview.activityLevel}
                  </span>
                </div>
              )}
              {overview.complexityScore && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Complexity</p>
                  <p className="text-lg font-bold text-gray-800">{overview.complexityScore}/10</p>
                </div>
              )}
              {metrics.contributors && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contributors</p>
                  <p className="text-lg font-bold text-gray-800">{metrics.contributors}</p>
                </div>
              )}
              {metrics.commits && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Recent Commits</p>
                  <p className="text-lg font-bold text-gray-800">{metrics.commits}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Technologies Section */}
      <Card className="p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
          <h3 className="text-base sm:text-lg md:text-xl font-bold">Technology Stack</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Frontend */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Frontend
            </h4>
            <div className="space-y-2">
              {technologies.frontend?.languages?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {technologies.frontend.languages.map((lang, idx) => (
                      <Badge key={idx} variant="default" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {technologies.frontend?.frameworks?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Frameworks</p>
                  <div className="flex flex-wrap gap-1">
                    {technologies.frontend.frameworks.map((fw, idx) => (
                      <Badge key={idx} variant="info" className="text-xs">
                        {fw}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {(!technologies.frontend?.languages?.length && !technologies.frontend?.frameworks?.length) && (
                <p className="text-sm text-gray-400">No frontend technologies detected</p>
              )}
            </div>
          </div>

          {/* Backend */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Backend
            </h4>
            <div className="space-y-2">
              {technologies.backend?.languages?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {technologies.backend.languages.map((lang, idx) => (
                      <Badge key={idx} variant="default" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {technologies.backend?.frameworks?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Frameworks</p>
                  <div className="flex flex-wrap gap-1">
                    {technologies.backend.frameworks.map((fw, idx) => (
                      <Badge key={idx} variant="info" className="text-xs">
                        {fw}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {(!technologies.backend?.languages?.length && !technologies.backend?.frameworks?.length) && (
                <p className="text-sm text-gray-400">No backend technologies detected</p>
              )}
            </div>
          </div>
        </div>

        {/* Language Distribution */}
        {technologies.languages?.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Language Distribution</h4>
            <div className="space-y-2">
              {technologies.languages.slice(0, 5).map((lang, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-24">{lang.name}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">
                    {lang.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Structure Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FolderTree className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-bold">Folder Structure</h3>
        </div>

        {structure.summary && (
          <p className="text-gray-600 mb-4 leading-relaxed">{structure.summary}</p>
        )}

        {structure.topFolders?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Directories</h4>
            {structure.topFolders.map((folder, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700 font-mono">{folder.name}</span>
                <span className="text-xs text-gray-500">{folder.files} files</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Improvements Section */}
      {improvements && improvements.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold">Suggested Improvements</h3>
          </div>

          <div className="space-y-3">
            {improvements.map((improvement, idx) => (
              <div key={idx} className="border-l-4 border-gray-300 pl-4 py-2">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {improvement.priority === 'high' && <AlertCircle className="w-4 h-4 text-red-500" />}
                    {improvement.priority === 'medium' && <Info className="w-4 h-4 text-yellow-500" />}
                    {improvement.priority === 'low' && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    <span className="font-semibold text-sm text-gray-800">{improvement.category}</span>
                  </div>
                  <Badge variant={getPriorityColor(improvement.priority)} className="text-xs">
                    {improvement.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{improvement.suggestion}</p>
                <p className="text-xs text-gray-500 italic">{improvement.impact}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AISummary;

// Made with Bob
