"use client";

import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50">
      {/* Background text element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-full text-center">
          <span 
            className="text-[120px] sm:text-[180px] md:text-[240px] lg:text-[300px] font-bold text-transparent select-none"
            style={{
              WebkitTextStroke: "1.5px rgba(99, 102, 241, 0.12)",
              letterSpacing: '0.05em'
            }}
          >
             Convis AI
          </span>
        </div>
      </motion.div>

      {/* Content container with relative positioning */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-raleway font-bold text-gray-800 mb-8"
        >
          Who We Are
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed relative"
        >
          We are{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-bold">
             Convis AI
          </span>
          , a leading AI Automation Agency dedicated to transforming businesses with cutting-edge technology and
          innovative solutions. Our team is committed to driving efficiency and growth for your business through
          intelligent automation and AI-powered voice agents.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="neumorphic-button-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
        >
          Learn More
        </motion.button>
      </div>
    </section>
  )
}
