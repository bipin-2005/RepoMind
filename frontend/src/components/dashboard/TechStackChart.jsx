import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../common/Card';

const TechStackChart = ({ data, title = 'Language Distribution' }) => {
  const COLORS = ['#3178c6', '#f7df1e', '#e34c26', '#10b981', '#f59e0b', '#8b5cf6'];
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800/50 p-2.5 rounded shadow-lg">
          <p className="text-xs font-semibold text-slate-200">{payload[0].name}</p>
          <p className="text-xs text-accent-blue-400 font-medium tabular-nums">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-100 mb-3 sm:mb-4">{title}</h3>
      
      <div className="w-full h-[180px] xs:h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="70%"
              fill="#8884d8"
              dataKey="value"
              strokeWidth={1.5}
              stroke="#13171d"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Language Stats */}
      <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
        {data.map((lang, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-3">
            <div
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: lang.color || COLORS[index % COLORS.length] }}
            />
            <span className="text-xs sm:text-sm text-slate-300 flex-1 truncate">{lang.name}</span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium tabular-nums">{lang.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TechStackChart;

// Made with Bob
