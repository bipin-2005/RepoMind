import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import {
  Search,
  FileText,
  TestTube,
  GitBranch,
  Package,
  Clock,
  GitCommit
} from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  const icons = {
    Search,
    FileText,
    TestTube,
    GitBranch,
    GitCommit,
    Package
  };
  
  return (
    <Card>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-slate-100">Recent Activity</h3>
        <Badge variant="secondary" size="xs">
          {activities.length}
        </Badge>
      </div>
      
      <div className="space-y-0 relative">
        {/* Timeline line */}
        <div className="absolute left-[14px] top-2 bottom-2 w-px bg-slate-800/40"></div>
        
        {activities.map((activity, index) => {
          const Icon = icons[activity.icon] || Clock;
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-2.5 py-2 hover:bg-slate-850/40 -mx-2 px-2 rounded transition-smooth group relative"
            >
              {/* Timeline dot */}
              <div className="relative z-10 bg-accent-blue-500/10 p-1.5 rounded border border-slate-800/40 group-hover:border-accent-blue-500/30 transition-smooth flex-shrink-0">
                <Icon className="text-accent-blue-400" size={14} strokeWidth={2} />
              </div>
              
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs font-medium text-slate-200 mb-0.5 leading-tight">
                  {activity.action}
                </p>
                <p className="text-[10px] text-slate-400 truncate font-mono">
                  {activity.repository}
                </p>
              </div>
              
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                <span className="text-[10px] text-slate-500 tabular-nums">{activity.time}</span>
                <Badge variant="success" size="xs">
                  {activity.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-3 text-xs text-accent-blue-400 hover:text-accent-blue-300 transition-smooth py-2 font-medium">
        View all activity →
      </button>
    </Card>
  );
};

export default ActivityFeed;

// Made with Bob
