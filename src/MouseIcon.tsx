import { motion } from 'framer-motion';

const MouseIcon = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, 20, 20, 0]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1],
        repeat: Infinity,
        repeatDelay: 0.5
      }}
      className="fixed bottom-18 left-1/2 transform -translate-x-1/2 z-50"
    >
      <svg
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-pink-500"
      >
        <rect
          x="1"
          y="1"
          width="22"
          height="34"
          rx="11"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect x="11" y="6" width="2" height="8" rx="1" fill="currentColor" />
      </svg>
    </motion.div>
  );
};

export default MouseIcon;
