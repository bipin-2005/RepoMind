import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FileText,
  TestTube,
  Bot,
  Settings,
  Code2,
  Sparkles,
  Zap,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard
    },
    {
      name: 'Repository Analyzer',
      path: '/analyzer',
      icon: Search
    },
    {
      name: 'README Generator',
      path: '/readme-generator',
      icon: Sparkles
    },
    {
      name: 'Documentation',
      path: '/documentation',
      icon: FileText,
      disabled: true
    },
    {
      name: 'Test Generator',
      path: '/tests',
      icon: TestTube,
      disabled: true
    },
    {
      name: 'AI Assistant',
      path: '/ai-assistant',
      icon: Bot,
      disabled: true
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      disabled: true
    }
  ];
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        w-56 lg:w-56 xl:w-64 h-screen bg-slate-925 border-r border-slate-800/40 flex flex-col fixed left-0 top-0 z-50
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3 right-3 p-2 hover:bg-slate-850/60 rounded transition-smooth text-slate-400 hover:text-slate-200 touch-target"
          aria-label="Close menu"
        >
          <X size={18} strokeWidth={2} />
        </button>

        {/* Logo */}
        <div className="h-12 lg:h-14 px-3 lg:px-4 border-b border-slate-800/40 flex items-center">
        <Link to="/" className="flex items-center gap-2 lg:gap-2.5 group">
          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-accent-blue-500 to-accent-cyan-500 rounded flex items-center justify-center flex-shrink-0">
            <Zap className="text-white" size={16} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm lg:text-base font-semibold text-slate-100 tracking-tight">RepoMind</h1>
            <p className="text-[9px] lg:text-[10px] text-slate-500 font-medium tracking-wider uppercase">AI Platform</p>
          </div>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-2 lg:px-2.5 py-3 lg:py-4 overflow-y-auto">
        <ul className="space-y-0.5 lg:space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isDisabled = item.disabled;
            
            return (
              <li key={item.path}>
                {isDisabled ? (
                  <div className="flex items-center gap-2 lg:gap-2.5 px-2.5 lg:px-3 py-1.5 lg:py-2 rounded text-slate-500 cursor-not-allowed">
                    <Icon size={16} className="lg:w-[18px] lg:h-[18px] flex-shrink-0" strokeWidth={2} />
                    <span className="text-sm lg:text-base font-medium flex-1 min-w-0">{item.name}</span>
                    <span className="text-[10px] bg-slate-850 text-slate-400 px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider flex-shrink-0">Soon</span>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-2 lg:gap-2.5 px-2.5 lg:px-3 py-1.5 lg:py-2 rounded transition-smooth group
                      ${isActive
                        ? 'bg-accent-blue-500/8 text-accent-blue-200 border border-accent-blue-500/15'
                        : 'text-slate-300 hover:bg-slate-850/60 hover:text-slate-100 border border-transparent'
                      }
                    `}
                  >
                    <Icon size={16} className="lg:w-[18px] lg:h-[18px] flex-shrink-0" strokeWidth={2} />
                    <span className="text-sm lg:text-base font-medium">{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-2 lg:p-2.5 border-t border-slate-800/40">
        <div className="bg-slate-900/30 rounded p-2 lg:p-2.5 border border-slate-800/30">
          <div className="flex items-center gap-1.5 lg:gap-2 mb-1">
            <div className="status-dot status-online"></div>
            <p className="text-xs lg:text-sm text-slate-300 font-medium">System Online</p>
          </div>
          <p className="text-[10px] lg:text-[11px] text-slate-500 font-mono">v1.0.0 • Built for developers</p>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;

// Made with Bob
