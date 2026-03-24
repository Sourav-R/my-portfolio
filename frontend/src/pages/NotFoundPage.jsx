import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const [lines, setLines] = useState([]);
  const navigate = useNavigate();

  const sequence = [
    { text: "> INTRUSION DETECTED.", delay: 500, color: "text-red-500" },
    {
      text: "> UNAUTHORIZED ACCESS ATTEMPT LOGGED.",
      delay: 1200,
      color: "text-red-400",
    },
    {
      text: "> TRACING SECURE IP ADDRESS...",
      delay: 2000,
      color: "text-yellow-500",
    },
    { text: "> [|||||     ] 45%", delay: 2800, color: "text-cyan-400" },
    { text: "> [||||||||| ] 89%", delay: 3200, color: "text-cyan-400" },
    {
      text: "> TRACE COMPLETE. ORIGIN IDENTIFIED.",
      delay: 3800,
      color: "text-emerald-500",
    },
    {
      text: "> DEPLOYING COUNTERMEASURES...",
      delay: 4500,
      color: "text-red-500",
    },
    {
      text: "> REDIRECTING TO SAFE ZONE IN 3 SECONDS.",
      delay: 5200,
      color: "text-gray-400",
    },
  ];

  useEffect(() => {
    document.documentElement.classList.add("dark");

    const timers = sequence.map((line) => {
      return setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, line.delay);
    });

    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 8500); // Redirect after sequence finishes

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(redirectTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-red-500/30 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.15)] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* Fake Window Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border-b border-red-500/20">
          <div className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse" />
          <span className="text-xs text-red-500/80 tracking-widest uppercase">
            CRITICAL_ALERT_SYS
          </span>
        </div>

        {/* Console Body */}
        <div className="p-8 h-[400px]">
          <h1
            className="text-4xl font-bold text-red-500 mb-8 glitch-text"
            data-text="ERROR 404"
          >
            ERROR 404
          </h1>

          <div className="space-y-3 text-sm md:text-base">
            {lines.map((line, i) => (
              <div key={i} className={`${line.color} animate-fade-in`}>
                <span className="mr-2 opacity-50">
                  [{new Date().toISOString().split("T")[1].slice(0, 8)}]
                </span>
                {line.text}
              </div>
            ))}
            <div className="flex items-center gap-1 mt-4">
              <span className="text-red-500">{">"}</span>
              <span className="w-2.5 h-5 bg-red-500/80 typewriter-cursor inline-block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
