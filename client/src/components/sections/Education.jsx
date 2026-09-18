import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, School, Award, CheckCircle2 } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { defaultProfile } from '../../data/portfolio';

const Education = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const educationList = defaultProfile.education;

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary-400" />
            <span className="text-xs uppercase tracking-widest font-mono text-primary-400">Academic Background</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase"
          >
            Education & <span className="text-chrome-3d">Qualifications</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-dark-200 mt-2"
          >
            Strong academic consistency from secondary school to university engineering.
          </motion.p>
        </div>

        {/* 3D Timeline / Cards List */}
        <div className="space-y-6">
          {educationList.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-studio rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-primary-500/40 transition-all hover:scale-[1.01] relative overflow-hidden"
            >
              {/* Institution and Degree */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-700/10 border border-primary-500/30 flex items-center justify-center shrink-0 shadow-lg">
                  {idx === 0 ? (
                    <GraduationCap size={22} className="text-primary-400" />
                  ) : idx === 1 ? (
                    <BookOpen size={22} className="text-primary-400" />
                  ) : (
                    <School size={22} className="text-primary-400" />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {edu.institution}
                    </h3>
                    <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-primary-300">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-primary-300 font-medium mb-2">
                    {edu.degree}
                  </p>

                  <p className="text-xs text-dark-200 max-w-xl leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>

              {/* Grade / CGPA Highlight */}
              <div className="md:text-right shrink-0 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                <p className="text-[10px] font-mono uppercase tracking-widest text-dark-300">
                  Academic Score
                </p>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-0.5">
                  {edu.cgpa}
                </div>
                <span className="text-[11px] font-mono text-dark-300">
                  {idx === 0 ? 'Cumulative CGPA' : idx === 1 ? 'Total Marks' : 'Grade Point Average'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
