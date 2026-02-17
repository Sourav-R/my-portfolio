import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Activity, Cpu, HardDrive, Container } from 'lucide-react';
import { homeLabServices, securityStatus } from '../mock';

const LabMonitor = ({ recruiterMode }) => {
  const getStatusColor = (status) => {
    return status === 'running' ? 'text-emerald-500' : 'text-red-500';
  };

  const parsePercentage = (value) => {
    return parseInt(value.replace('%', ''));
  };

  return (
    <section id="lab" className="min-h-screen px-4 py-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-emerald-500">&gt;</span> Lab Monitor
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Real-time monitoring dashboard for my 24/7 home lab infrastructure. All services are containerized and managed through Proxmox virtualization.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#121212] border-emerald-500/20 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Uptime</p>
                <p className="text-2xl font-bold text-white">{securityStatus.uptime}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#121212] border-blue-500/20 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Container className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Active Services</p>
                <p className="text-2xl font-bold text-white">{homeLabServices.length}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#121212] border-purple-500/20 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Cpu className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Containers</p>
                <p className="text-2xl font-bold text-white">
                  {homeLabServices.reduce((sum, service) => sum + service.containers, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#121212] border-emerald-500/20 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <HardDrive className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-xl font-bold text-emerald-500">OPERATIONAL</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeLabServices.map((service, index) => (
            <Card
              key={service.id}
              className={`bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-6 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 ${
                recruiterMode ? '' : 'hover:scale-105'
              }`}
              style={{
                animation: recruiterMode ? 'none' : `fadeIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Service Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 font-mono">{service.name}</h3>
                  <p className="text-sm text-gray-400">{service.type}</p>
                </div>
                <Badge className={`${getStatusColor(service.status)} bg-transparent border-current`}>
                  {service.status}
                </Badge>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-emerald-500 font-mono">{service.uptime}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">CPU Usage</span>
                    <span className="text-blue-400 font-mono">{service.cpu}</span>
                  </div>
                  <Progress value={parsePercentage(service.cpu)} className="h-2 bg-[#1a1a1a]" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Memory</span>
                    <span className="text-purple-400 font-mono">{service.memory}</span>
                  </div>
                  <Progress value={parsePercentage(service.memory)} className="h-2 bg-[#1a1a1a]" />
                </div>

                {service.containers > 0 && (
                  <div className="pt-2 border-t border-emerald-500/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Containers</span>
                      <span className="text-emerald-400 font-mono">{service.containers}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-gray-400">Running</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-400">CPU Usage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-400">Memory Usage</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default LabMonitor;
