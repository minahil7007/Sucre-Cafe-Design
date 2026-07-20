import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('sucre_visited');
    if (!hasVisited) {
      sessionStorage.setItem('sucre_visited', 'true');
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-primary tracking-widest uppercase">
              SUCRÉ
            </h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
              className="h-px bg-primary mt-4 origin-left mx-auto w-1/2"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
