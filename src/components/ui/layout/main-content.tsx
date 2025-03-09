
import React, { ReactNode, useState, useEffect, useRef } from "react";
import Header from "../header";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";

interface MatrixDropProps {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  delay: number;
}

const MatrixDrop: React.FC<MatrixDropProps> = ({ char, x, y, speed, opacity, delay }) => {
  return (
    <motion.div
      className="absolute text-green-500 font-mono text-lg"
      initial={{ y: -20, opacity: 0, x }}
      animate={{ 
        y: [y, y + 500], 
        opacity: [0, opacity, opacity, 0], 
      }}
      transition={{ 
        y: { duration: speed, ease: "linear", delay },
        opacity: { duration: speed, times: [0, 0.1, 0.9, 1], delay } 
      }}
      style={{ x }}
    >
      {char}
    </motion.div>
  );
};

const MatrixAnimation: React.FC<{onComplete: () => void}> = ({ onComplete }) => {
  const [drops, setDrops] = useState<React.ReactNode[]>([]);
  const [asciiArt, setAsciiArt] = useState<string[]>([]);
  const [showAscii, setShowAscii] = useState(false);
  const animationRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  
  // Convert the ASCII art to an array of lines
  useEffect(() => {
    const art = `
                                           :..:                                                                                           
                                      .:.:..:.:.. :                                                                                       
                                        :.::.:.::..:.:.                                                                                   
                                     :.: :.:.::.::. :.:.                                                                                  
                                    ..:.:.:.:.:.:.:..::.                                                                                  
                    .+@@@*%@@@@@*-                  :.::.:.::.:.:.::.:.:.   :.                           .:..                                             
                   @%          #@@@@@+                .:.::.:.::.:.:.:.::.:.:.                        :.:.:::.:.:.. :                                     
                  @-             +@@@@@@-              :.:.:.:.:.::.:.:.:.:.::.:.                     .::.:.:.::.:                                        
                 @:                @@@@@@@=           :.:.:.::.::.:.::.:.::.:.:.:.:                .::.:.:.:.:.:.:                                        
                 @-                 @@@@@@@@-         .:.::.:.:.:.:.:.::.:.:.:.::.:.:.:.:.:.:.:.  :.::.:.:.::.:.:.:                                         
                 @.     @@-          @@@@@@@@@       :.::.:.:.:.:.:.::.:.:.::.:.:.::.::.::.:.:.:.:.:.:.:.::.:.::.:..                                        
                  @:   +@@@*         -@@@@@@@@@      .:.:.:.::.:.::...:.:.:.:.::.:.:.:.:.:.::.:.::.:.::.:.:.:.:.                                            
                   @@:   :@-          @@@@@@@@@@     .::.:.:.:.::.:         :.:.:.:.:.:.:.:.:.::.:.::.:.:.::                                              
                     -*#*-            %@@@@@@@@@%   :: .:.::.: .:.:         .:.::.::.::.::.:.:.:.::.:.:.::                                                
                                      :@@@@@@@@@@   .:.::.:.:.::.:             .:.:.:.:.:.::.::.:.:.:.::                                                  
                                       @@@@@@@@@@+  =@:.:.::.:.:.:..          .:  .:.:.:.:.:.:.:.:.::                                                     
                                       @@@@@@@@@@@.@@@@.:.:.:.:.:.::.        :.:.::.::.::.:.:.                                                            
                                       @@@@@@@@@@@@@--.:.:.::.::.:.:         .:.:.:.:.:.:.:.:                                                             
                                       @@@@@@@@@@@#:.:.::.:.:.:.::..       : :.::.:.::.:.:.:.:.:                                                          
                                       @@@@@@@@@@@@+.::.:.::.:.:.::.    .:.:.::.:.::.:.::.::.::.:.                                                        
                                       @@@@@@@@@@@%@::.:.:.:.::.:.:    .:.:.:. .:.:.:.:.:.:.:.:.::.:                                 #                    
                                -      @@@@@@@@@@@@@+:.:.::.:.:.:.   .:.::.:.::.::.:.  .::.:.:.:.::.:                               @@                    
                               :@@     @@@@@@@@@@@@@.:.::.:.:.::.::   :.:.::.:.:.:.: :#-==.::.::.:.:.::.                          @@@@@                   
                              -@@@@+   @@@@@@@@@@@@@-:.:.:.:.:.:.:.:.:.:.:.:.:.:.:::@@%@@@@.::.:.:.:.:.                         @@@@@@@@-                 
                            .@@@@@@@@@@@@@@@@@@@@@@@@@:.:.::.::.:.:.:.::.:.::.:  :@@@@@@@@@@%+.:.:.:.:.:.                     #@@@@@@@@@@@=               
                          .@@@@@@@@@@@@@@@@@@@@@@@@@=:.:.:.:.:.:.:.::.:.::.:.:: @@@@@@@@@@@@@@@#::.::.:.::.                 #@@@@@@@@@@@@@@@#             
                        @@@@@@@@@@@@@@@@@@@@@@@@@%@@@@.::.:.:.:.::.:.:.:.:.. .@@@@@@@@@@@@@@@@+=@::.:.::.:.:.             *@@@@@@@@@@@@@@@@@@@@+   @.     
                    :@@@@@@-@@@@@@@@@@@@@@@@@@@@@@@.:.:.:.::.::.:.:.:.::.:::@@@. @@@@@@@@@@@@@@@#@#:.:.:.:.::           @@@@ =@@@@@@@@@@@@@@@@@@@@+       
               =*@@@@@@@@@@= -@@@@@@@@@@@@@@@@@@@@@+::.:.:.::.:.:.::.:.:.:%@@@@:  :@@@@@@@@@@@@@@@::.:.:.::.:.:.:    +@@@@@@   @@@@@@@@@@@@@@@@@@         
       :%@@@@@@@@@@@@@@@@@@=    %@@@@@@@@@@@@@@@@@@@=.::.::.:.:.::.:.::.:@@@@@@.    #@@@@@@@@@@@+-.::.::.:.:.::   -@@@@@@@@@    :@@@@@@@@@@@@@@           
          -%@@@@@@@@@@@@@@@=       +%@@@@@@@@@@@@@@@@@ :.:.:.:.:.:.::.:.@@@@@@@:      #@@@@@@@@@@:   ..:.:.:.:.=@@@@@@@@@@@@      -@@@@@@@@@@*            
            *@@@@@@@@@@@@@@+           @@@@@@@@@@@@@@@.:.:.:.::.:.:.:.@@@@@@@@@.        -@@@@@@:. :.:::.::.::.-@@@@@@@@@@@@@         *@@@@@@              
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@:@@-:.::.::.:.::-:-@@@@@@@@@@:           -@@ :.:.:..      .:::@@@@@@@@@@@@            @@                
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@:.:.:.:.::.:@@:@@@@@@@@@@.         :@@. .:.:  ::.:.:.:.:..+@@@@@@@@@@@          *@+                 
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@.:.:.:.:.:.::@@@@@@@@@@@@:        %@-      .:..:.::.:.:.:=@@@@@@@@@@@@        -@@                   
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@ :.::.:.:.:.@@@@@@@@@@@@@. #@@- *@*         .::.:.:.::.::@@@@@@@@@@@@@ :@@# :@@.                    
            *@@@@@@@@@@@@@@+           @@@@@@@@@@@@@@@ :.:.::.::.=@@@@@@@@@@@@@:=@@@@@=         .:.:.::.::.:.:@@@@@@@@@@@@@@ @@@@@#                       
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@*@@ .:.:.:.:.:=@@@@@@@@@@@@@.  ::             .:    :..:.:.%@@@@@@@@@@@@@   :.                         
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@ :.::.::.:.+@@@@@@@@@@@@@:                 :.:.:  ..::.::@@@@@@@@@@@@@                              
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@ :.:.:.:.:.=@@@@@@@@@@@@@.                 .:.:.:::.:.:.:@@@@@@@@@@@@@                              
            +@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@  :.:.:.:. +@@@@@@@@@@@@@@@%#+=              :.:..:.:.:.:*@@@@@@@@@@@@@@#*+:                        
            *@@@@@@@@@@@@@@@@.         @@@@@@@@@@@@@@@@@=:.::.:. .-@@@=.-+%@@@@@@@@@@@@@@@@@%+     .:::.::.::.:=@@@@@@@@@@@@@@@@@@@@@@@@@#:       -@@=    
            +@@@@@@@@@@@@@@@@@@@+      @@@@@@@@@@@@@*== .:.:.: :.+@@@%@*@@@@@@@@@@@@@@@@@@#@@@@@#::.:.:.:.:.:.:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+@@=       
            @@@@@@@@@@@@@@@@@@@@@@@*   @@@@@@@@=        .::.:.    @@-#@@@@@@@@@@@@@@@@@@@@@@=@+:..:.:.:.:.:.::@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          
          %@@@@@@@@@@@@@@@@@@@@@@@@@@@+@@@@@.           .:.:.    %@@@@@@@-@==@@%@@.:=@@@@@@@@@@::.::.:.::.:: +@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@            
        %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*               :.:   @@@@@@@@%@%=:@@@@=::.:%@@@@@@@@%.:.:.:.:.:. =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@              
       +.     =#@@@@@@@@@@@@@@@@@@@@@@@=                 .:.-@@@@@@@@@%@+ :.:.:.:.:.-@@@@@+#@@.:.:.::.   #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+               
                     +@@@@@@@@@@@@@@@+                   :.@@@*.        . .:.   .:.:=@@@+:.:.:.::.: .: #@@#=                   =*@@@@@@@@:                
                         -#@@@@@@@@@                     *#.                 . :. :.:..:.:.:.::. :.  -@-                            +@@@                  
                             -@@@@+                                                :.::.:.                                                                
                                @@   :.:..                                                           .:.:.:           ..:..                               
                                -  :.:.:::.::  :.::.::.::.::.:::         :.:.::.::.::.::.:  .::   :.::.::.::.:.    :.:::.:::.:                            
                                  :.        :.       ::      :.:         ::.:.          :.: :.: .:.          :::  .:.       :..                           
                                  .::.:              .:      :.:         .:.::           :..:.: ::            .:. .::.:                                   
                                     :.::.::.:       :.      .::         :.:.:           ::.::. .:             ::    :.:.::.::                            
                                 .:          ::      ::      ::.         :. :.           .::.:. :.            .:. .:         .:.                          
                                 :.::       .:.      :.       .::       :.. ::         :::. .::  ::.        .::.  :.:.       ::.                          
                                    :.::.:::.:       ::         .::.:::.:   .:.::.:.::.:    :.:   :::.::.:::.:      .::.::.::.
    `.split('\n');
    
    // Remove empty lines and trim whitespace
    setAsciiArt(art.filter(line => line.trim()));
  }, []);
  
  useEffect(() => {
    // Matrix rain animation
    const chars = '01:.@#$%*+-=';
    const screenWidth = window.innerWidth;
    const matrixDrops: React.ReactNode[] = [];
    
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * screenWidth;
      const y = Math.random() * -500; // Start above the screen
      const speed = 2 + Math.random() * 3;
      const opacity = 0.4 + Math.random() * 0.6;
      const delay = Math.random() * 2;
      const char = chars[Math.floor(Math.random() * chars.length)];
      
      matrixDrops.push(
        <MatrixDrop 
          key={`drop-${i}`} 
          char={char} 
          x={x} 
          y={y} 
          speed={speed} 
          opacity={opacity}
          delay={delay}
        />
      );
    }
    
    setDrops(matrixDrops);
    
    // Show ASCII art after a brief delay
    const asciiTimer = setTimeout(() => {
      setShowAscii(true);
    }, 1000);
    
    // Complete animation after a set time
    const completeTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 4000);
    
    return () => {
      clearTimeout(asciiTimer);
      clearTimeout(completeTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 bg-[#120825] z-50 flex items-center justify-center overflow-hidden">
      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden">
        {drops}
      </div>
      
      {/* ASCII art display */}
      {showAscii && (
        <div className="relative z-10 text-green-400 font-mono leading-none text-xs md:text-sm whitespace-pre overflow-hidden max-w-full max-h-full scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100">
          {asciiArt.map((line, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.01 * index }}
              className={cn(
                "whitespace-pre font-mono", 
                index % 3 === 0 ? "text-green-300" : index % 3 === 1 ? "text-green-400" : "text-green-500"
              )}
            >
              {line}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const location = useLocation();
  const [isPageTransition, setIsPageTransition] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  
  // Trigger transition when route changes
  useEffect(() => {
    // Only start a new transition if the previous one is complete
    if (isAnimationComplete) {
      setIsAnimationComplete(false);
      setIsPageTransition(true);
    }
  }, [location.pathname, isAnimationComplete]);

  // Handle animation completed
  const handleAnimationComplete = () => {
    // Start fading out the animation
    setIsPageTransition(false);
    
    // Allow a small delay before allowing new transitions
    setTimeout(() => {
      setIsAnimationComplete(true);
    }, 300); // Small buffer after animation ends
  };

  return (
    <motion.div 
      className="flex-1 min-h-screen flex flex-col w-full bg-studio-cream bg-[radial-gradient(circle_at_top_right,rgba(217,143,100,0.08),transparent_60%)]"
      layout
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Header />
      
      {/* Matrix ASCII Animation Transition */}
      <AnimatePresence>
        {isPageTransition && (
          <motion.div 
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MatrixAnimation onComplete={handleAnimationComplete} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.main 
        className="px-4 pb-8 mt-2 flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </motion.div>
  );
};

export default MainContent;
