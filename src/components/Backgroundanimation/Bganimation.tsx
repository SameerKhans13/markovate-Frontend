import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./bganimation.css";

const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 50 });

  return (
    <div className="particles-wrapper">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="progress-bar" style={{ scaleX }} />;
};

const CombinedComponent: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <ParticleBackground />
    </>
  );
};

export default CombinedComponent;
