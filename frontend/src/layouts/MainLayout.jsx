import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1 pb-12">
        <Outlet />
      </main>
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs font-mono text-slate-500">
        Cars x Battle • Version Bêta Démo Tactique • Hard Sci-Fi Engine
      </footer>
    </div>
  );
}

export default MainLayout;