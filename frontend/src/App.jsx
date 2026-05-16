import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import RepositoryAnalyzer from './pages/RepositoryAnalyzer';
import ReadmeGenerator from './pages/ReadmeGenerator';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyzer" element={<RepositoryAnalyzer />} />
          <Route path="/readme-generator" element={<ReadmeGenerator />} />
          {/* Add more routes as features are implemented */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

// Made with Bob
