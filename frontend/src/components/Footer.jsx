import React, { useState } from 'react';
import { Github, Linkedin, Mail, ShieldAlert, X } from 'lucide-react';
import { profileData, currentInterests } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <footer className="relative bg-[#050505] border-t border-cyan-500/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-base font-bold text-white mb-1.5 font-mono">{profileData.name}</h3>
            <p className="text-gray-500 text-xs font-mono">{profileData.role}</p>
            <p className="text-emerald-500/70 text-xs font-mono mt-0.5">{profileData.company}</p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-3 font-mono">nav</p>
            <ul className="space-y-1.5">
              {[
                { id: 'hero', label: './home' },
                { id: 'projects', label: './projects' },
                { id: 'terminal', label: './terminal' },
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-xs font-mono"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-3 font-mono">connect</p>
            <div className="flex gap-2">
              {[
                { icon: Github, href: profileData.github, color: 'hover:border-purple-500/30 hover:text-purple-400' },
                { icon: Linkedin, href: profileData.linkedin, color: 'hover:border-blue-500/30 hover:text-blue-400' },
                { icon: Mail, href: `mailto:${profileData.email}`, color: 'hover:border-emerald-500/30 hover:text-emerald-400' },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                    className={`p-2 text-gray-600 border border-gray-800 rounded transition-all duration-300 ${social.color}`}>
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>


        {/* Copyright */}
        <div className="text-center text-[10px] text-gray-600 font-mono relative">
          <p>
            © {currentYear} {profileData.name}
            <span 
              className="text-gray-900 hover:text-red-500 cursor-pointer transition-colors" 
              onClick={() => setShowAdminModal(true)}
              title="Classified"
            >.</span>
          </p>
          <p className="mt-0.5">
            built with <span className="text-cyan-500">react</span> + <span className="text-purple-500">tailwind</span>
          </p>
        </div>
      </div>

      {/* Hidden Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#0a0a0a] border border-red-500/30 rounded-lg shadow-[0_0_40px_rgba(239,68,68,0.15)] w-full max-w-md overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-500" />
            
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-500" />
                <h3 className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">Global Sentinel Network</h3>
              </div>
              <button onClick={() => setShowAdminModal(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); setShowAdminModal(false); }} className="space-y-4 font-mono">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Operative ID</label>
                  <input type="text" className="w-full bg-[#111] border border-gray-800 focus:border-red-500/50 outline-none text-emerald-400 px-3 py-2 text-sm rounded transition-colors" placeholder="ENTER ID" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Clearance Code</label>
                  <input type="password" className="w-full bg-[#111] border border-gray-800 focus:border-red-500/50 outline-none text-red-400 px-3 py-2 text-sm rounded transition-colors" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-500 py-2.5 rounded text-xs uppercase tracking-widest transition-all mt-6">
                  Initialize Uplink
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-[9px] text-gray-600">WARNING: UNAUTHORIZED ACCESS WILL BE LOGGED</p>
                <p className="text-[9px] text-gray-600">VIOLATORS ARE SUBJECT TO NEUTRALIZATION</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
