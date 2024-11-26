"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BGAnimation from "../../components/Backgroundanimation/Bganimation";
import "./services.css";

// Define the structure of each service
interface Service {
  title: string;
  description: string;
  icon: string;
  color: string;
}

// Sample services data with added color for dynamic effects
const services: Service[] = [
  {
    title: "AI-Powered Grading",
    description: "Automated grading for subjective and objective questions using cutting-edge AI algorithms.",
    icon: "/icons/ai.svg",
    color: "#4A90E2"
  },
  {
    title: "Handwritten Answer Recognition",
    description: "Support for handwritten submissions using advanced OCR technology.",
    icon: "/icons/ocr.svg",
    color: "#50C878"
  },
  {
    title: "Performance Analytics",
    description: "Detailed analytics dashboards for teachers and students to track progress and performance.",
    icon: "/icons/analytics.svg",
    color: "#FF6B6B"
  },
  {
    title: "Customizable Exams",
    description: "Easily create, manage, and customize exams with role-based login systems.",
    icon: "/icons/custom.svg",
    color: "#9C27B0"
  },
];

const Services: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  useEffect(() => {
    document.title = "Services";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div ref={ref} className="services-page">
      <BGAnimation />
      <Header />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="services-header"
      >
        <motion.h1 
          style={{ 
            scale: scaleProgress,
            opacity: opacityProgress 
          }}
          className="services-title"
        >
          Our Services
        </motion.h1>
        <motion.p 
          className="services-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Empowering education with technology-driven solutions
        </motion.p>
      </motion.div>

      <motion.section 
        className="services-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="services-container">
          <AnimatePresence>
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-card"
                variants={itemVariants}
                whileHover="hover"
                style={{ 
                  borderColor: service.color,
                  boxShadow: `0 10px 30px -10px ${service.color}40`
                }}
              >
                <motion.div 
                  className="service-icon-wrapper"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.6 }
                  }}
                >
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="service-icon"
                    draggable={false}
                  />
                </motion.div>
                <h3 
                  className="service-title"
                  style={{ color: service.color }}
                >
                  {service.title}
                </h3>
                <p className="service-description">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Services;