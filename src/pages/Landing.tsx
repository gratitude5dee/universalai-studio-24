
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link2, Zap, Sparkles, Palette, BookOpen, Brain, Headphones } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#331157] text-white overflow-hidden relative w-screen max-w-full">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')] opacity-20 mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 h-full flex flex-col">
        <header className="flex justify-between items-center py-4 sm:py-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-[#f97316]" />
            <h1 className="text-lg sm:text-xl font-bold">UniversalAI</h1>
          </div>
          
          <Button 
            onClick={() => navigate("/home")}
            className="bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white px-3 sm:px-5 py-2 rounded-lg border border-orange-300/30 shadow-[0_0_15px_rgba(249,115,22,0.5)] animate-pulse text-xs sm:text-sm"
          >
            <Link2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Connect with Crossmint
          </Button>
        </header>

        <main className="flex flex-col lg:flex-row items-center justify-between mt-8 sm:mt-12 lg:mt-20 gap-8 sm:gap-12 flex-grow">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              Transform Ideas
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300"> Into Reality</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl text-gray-300 mb-6 sm:mb-8">
              With Our Intelligent Platform
            </h2>
            
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Unlock the power of AI-driven creativity tools to transform your concepts into 
              compelling digital experiences with unprecedented ease.
            </p>
            
            <Button 
              onClick={() => navigate("/wzrd/studio")}
              className="text-sm sm:text-base bg-transparent hover:bg-white/10 border border-white/20 px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-lg"
              variant="outline"
            >
              Explore Platform
            </Button>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Glass card container */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-[0_20px_80px_-10px_rgba(45,212,191,0.3)]">
                {/* Platform mockup interface */}
                <div className="bg-[#1E1E2E]/70 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5">
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
                    <div className="bg-teal-500/20 rounded-lg p-2 sm:p-3 flex items-center">
                      <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mr-1.5 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Design</span>
                    </div>
                    <div className="bg-purple-500/20 rounded-lg p-2 sm:p-3 flex items-center">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mr-1.5 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Library</span>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg p-2 sm:p-3 flex items-center">
                      <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-1.5 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Research</span>
                    </div>
                    <div className="bg-green-500/20 rounded-lg p-2 sm:p-3 flex items-center">
                      <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-1.5 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Audio</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Creative Suite</h3>
                    <p className="text-xs sm:text-sm text-white/70">Powered by AI</p>
                  </div>
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full blur-2xl opacity-30"></div>
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
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10`}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 mb-3 sm:mb-4 text-white" />
                <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <footer className="mt-auto py-4 sm:py-6 text-center text-white/50 text-xs sm:text-sm">
        <p>© 2023 UniversalAI | Unleash your creative potential</p>
      </footer>
    </div>
  );
};

export default Landing;
