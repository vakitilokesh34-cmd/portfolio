import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Database, Wrench, Cpu, CheckCircle2, Sparkles } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { defaultProfile } from '../../data/portfolio';

const skillCategories = [
  { 
    key: 'programming', 
    label: 'Programming', 
    icon: Code, 
    color: 'from-blue-500/20 to-indigo-600/20',
    border: 'border-blue-500/30',
    skills: defaultProfile.skills.programming || ['Java', 'C', 'Python', 'JavaScript'],
    description: 'Core languages for systems, algorithm design, and application logic.',
  },
  { 
    key: 'webDevelopment', 
    label: 'Web & Real-Time', 
    icon: Globe, 
    color: 'from-emerald-500/20 to-teal-600/20',
    border: 'border-emerald-500/30',
    skills: defaultProfile.skills.webDevelopment || ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'Servlets', 'Socket.IO'],
    description: 'Full-stack reactive frontends, REST backends, and low-latency WebSockets.',
  },
  { 
    key: 'database', 
    label: 'Databases', 
    icon: Database, 
    color: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-500/30',
    skills: defaultProfile.skills.database || ['MySQL', 'MongoDB'],
    description: 'Relational data modeling, ACID transactions, and document stores.',
  },
  { 
    key: 'tools', 
    label: 'Tools & DevOps', 
    icon: Wrench, 
    color: 'from-purple-500/20 to-violet-600/20',
    border: 'border-purple-500/30',
    skills: defaultProfile.skills.tools || ['Git', 'GitHub', 'VS Code', 'Postman'],
    description: 'Version control, API test suites, and streamlined engineering environments.',
  },
  { 
    key: 'concepts', 
    label: 'Architecture & Concepts', 
    icon: Cpu, 
    color: 'from-pink-500/20 to-rose-600/20',
    border: 'border-pink-500/30',
    skills: defaultProfile.skills.concepts || ['Data Structures & Algorithms', 'OOP', 'REST APIs', 'Real-Time Sync', 'Blockchain & AI Integration'],
    description: 'Theoretical foundations, distributed synchronization, and cryptographic auditability.',
  },
];

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [activeTab, setActiveTab] = useState('all');

  const visibleCategories = activeTab === 'all' 
    ? skillCategories 
    : skillCategories.filter((c) => c.key === activeTab);

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      {/* Glow background */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary-400" />
              <span className="text-xs uppercase tracking-widest font-mono text-primary-400">Core Competencies</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase"
            >
              Technical <span className="text-chrome-3d">Skills</span>
            </motion.h2>
          </div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-1.5"
          >
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-dark-950 shadow-md'
                  : 'glass-card text-dark-200 hover:text-white'
              }`}
            >
              All
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === cat.key
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'glass-card text-dark-200 hover:text-white'
                }`}
              >
                <cat.icon size={12} />
                <span>{cat.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* 3D Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map((cat, idx) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-studio rounded-3xl p-6 sm:p-7 flex flex-col justify-between group hover:border-primary-500/40 transition-all hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-700/10 border border-primary-500/20 flex items-center justify-center">
                    <cat.icon size={20} className="text-primary-400" />
                  </div>
                  <span className="text-[11px] font-mono text-dark-400 uppercase tracking-widest">
                    {cat.skills.length} Items
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                  {cat.label}
                </h3>
                <p className="text-xs text-dark-200 mb-5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-dark-800/90 text-dark-100 border border-white/5 hover:border-primary-500/40 hover:text-primary-300 hover:bg-dark-700/90 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-dark-300 font-mono">
                <span>Verified in Projects</span>
                <CheckCircle2 size={13} className="text-emerald-400" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
