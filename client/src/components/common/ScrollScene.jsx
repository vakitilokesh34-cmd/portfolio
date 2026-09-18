import { motion, useReducedMotion } from 'framer-motion';

const scenes = {
  about: { hidden: { opacity: 0, y: 56 }, visible: { opacity: 1, y: 0 } },
  skills: { hidden: { opacity: 0, scale: 0.94, y: 30 }, visible: { opacity: 1, scale: 1, y: 0 } },
  projects: { hidden: { opacity: 0, x: -72, rotateY: -4 }, visible: { opacity: 1, x: 0, rotateY: 0 } },
  achievements: { hidden: { opacity: 0, x: 72, rotateY: 4 }, visible: { opacity: 1, x: 0, rotateY: 0 } },
  education: { hidden: { opacity: 0, y: 48, rotateX: 5 }, visible: { opacity: 1, y: 0, rotateX: 0 } },
  journey: { hidden: { opacity: 0, scale: 0.9, y: 28 }, visible: { opacity: 1, scale: 1, y: 0 } },
  terminal: { hidden: { opacity: 0, y: 38, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } },
  github: { hidden: { opacity: 0, x: -48, y: 20 }, visible: { opacity: 1, x: 0, y: 0 } },
  contact: { hidden: { opacity: 0, y: 64, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } },
};

const ScrollScene = ({ type, children }) => {
  const reduceMotion = useReducedMotion();
  const scene = scenes[type] || scenes.about;

  return (
    <motion.div
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ amount: 0.12, once: false }}
      variants={scene}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollScene;
