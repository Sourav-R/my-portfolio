import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const radarData = [
  { subject: "Systems Engineering", A: 90, fullMark: 100 },
  { subject: "Cloud Security", A: 85, fullMark: 100 },
  { subject: "Defensive Ops", A: 95, fullMark: 100 },
  { subject: "VAPT", A: 80, fullMark: 100 },
  { subject: "Automation", A: 85, fullMark: 100 },
  { subject: "Governance", A: 75, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050505] border border-cyan-500/50 p-2 rounded shadow-lg">
        <p className="font-mono text-cyan-400 text-xs tracking-wider uppercase">
          {payload[0].payload.subject}
        </p>
        <p className="font-mono text-gray-400 text-[10px] mt-1">
          CAPACITY: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const SecurityRadarChart = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-transparent relative"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-[350px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#334155" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Operator"
              dataKey="A"
              stroke="#06b6d4"
              strokeWidth={1.5}
              fill="transparent"
              isAnimationActive={true}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
      <div className="absolute top-4 right-4 text-[10px] text-gray-600 font-mono text-right">
        [DIAGNOSTIC: MULTI-AXIS ANALYSIS]
        <br />
        <span className="text-cyan-600">STATUS: OPTIMAL</span>
      </div>
    </div>
  );
};

export default SecurityRadarChart;
