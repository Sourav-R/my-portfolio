import React, { useRef, useEffect, useState } from "react";

const HeroServerRack = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };
    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      return () => el.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const rotateX = -8 + mousePos.y * 6;
  const rotateY = 25 + mousePos.x * 8;

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      style={{ perspective: "800px" }}
    >
      <div
        className="server-rack-scene"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.15s ease-out",
          width: "200px",
          height: "260px",
          position: "relative",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-lg border border-cyan-500/30 bg-[#0a0e14]"
          style={{
            transform: "translateZ(40px)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Server units */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="mx-3 mt-3 first:mt-4 h-[38px] bg-[#060a10] border border-gray-700/60 rounded-sm flex items-center px-2 gap-2 group"
            >
              {/* LED indicators */}
              <div className="flex flex-col gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${i < 3 ? "bg-emerald-500" : "bg-amber-500"} shadow-[0_0_6px_currentColor]`}
                  style={{
                    animation: `led-blink ${1.5 + i * 0.3}s infinite alternate`,
                  }}
                />
                <div
                  className={`w-1.5 h-1.5 rounded-full ${i < 2 ? "bg-cyan-500" : "bg-gray-600"} shadow-[0_0_4px_currentColor]`}
                  style={{
                    animation: `led-blink ${2 + i * 0.4}s infinite alternate`,
                  }}
                />
              </div>
              {/* Drive bays */}
              <div className="flex-1 flex gap-0.5">
                {[...Array(6)].map((_, j) => (
                  <div
                    key={j}
                    className="flex-1 h-5 bg-[#0d1117] border border-gray-800/50 rounded-[1px]"
                  />
                ))}
              </div>
              {/* Status text */}
              <span className="text-[7px] font-mono text-gray-600 tracking-wider">
                {i < 3 ? "ONLINE" : "STANDBY"}
              </span>
            </div>
          ))}
          {/* Bottom panel */}
          <div className="mx-3 mt-3 flex items-center justify-between px-2">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 border border-gray-700/40 rounded-sm bg-[#060a10]"
                />
              ))}
            </div>
            <span className="text-[6px] font-mono text-cyan-500/50 tracking-widest">
              THIRU-SOC-R1
            </span>
          </div>
        </div>

        {/* Right face */}
        <div
          className="absolute inset-0 bg-[#070b11] border border-gray-800/30 rounded-r-lg"
          style={{
            transform: "rotateY(90deg) translateZ(160px)",
            width: "80px",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="h-full flex flex-col justify-center items-center gap-2 px-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-full h-2 bg-[#0a0e14] border border-gray-800/30 rounded-[1px]"
              />
            ))}
          </div>
        </div>

        {/* Top face */}
        <div
          className="absolute bg-[#080c12] border border-gray-800/20 rounded-t-lg"
          style={{
            transform: "rotateX(90deg) translateZ(0px)",
            width: "200px",
            height: "80px",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="h-full flex items-center justify-center">
            <div className="w-16 h-16 border border-gray-700/20 rounded-full flex items-center justify-center">
              <div
                className="w-8 h-8 border border-cyan-500/20 rounded-full animate-spin"
                style={{ animationDuration: "8s" }}
              >
                <div className="w-2 h-2 bg-cyan-500/40 rounded-full mt-0.5 ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute -inset-4 bg-cyan-500/5 rounded-2xl blur-xl pointer-events-none"
          style={{ transform: "translateZ(20px)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-cyan-500/20 blur-md rounded-full"
          style={{ transform: "translateZ(42px) translateY(10px)" }}
        />
      </div>
    </div>
  );
};

export default HeroServerRack;
