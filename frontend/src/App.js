import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';

import LabsArchive from './pages/LabsArchive';
import Vault from './pages/Vault';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from './components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

function App() {
  useEffect(() => {
    // Hidden DevTools Warning Easter Egg
    const css = "color: #ef4444; font-size: 20px; font-weight: bold; background: #0a0a0a; padding: 10px; border: 1px solid #ef4444; border-radius: 5px; font-family: monospace;";
    console.log("%c[!] UNAUTHORIZED DIAGNOSTIC ACCESS DETECTED.", css);
    console.log("%c> System scans indicate Developer Tools have been initialized.", "color: #06b6d4; font-family: monospace;");
    console.log("%c> Looking for vulnerabilities in the source code? We need people like you.", "color: #10b981; font-family: monospace;");
    console.log("%c> ssh contact: sourav.rav143@gmail.com", "color: #8b5cf6; font-family: monospace;");
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />

          <Route path="/labs" element={<LabsArchive />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <SpeedInsights />
    </div>
  );
}

export default App;
