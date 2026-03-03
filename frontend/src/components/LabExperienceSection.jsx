import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Shield, Code, BookOpen } from 'lucide-react';
import { labStats, threatCategories } from '../labExperience';

const LabExperienceSection = ({ recruiterMode }) => {
  const [countersVisible, setCountersVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    labs: 0,
    courses: 0,
    hours: 0
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersVisible) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [countersVisible]);

  useEffect(() => {
    if (countersVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedStats({
          labs: Math.floor(labStats.totalLabs * progress),
          courses: Math.floor(labStats.coursesCompleted.length * progress),
          hours: Math.floor(labStats.totalHours * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats({
            labs: labStats.totalLabs,
            courses: labStats.coursesCompleted.length,
            hours: labStats.totalHours
          });
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [countersVisible]);

  return (
    <section
      id="lab-experience"
      ref={sectionRef}
      className="min-h-screen px-4 py-20 relative bg-gradient-to-b from-[#050505] to-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500">&gt;</span> Lab Experience
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Academic hands-on experience through 200+ practical cybersecurity labs covering threat detection, incident response, malware analysis, and security operations.
          </p>
        </div>

        {/* Animated Counter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Labs Completed */}
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-6 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-cyan-500" />
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500">Academic</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white font-mono">
                {animatedStats.labs}
                <span className="text-cyan-500">+</span>
              </p>
              <p className="text-gray-400 text-sm">Security Labs Completed</p>
              <div className="pt-2 border-t border-cyan-500/10">
                <p className="text-xs text-gray-500">2023-2024</p>
              </div>
            </div>
          </Card>

          {/* Courses */}
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-6 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <Code className="h-6 w-6 text-emerald-500" />
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500">Graduate</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white font-mono">{animatedStats.courses}</p>
              <p className="text-gray-400 text-sm">Advanced Security Courses</p>
              <div className="pt-2 border-t border-emerald-500/10">
                <p className="text-xs text-gray-500">Monash University</p>
              </div>
            </div>
          </Card>

          {/* Threat Categories */}
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-purple-500/20 p-6 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
              <Badge className="bg-purple-500/10 text-purple-500 border-purple-500">Diverse</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white font-mono">{threatCategories.length}</p>
              <p className="text-gray-400 text-sm">Threat Categories</p>
              <div className="pt-2 border-t border-purple-500/10">
                <p className="text-xs text-gray-500">APT, Ransomware, DDoS</p>
              </div>
            </div>
          </Card>

          {/* Total Hours */}
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-blue-500/20 p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500">Intensive</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white font-mono">
                {animatedStats.hours}
                <span className="text-blue-500">+</span>
              </p>
              <p className="text-gray-400 text-sm">Hands-On Lab Hours</p>
              <div className="pt-2 border-t border-blue-500/10">
                <p className="text-xs text-gray-500">Practical Experience</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Threat Distribution Chart */}
        <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-8 mb-6">
          <h3 className="text-xl font-bold text-white mb-6 font-mono">
            Threat Category Distribution
          </h3>
          <div className="space-y-4">
            {threatCategories.map((category, index) => (
              <div
                key={category.name}
                className="space-y-2"
                style={{
                  animation: countersVisible ? `slideIn 0.5s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{category.name}</span>
                  <span className="text-gray-400 text-xs font-mono">
                    {category.count} labs ({category.percentage}%)
                  </span>
                </div>
                <div className="relative h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: countersVisible ? `${category.percentage * 4}%` : '0%',
                      backgroundColor: category.color,
                      boxShadow: `0 0 10px ${category.color}40`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Course Badges */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Courses Completed</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {labStats.coursesCompleted.map((course) => (
              <Badge
                key={course}
                className="bg-cyan-500/10 text-cyan-400 border-cyan-500/50 px-4 py-2 text-sm font-mono"
              >
                {course}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default LabExperienceSection;
