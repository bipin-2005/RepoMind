import React, { useState } from 'react';
import { Search, Bell, User, Github, Command, Menu } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const Navbar = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <nav className="h-12 lg:h-14 bg-slate-925 border-b border-slate-800/40 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 fixed top-0 right-0 left-0 lg:left-56 xl:left-64 z-30 transition-all duration-300">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-slate-850/60 rounded transition-smooth text-slate-400 hover:text-slate-200 mr-2 touch-target"
        aria-label="Open menu"
      >
        <Menu size={20} strokeWidth={2} />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            className="w-full text-xs sm:text-sm"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 bg-slate-850 border border-slate-800/50 rounded">
              <Command size={9} />
              K
            </kbd>
          </div>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 ml-2 sm:ml-3 md:ml-4">
        {/* GitHub Button */}
        <Button
          variant="secondary"
          size="sm"
          icon={Github}
          onClick={() => window.open('https://github.com', '_blank')}
          className="hidden sm:flex"
        >
          <span className="hidden md:inline">Connect GitHub</span>
          <span className="md:hidden">GitHub</span>
        </Button>
        
        {/* Notifications */}
        <button className="relative p-2 sm:p-1.5 hover:bg-slate-850/60 rounded transition-smooth focus-ring touch-target sm:min-h-0">
          <Bell size={16} strokeWidth={2} className="text-slate-400 sm:w-[15px] sm:h-[15px]" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-error-500 rounded-full ring-2 ring-slate-925"></span>
        </button>
        
        {/* User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 hover:bg-slate-850/60 px-1.5 sm:px-2 py-1 rounded cursor-pointer transition-smooth">
          <div className="w-7 h-7 sm:w-6 sm:h-6 bg-gradient-to-br from-accent-blue-500 to-accent-cyan-500 rounded flex items-center justify-center flex-shrink-0">
            <User size={14} strokeWidth={2.5} className="text-white sm:w-[13px] sm:h-[13px]" />
          </div>
          <div className="hidden lg:block">
            <p className="text-[11px] font-semibold text-slate-200">John Doe</p>
            <p className="text-[9px] text-slate-500">Developer</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Made with Bob
