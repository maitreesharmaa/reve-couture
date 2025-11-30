'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-white dark:bg-[linear-gradient(to_right,#000000,#0a0a0a)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(192,160,98,0.05),transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_50%,rgba(192,160,98,0.1),transparent)]" />
    </motion.div>
  );
}
