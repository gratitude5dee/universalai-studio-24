
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link2, Zap, Sparkles, Palette, BookOpen, Brain, Headphones, ExternalLink } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Handle mouse movement for the entire container (subtle effect)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized from -1 to 1)
      const moveX = (e.clientX - centerX) / (rect.width / 2);
      const moveY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply subtle movement
      x.set(moveX * 5);
      y.set(moveY * 5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Run entrance animation
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y, controls]);

  // Card tilt effect values
  const rotateX = useTransform(y, [-5, 5], [5, -5]);
  const rotateY = useTransform(x, [-5, 5], [-5, 5]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120825] to-[#1F0443] text-white overflow-hidden relative w-screen max-w-full">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px'
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/80"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, Math.random() * 0.5 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* 3D floating elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        {[...Array(10)].map((_, i) => {
          const isSquare = Math.random() > 0.5;
          return (
            <motion.div
              key={`shape-${i}`}
              className={`absolute ${isSquare ? 'rounded-md' : 'rounded-full'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 50 + 10}px`,
                height: `${isSquare ? Math.random() * 50 + 10 : Math.random() * 50 + 10}px`,
                background: i % 3 === 0 
                  ? 'linear-gradient(135deg, rgba(0,230,255,0.2) 0%, rgba(0,153,255,0.1) 100%)' 
                  : i % 3 === 1 
                    ? 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(255,179,77,0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,176,0,0.05) 100%)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
              animate={{
                y: [0, Math.random() * 40 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, Math.random() * 20 - 10, 0],
                scale: [1, Math.random() * 0.3 + 0.9, 1],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 h-full flex flex-col relative z-10">
        <motion.header 
          className="flex justify-between items-center py-4 sm:py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-[#f97316]" />
            </motion.div>
            <h1 className="text-lg sm:text-xl font-bold">UniversalAI</h1>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white px-3 sm:px-5 py-2 rounded-lg border border-orange-300/30 shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all hover:shadow-[0_0_25px_rgba(249,115,22,0.7)] text-xs sm:text-sm relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500/0 via-white/20 to-orange-500/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <Link2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Connect with Crossmint
            </Button>
          </motion.div>
        </motion.header>

        <main ref={containerRef} className="flex flex-col lg:flex-row items-center justify-between mt-8 sm:mt-12 lg:mt-20 gap-8 sm:gap-12 flex-grow">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
          >
            <motion.h1 
              className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
            >
              Transform Ideas
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300"> Into Reality</span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl sm:text-2xl text-gray-300 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.1 }}
            >
              With Our Intelligent Platform
            </motion.h2>
            
            <motion.div
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5 mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 opacity-30" />
              <div className="absolute inset-0" style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                opacity: 0.05,
                mixBlendMode: 'overlay'
              }} />
              <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 relative z-10">
                Unlock the power of AI-driven creativity tools to transform your concepts into 
                compelling digital experiences with unprecedented ease.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => navigate("/wzrd/studio")}
                className="text-sm sm:text-base bg-transparent hover:bg-white/10 border border-white/20 backdrop-blur-sm px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-lg relative overflow-hidden group"
                variant="outline"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-500/0 via-white/5 to-teal-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center">
                  Explore Platform
                  <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ perspective: 1000 }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* 3D tilting main card container */}
              <motion.div 
                className="relative"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glass card container */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-[0_20px_80px_-10px_rgba(45,212,191,0.3)] transform transition-all duration-200 relative overflow-hidden">
                  {/* Inner noise texture */}
                  <div className="absolute inset-0" style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    opacity: 0.05,
                    mixBlendMode: 'overlay'
                  }} />
                  
                  {/* Platform mockup interface */}
                  <div className="bg-[#1E1E2E]/70 backdrop-blur-md rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 relative">
                    {/* Inner noise texture */}
                    <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay rounded-xl" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
                    }} />

                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="text-xs text-white/70 bg-black/30 rounded-md px-2 py-0.5 flex-grow text-center">
                        UniversalAI Platform
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {/* Each tool card has subtle hover effect */}
                      <motion.div 
                        className="bg-teal-500/20 backdrop-blur-md rounded-lg p-2 sm:p-3 flex items-center relative z-10 overflow-hidden"
                        whileHover={{ scale: 1.03, y: -2 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                        <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mr-1.5 sm:mr-2 relative" style={{ transform: "translateZ(20px)" }} />
                        <span className="text-xs sm:text-sm">Design</span>
                      </motion.div>
                      <motion.div 
                        className="bg-purple-500/20 backdrop-blur-md rounded-lg p-2 sm:p-3 flex items-center relative z-10 overflow-hidden"
                        whileHover={{ scale: 1.03, y: -2 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mr-1.5 sm:mr-2 relative" style={{ transform: "translateZ(20px)" }} />
                        <span className="text-xs sm:text-sm">Library</span>
                      </motion.div>
                      <motion.div 
                        className="bg-blue-500/20 backdrop-blur-md rounded-lg p-2 sm:p-3 flex items-center relative z-10 overflow-hidden"
                        whileHover={{ scale: 1.03, y: -2 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-1.5 sm:mr-2 relative" style={{ transform: "translateZ(20px)" }} />
                        <span className="text-xs sm:text-sm">Research</span>
                      </motion.div>
                      <motion.div 
                        className="bg-green-500/20 backdrop-blur-md rounded-lg p-2 sm:p-3 flex items-center relative z-10 overflow-hidden"
                        whileHover={{ scale: 1.03, y: -2 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-1.5 sm:mr-2 relative" style={{ transform: "translateZ(20px)" }} />
                        <span className="text-xs sm:text-sm">Audio</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold">Creative Suite</h3>
                      <p className="text-xs sm:text-sm text-white/70">Powered by AI</p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-full blur-3xl opacity-20"></div>
            </div>
          </motion.div>
        </main>

        <motion.div
          className="mt-12 sm:mt-16 lg:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Unlock a World of Creative Possibilities</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Visual Design",
                description: "Create stunning visuals with AI-powered design tools",
                icon: Palette,
                color: "from-purple-500/20 to-pink-500/20"
              },
              {
                title: "Audio Engineering",
                description: "Craft immersive soundscapes with intelligent audio tools",
                icon: Headphones,
                color: "from-blue-500/20 to-cyan-500/20"
              },
              {
                title: "Interactive Experiences",
                description: "Build engaging interactive content with no-code wizardry",
                icon: Sparkles,
                color: "from-amber-500/20 to-yellow-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 relative overflow-hidden group`}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
                }} />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                
                <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 mb-3 sm:mb-4 text-white relative z-10" />
                <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 relative z-10">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-white/70 relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <footer className="mt-auto py-4 sm:py-6 text-center text-white/50 text-xs sm:text-sm relative z-10">
        <p>© 2023 UniversalAI | Unleash your creative potential</p>
      </footer>
    </div>
  );
};

export default Landing;
