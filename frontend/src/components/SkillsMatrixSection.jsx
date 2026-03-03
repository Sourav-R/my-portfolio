import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { toolsProficiency } from '../labExperience';
import { Code, Terminal, Shield, Search, Wrench, Bug } from 'lucide-react';

const categoryIcons = {
  'Network Analysis': Terminal,
  'SIEM & Log Analysis': Search,
  'Malware Analysis': Bug,
  'Intrusion Detection': Shield,
  'Forensics & IR': Search,
  'Exploitation & Testing': Wrench
};

const categoryColors = {
  'Network Analysis': { border: 'cyan-500', bg: 'cyan-500', text: 'cyan-400' },
  'SIEM & Log Analysis': { border: 'emerald-500', bg: 'emerald-500', text: 'emerald-400' },
  'Malware Analysis': { border: 'purple-500', bg: 'purple-500', text: 'purple-400' },
  'Intrusion Detection': { border: 'red-500', bg: 'red-500', text: 'red-400' },
  'Forensics & IR': { border: 'blue-500', bg: 'blue-500', text: 'blue-400' },
  'Exploitation & Testing': { border: 'orange-500', bg: 'orange-500', text: 'orange-400' }
};

const SkillsMatrixSection = ({ recruiterMode }) => {
  const [selectedTool, setSelectedTool] = useState(null);

  const getProficiencyLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <section id="skills-matrix" className="min-h-screen px-4 py-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500">&gt;</span> Skills Matrix
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Tool proficiency matrix based on 200+ practical labs. Click on any tool to view commonly used commands and use cases.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {Object.entries(toolsProficiency).map(([category, tools]) => {
            const Icon = categoryIcons[category] || Code;
            const colors = categoryColors[category];

            return (
              <Card
                key={category}
                className={`bg-[#0a0a0a]/50 backdrop-blur-lg border-${colors.border}/20 p-6 hover:border-${colors.border} transition-all duration-300`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 bg-${colors.bg}/10 rounded-lg`}>
                    <Icon className={`h-5 w-5 text-${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">{category}</h3>
                </div>

                {/* Tools List */}
                <div className="space-y-4">
                  {tools.map((tool, index) => (
                    <div
                      key={tool.name}
                      className="group cursor-pointer"
                      onClick={() => setSelectedTool(selectedTool?.name === tool.name ? null : tool)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                            {tool.name}
                          </span>
                          <Badge className={`text-xs bg-${colors.bg}/10 text-${colors.text} border-${colors.border}/50`}>
                            {getProficiencyLabel(tool.level)}
                          </Badge>
                        </div>
                        <span className={`text-xs font-mono text-${colors.text}`}>
                          {tool.level}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="relative h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div
                          className={`absolute top-0 left-0 h-full bg-${colors.bg} rounded-full transition-all duration-500`}
                          style={{ 
                            width: `${tool.level}%`,
                            boxShadow: `0 0 10px var(--${colors.bg})40`
                          }}
                        />
                      </div>

                      {/* Expanded Commands View */}
                      {selectedTool?.name === tool.name && (
                        <div className="mt-3 p-3 bg-[#121212] border border-cyan-500/20 rounded-lg space-y-2">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Common Commands</p>
                          {tool.commands.map((cmd, idx) => (
                            <code key={idx} className="block text-xs text-cyan-400 font-mono bg-[#0a0a0a] px-2 py-1 rounded">
                              $ {cmd}
                            </code>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span>Expert (90-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Advanced (80-89%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Intermediate (70-79%)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrixSection;