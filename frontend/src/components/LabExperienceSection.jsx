import React, { useState, useEffect, useRef } from 'react';
import { Badge } from './ui/badge';
import { Activity, Shield, Code, BookOpen } from 'lucide-react';
import { labStats, threatCategories } from '../labExperience';

const LabExperienceSection = ({ recruiterMode }) => {
  const [countersVisible, setCountersVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ labs: 0, courses: 0, hours: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersVisible) setCountersVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [countersVisible]);

  useEffect(() => {
    if (countersVisible) {
      const duration = 2000, steps = 60, interval = duration / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const p = step / steps;
        setAnimatedStats({
          labs: Math.floor(labStats.totalLabs * p),
          courses: Math.floor(labStats.coursesCompleted.length * p),
          hours: Math.floor(labStats.totalHours * p),
        });
        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats({ labs: labStats.totalLabs, courses: labStats.coursesCompleted.length, hours: labStats.totalHours });
        }
      }, interval);
      return () => clearInterval(timer);
    }
  }, [countersVisible]);

  const statCards = [
    { icon: BookOpen, val: animatedStats.labs, suffix: '+', label: 'Security Labs', badge: 'Academic', color: 'cyan' },
    { icon: Code, val: animatedStats.courses, suffix: '', label: 'Advanced Courses', badge: 'Graduate', color: 'emerald' },
    { icon: Shield, val: threatCategories.length, suffix: '', label: 'Threat Categories', badge: 'Diverse', color: 'purple' },
    { icon: Activity, val: animatedStats.hours, suffix: '+', label: 'Lab Hours', badge: 'Intensive', color: 'blue' },
  ];

  const colorMap = {
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', hover: 'hover:border-cyan-500/40' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/40' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', hover: 'hover:border-purple-500/40' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', hover: 'hover:border-blue-500/40' },
  };

  return (
    <section id="lab-experience" ref={sectionRef} className="relative px-4 py-24 bg-[#030303]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-cmd mb-3">
            <span className="prompt">$</span> wc -l ./labs/*
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 font-mono tracking-tight">
            Lab Experience
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm">
            Academic hands-on experience through 200+ practical cybersecurity labs covering threat detection, incident response, malware analysis, and security operations.
          </p>
        </div>

        {/* Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {statCards.map((card, i) => {
            const c = colorMap[card.color];
            const Icon = card.icon;
            return (
              <div key={i} className={`bg-[#080808] border ${c.border} ${c.hover} rounded-lg p-5 transition-all duration-300 hover:shadow-lg`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 ${c.bg} rounded`}>
                    <Icon className={`h-5 w-5 ${c.text}`} />
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 ${c.bg} ${c.text} rounded font-mono`}>{card.badge}</span>
                </div>
                <p className="text-3xl font-bold text-white font-mono">
                  {card.val}<span className={c.text}>{card.suffix}</span>
                </p>
                <p className="text-gray-500 text-xs mt-1">{card.label}</p>
              </div>
            );
          })}
        </div>

        {/* Threat Distribution */}
        <div className="bg-[#080808] border border-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-bold text-white mb-5 font-mono">Threat Category Distribution</h3>
          <div className="space-y-3.5">
            {threatCategories.map((cat, i) => (
              <div key={cat.name} style={{ animation: countersVisible ? `fadeInLeft 0.5s ease-out ${i * 0.08}s both` : 'none' }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-xs font-mono">{cat.name}</span>
                  <span className="text-gray-500 text-[10px] font-mono">{cat.count} labs ({cat.percentage}%)</span>
                </div>
                <div className="relative h-2 bg-[#111] rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bar-shimmer transition-all duration-1000"
                    style={{
                      width: countersVisible ? `${Math.min(cat.percentage * 4, 100)}%` : '0%',
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LabExperienceSection;
