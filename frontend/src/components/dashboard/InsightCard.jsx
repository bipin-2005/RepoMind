import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { AlertTriangle, CheckCircle, Info, XCircle, Zap } from 'lucide-react';

const InsightCard = ({ insight }) => {
  const icons = {
    AlertTriangle,
    CheckCircle,
    Info,
    XCircle,
    Zap
  };
  
  const Icon = icons[insight.icon] || Info;
  
  const typeColors = {
    warning: { bg: 'bg-warning-500/10', text: 'text-warning-400', border: 'border-warning-500/20' },
    success: { bg: 'bg-success-500/10', text: 'text-success-400', border: 'border-success-500/20' },
    error: { bg: 'bg-error-500/10', text: 'text-error-400', border: 'border-error-500/20' },
    info: { bg: 'bg-accent-blue-500/10', text: 'text-accent-blue-400', border: 'border-accent-blue-500/20' }
  };
  
  const colors = typeColors[insight.type] || typeColors.info;
  
  const severityVariants = {
    high: 'error',
    medium: 'warning',
    low: 'info'
  };
  
  return (
    <Card hover className={`border ${colors.border}`}>
      <div className="flex items-start gap-3">
        <div className={`${colors.bg} p-2 rounded-md flex-shrink-0 border border-slate-800/50`}>
          <Icon className={colors.text} size={16} strokeWidth={2} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="text-sm font-semibold text-slate-100">{insight.title}</h4>
            {insight.severity && (
              <Badge variant={severityVariants[insight.severity]} size="xs">
                {insight.severity}
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed mb-2">{insight.description}</p>
          
          <div className="flex items-center gap-3 text-xs">
            {insight.count && (
              <span className={`${colors.text} font-medium`}>
                {insight.count} {insight.count === 1 ? 'issue' : 'issues'}
              </span>
            )}
            {insight.score && (
              <span className={`${colors.text} font-medium`}>
                Score: {insight.score}/10
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InsightCard;

// Made with Bob
