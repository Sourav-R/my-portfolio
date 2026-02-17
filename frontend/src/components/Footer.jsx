import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profileData, currentInterests } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-emerald-500/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2 font-mono">
              {profileData.name}
            </h3>
            <p className="text-gray-400 text-sm">
              {profileData.role}
            </p>
            <p className="text-emerald-500 text-sm mt-1">
              {profileData.company}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-emerald-500 transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-emerald-500 transition-colors text-sm"
                >
                  Lab Monitor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-emerald-500 transition-colors text-sm"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-emerald-500 transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#121212] border border-emerald-500/20 rounded-lg hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-400 hover:text-emerald-500" />
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#121212] border border-blue-500/20 rounded-lg hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-500" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-3 bg-[#121212] border border-purple-500/20 rounded-lg hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-gray-400 hover:text-purple-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Easter Egg - Terminal Line */}
        <div className="border-t border-emerald-500/10 pt-8">
          <div className="bg-[#121212] border border-emerald-500/20 rounded-lg p-4 font-mono text-sm">
            <div className="flex items-start gap-2">
              <span className="text-emerald-500">sourav@ringwood-home:~$</span>
              <span className="text-gray-400">cat current_interests.json</span>
            </div>
            <pre className="text-gray-300 mt-2 text-xs">
{`{
  "reading": "${currentInterests.reading}",
  "tech": "${currentInterests.tech}",
  "hobby": "${currentInterests.hobby}"
}`}
            </pre>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            © {currentYear} {profileData.name}. All rights reserved.
          </p>
          <p className="mt-1">
            Built with <span className="text-emerald-500">React</span> + <span className="text-blue-500">TypeScript</span> + <span className="text-purple-500">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
