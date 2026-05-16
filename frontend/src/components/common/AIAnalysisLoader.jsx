import React, { useState, useEffect } from 'react';
import { Terminal, Folder, Package, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

const AIAnalysisLoader = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);
  
  const stages = [
    { 
      icon: Terminal, 
      label: 'Connecting to repository...', 
      duration: 1000,
      color: 'text-accent-blue-400'
    },
    { 
      icon: Folder, 
      label: 'Parsing repository structure...', 
      duration: 1500,
      color: 'text-accent-cyan-400'
    },
    { 
      icon: Package, 
      label: 'Indexing modules and dependencies...', 
      duration: 1800,
      color: 'text-success-400'
    },
    { 
      icon: Code2, 
      label: 'Detecting frameworks and patterns...', 
      duration: 1600,
      color: 'text-warning-400'
    },
    { 
      icon: Sparkles, 
      label: 'Analyzing with AI...', 
      duration: 2000,
      color: 'text-accent-blue-400'
    },
    { 
      icon: CheckCircle2, 
      label: 'Generating insights...', 
      duration: 1200,
      color: 'text-success-400'
    }
  ];

  useEffect(() => {
    if (currentStage < stages.length) {
      const timer = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
      }, stages[currentStage].duration);
      
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentStage]);

  return (
    <div className="py-8">
      <div className="max-w-md mx-auto">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-1 bg-slate-850 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-blue-500 to-accent-cyan-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = index === currentStage;
            const isCompleted = index < currentStage;
            
            return (
              <div
                key={index}
                className={`
                  flex items-center gap-3 p-3 rounded border transition-all duration-300
                  ${isActive ? 'bg-slate-850/60 border-slate-700/50' : 
                    isCompleted ? 'bg-slate-900/30 border-slate-800/30' : 
                    'bg-transparent border-slate-800/20'}
                `}
              >
                <div className={`
                  p-1.5 rounded border transition-all duration-300
                  ${isActive ? `bg-${stage.color.split('-')[1]}-500/10 border-${stage.color.split('-')[1]}-500/30` :
                    isCompleted ? 'bg-success-500/10 border-success-500/30' :
                    'bg-slate-850/50 border-slate-800/30'}
                `}>
                  <Icon 
                    className={`
                      ${isActive ? stage.color : 
                        isCompleted ? 'text-success-400' : 
                        'text-slate-600'}
                      transition-colors duration-300
                    `}
                    size={14} 
                    strokeWidth={2}
                  />
                </div>
                
                <div className="flex-1">
                  <p className={`
                    text-xs font-medium transition-colors duration-300
                    ${isActive ? 'text-slate-200' : 
                      isCompleted ? 'text-slate-400' : 
                      'text-slate-600'}
                  `}>
                    {stage.label}
                  </p>
                </div>
                
                {isActive && (
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-accent-blue-400 animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-1 rounded-full bg-accent-blue-400 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-1 rounded-full bg-accent-blue-400 animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
                
                {isCompleted && (
                  <CheckCircle2 className="text-success-400" size={14} strokeWidth={2} />
                )}
              </div>
            );
          })}
        </div>

        {/* Status text */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-500 font-mono">
            Processing repository • {Math.round(((currentStage + 1) / stages.length) * 100)}% complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisLoader;

// Made with Bob