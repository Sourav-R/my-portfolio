import React, { useEffect } from "react";
import { Database } from "lucide-react";
import CommandBar from "../components/CommandBar";
import Footer from "../components/Footer";
import ProjectsHub from "../components/ProjectsHub";
import LabExperienceSection from "../components/LabExperienceSection";

const LabsArchive = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200">
      <CommandBar />

      <main className="relative z-10 pt-24 pb-16">
        <div className="px-4 max-w-7xl mx-auto mb-10">
          <h1 className="text-3xl font-mono text-emerald-500 mb-2 border-b border-gray-800 pb-2 flex items-center gap-3">
            <Database className="w-6 h-6" />
            ~/labs
          </h1>
          <p className="text-gray-500 text-sm font-mono">
            &gt; ACADEMIC R&D AND TECHNICAL FOUNDATIONS ARCHIVE
          </p>
        </div>

        {/* Old Projects Hub with full tabs and detail modals */}
        <ProjectsHub />

        {/* Lab Experience Stats */}
        <LabExperienceSection />
      </main>

      <Footer />
    </div>
  );
};

export default LabsArchive;
