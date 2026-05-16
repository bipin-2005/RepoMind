import React from 'react';
import Card from '../common/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = 'primary'
}) => {
  const colors = {
    primary: 'text-accent-blue-400',
    success: 'text-success-400',
    warning: 'text-warning-400',
    error: 'text-error-400',
    info: 'text-accent-cyan-400'
  };
  
  const bgColors = {
    primary: 'bg-accent-blue-500/10',
    success: 'bg-success-500/10',
    warning: 'bg-warning-500/10',
    error: 'bg-error-500/10',
    info: 'bg-accent-cyan-500/10'
  };
  
  return (
    <Card className="group hover:border-slate-700/50 transition-smooth" padding="default">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">{title}</p>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-100 tracking-tight break-words">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
              {trend === 'up' ? (
                <TrendingUp size={12} strokeWidth={2} className="text-success-400 sm:w-[14px] sm:h-[14px]" />
              ) : (
                <TrendingDown size={12} strokeWidth={2} className="text-error-400 sm:w-[14px] sm:h-[14px]" />
              )}
              <span className={`text-[10px] sm:text-xs font-medium ${trend === 'up' ? 'text-success-400' : 'text-error-400'}`}>
                {trendValue}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500">vs last month</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`${bgColors[color]} p-2 sm:p-2.5 md:p-3 rounded border border-slate-800/40 flex-shrink-0`}>
            <Icon className={`${colors[color]} sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]`} size={16} strokeWidth={2} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;

// Made with Bob
