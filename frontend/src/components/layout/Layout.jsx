import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-56 xl:ml-64 transition-all duration-300">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="pt-12 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-4 sm:py-5 md:py-6 min-h-screen">
          <div className="max-w-container-3xl 2xl:max-w-container-4xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

// Made with Bob
