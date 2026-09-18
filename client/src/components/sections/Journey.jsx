import React from 'react';
import { motion } from 'framer-motion';
import { Route, ArrowRight } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const journeySteps = [
  { label: 'Student', description: 'Started learning programming fundamentals' },
  { label: 'DSA', description: 'Mastered data structures and algorithms' },
  { label: 'Web Development', description: 'Built first web applications with HTML, CSS, JS' },
  { label: 'Full-Stack Development', description: 'Learned React, Node.js, Express, MongoDB' },
  { label: 'AI/ML', description: 'Explored machine learning and AI integration' },
  { label: 'Real-Time Systems', description: 'Built real-time applications with WebSockets' },
  { label: 'Advanced Projects', description: 'Developing complex full-stack and distributed systems' },
];

const Journey = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="journey" className="section-padding relative" ref={ref}>
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-600/10 flex items-center justify-center"><Route size={20} className="text-primary-400" /></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">My Development Journey</h2>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-dark-200 max-w-lg mb-12 text-sm md:text-base">
          The path from student to building real-world applications.
        </motion.p>

        {/* Horizontal journey - desktop */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-600/30 to-transparent -translate-y-1/2" />
            {journeySteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="relative flex flex-col items-center z-10"
              >
                <div className="w-10 h-10 rounded-full bg-primary-600/20 border-2 border-primary-500 flex items-center justify-center mb-3">
                  <span className="text-primary-400 text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-white text-xs font-semibold text-center mb-1">{step.label}</p>
                <p className="text-dark-300 text-[10px] text-center max-w-[100px] leading-tight">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vertical journey - mobile */}
        <div className="md:hidden space-y-4">
          {journeySteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary-600/20 border-2 border-primary-500 flex items-center justify-center shrink-0">
                <span className="text-primary-400 text-[10px] font-bold">{i + 1}</span>
              </div>
              <div className="glass-card rounded-xl px-4 py-3 flex-1">
                <p className="text-white text-sm font-semibold">{step.label}</p>
                <p className="text-dark-300 text-xs">{step.description}</p>
              </div>
              {i < journeySteps.length - 1 && (
                <ArrowRight size={14} className="text-primary-600/30 shrink-0 rotate-90" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
