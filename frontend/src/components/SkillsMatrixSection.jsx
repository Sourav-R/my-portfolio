import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { toolsProficiency } from '../labExperience';
import { Code, Terminal, Shield, Search, Wrench, Bug, Server } from 'lucide-react';

const categoryIcons = {
  'SOC & Threat Detection': Shield,
  'Penetration Testing': Bug,
  'IDS/IPS & Network Security': Terminal,
  'Programming & Automation': Code,
  'Cloud & Infrastructure': Server,
  'Security Tools & Honeypots': Wrench
};

const categoryStyles = {
  'SOC & Threat Detection': {
    borderColor: 'border-cyan-500/20',
    borderHover: 'hover:border-cyan-500',
    bgColor: 'bg-cyan-500/10',
    textColor: 'text-cyan-400',
    iconColor: 'text-cyan-500',
    progressBg: 'bg-cyan-500',
    badgeBorder: 'border-cyan-500/50',
    badgeBg: 'bg-cyan-500/5'
  },
  'Penetration Testing': {
    borderColor: 'border-purple-500/20',
    borderHover: 'hover:border-purple-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-400',
    iconColor: 'text-purple-500',
    progressBg: 'bg-purple-500',
    badgeBorder: 'border-purple-500/50',
    badgeBg: 'bg-purple-500/5'
  },
  'IDS/IPS & Network Security': {
    borderColor: 'border-emerald-500/20',
    borderHover: 'hover:border-emerald-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
    iconColor: 'text-emerald-500',
    progressBg: 'bg-emerald-500',
    badgeBorder: 'border-emerald-500/50',
    badgeBg: 'bg-emerald-500/5'
  },
  'Programming & Automation': {
    borderColor: 'border-blue-500/20',
    borderHover: 'hover:border-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    iconColor: 'text-blue-500',
    progressBg: 'bg-blue-500',
    badgeBorder: 'border-blue-500/50',
    badgeBg: 'bg-blue-500/5'
  },
  'Cloud & Infrastructure': {
    borderColor: 'border-orange-500/20',
    borderHover: 'hover:border-orange-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-400',
    iconColor: 'text-orange-500',
    progressBg: 'bg-orange-500',
    badgeBorder: 'border-orange-500/50',
    badgeBg: 'bg-orange-500/5'
  },
  'Security Tools & Honeypots': {
    borderColor: 'border-red-500/20',
    borderHover: 'hover:border-red-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-400',
    iconColor: 'text-red-500',
    progressBg: 'bg-red-500',
    badgeBorder: 'border-red-500/50',
    badgeBg: 'bg-red-500/5'
  }
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
            const styles = categoryStyles[category];

            return (
              <Card
                key={category}
                className={`bg-[#0a0a0a]/50 backdrop-blur-lg ${styles.borderColor} ${styles.borderHover} p-6 transition-all duration-300`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 ${styles.bgColor} rounded-lg`}>
                    <Icon className={`h-5 w-5 ${styles.iconColor}`} />
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
                          <Badge className={`text-xs ${styles.badgeBg} ${styles.textColor} ${styles.badgeBorder}`}>
                            {getProficiencyLabel(tool.level)}
                          </Badge>
                        </div>
                        <span className={`text-xs font-mono ${styles.textColor}`}>
                          {tool.level}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="relative h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div
                          className={`absolute top-0 left-0 h-full ${styles.progressBg} rounded-full transition-all duration-500`}
                          style={{ width: `${tool.level}%` }}
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