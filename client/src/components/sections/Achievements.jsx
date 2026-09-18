import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { defaultProfile } from '../../data/portfolio';

const iconMap = {
  award: Award,
  trophy: Trophy,
  calendar: Calendar,
};

const Achievements = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const achievements = defaultProfile.achievements;

  return (
    <section id="achievements" className="section-padding relative" ref={ref}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs uppercase tracking-widest font-mono text-amber-400">Milestones & Honors</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase"
          >
            Key <span className="text-chrome-3d">Achievements</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-dark-200 mt-2"
          >
            State-level academic rank, elite technical certifications, and blockchain summits.
          </motion.p>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, idx) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-studio rounded-3xl p-6 sm:p-7 flex flex-col justify-between group hover:border-amber-500/40 transition-all hover:scale-[1.02] relative overflow-hidden"
              >
                {/* Metallic shine glare */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
                      <Icon size={22} className="text-amber-400" />
                    </div>
                    <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-mono font-bold text-amber-300">
                      {item.badge || item.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-dark-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-dark-300">
                  <span>Year: {item.date}</span>
                  <Sparkles size={13} className="text-amber-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
