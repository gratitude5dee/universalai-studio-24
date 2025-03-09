
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
  const [isExiting, setIsExiting] = useState(false);
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
                 @-                 @@@@@@@@-         .:.::.:.:.:.:.:.::.:.:.:.::.:.:.:.:.:.:.:.:.  :.::.:.:.::.:.:.:                                         
                 @.     @@-          @@@@@@@@@       :.::.:.:.:.:.:.::.:.:.::.:.:.::.::.::.:.:.:.:.:.:.:.:.::.:.::.:..                                        
                  @:   +@@@*         -@@@@@@@@@      .:.:.:.::.:.::...:.:.:.:.::.:.:.:.:.::.:.::.:.::.:.:.:.:.:.                                            
                   @@:   :@-          @@@@@@@@@@     .::.:.:.:.::.:         :.:.:.:.:.:.:.:.:.::.:.::.:.:.::                                              
                     -*#*-            %@@@@@@@@@%   :: .:.::.: .:.:         .:.::.::.::.::.:.:.:.::.:.:.::                                                
                                      :@@@@@@@@@@   .:.::.:.:.::.:             .:.:.:.:.:.::.::.:.:.:.::                                                  
                                       @@@@@@@@@@+  =@:.:.::.:.:.:..          .:  .:.:.:.:.:.:.:.:.::                                                     
                                       @@@@@@@@@@@.@@@@.:.:.:.:.:.::.        :.:.::.::.::.:.:.                                                            
                                       @@@@@@@@@@@@@--.:.:.::.::.:.:         .:.:.:.:.:.:.:.:                                                             
                                       @@@@@@@@@@@#:.:.::.:.:.:.::..       : :.::.:.::.:.:.:.:.                                                          
                                       @@@@@@@@@@@@+.::.:.::.:.:.::.    .:.:.::.:.::.:.::.::.::.:.                                                        
                                       @@@@@@@@@@@%@::.:.:.:.::.:.:    .:.:.:. .:.:.:.:.:.:.:.:.::.:                                 #                    
                                -      @@@@@@@@@@@@@+:.:.::.:.:.:.   .:.::.:.::.::.:.  .::.:.:.:.::.:                               @@                    
                               :@@     @@@@@@@@@@@@@.:.::.:.:.::.::   :.:.::.:.:.:.: :#-==.::.::.:.:.::.                          @@@@@                   
                              -@@@@+   @@@@@@@@@@@@@-:.:.:.:.:.:.:.:.:.:.:.:.:.:.:::@@%@@@@.::.:.:.:.:.                         @@@@@@@@-                 
                            .@@@@@@@@@@@@@@@@@@@@@@@@@:.:.::.::.:.:.::.:.::.:  :@@@@@@@@@@%+.:.:.:.:.:.                     #@@@@@@@@@@@=               
                          .@@@@@@@@@@@@@@@@@@@@@@@@@=:.:.:.:.:.:.:.::.:.::.:.:: @@@@@@@@@@@@@@@#::.::.:.::.                 #@@@@@@@@@@@@@@@#             
                        @@@@@@@@@@@@@@@@@@@@@@@@@%@@@@.::.:.:.:.::.:.:.:.:.. .@@@@@@@@@@@@@@@@+=@::.:.::.:.:.             *@@@@@@@@@@@@@@@@@@@@+   @.     
                    :@@@@@@-@@@@@@@@@@@@@@@@@@@@@@@.:.:.:.::.::.:.:.:.::.:::@@@. @@@@@@@@@@@@@@@#@#:.:.:.:.::           @@@@ =@@@@@@@@@@@@@@@@@@@@+       
               =*@@@@@@@@@@= -@@@@@@@@@@@@@@@@@@@@@+::.:.:.::.:.:.::.:.:.:%@@@@:  :@@@@@@@@@@@@@@@::.:.:.::.:.:.:    +@@@@@@   @@@@@@@@@@@@@@@@@@         
       :%@@@@@@@@@@@@@@@@@@=    %@@@@@@@@@@@@@@@@@@@=.::.::.:.:.::.:.::.:@@@@@@.    #@@@@@@@@@@@+-.::.::.:.:.::   -@@@@@@@@@    :@@@@@@@@@@@@@@           
          -%@@@@@@@@@@@@@@@=       +%@@@@@@@@@@@@@@@@@ :.:.:.:.:.:.::.:.@@@@@@@:      #@@@@@@@@@@:   ..:.:.:.:.=@@@@@@@@@@@@      -@@@@@@@@@@*            
            *@@@@@@@@@@@@@@+           @@@@@@@@@@@@@@@.:.:.:.::.:.:.:.@@@@@@@@@.        -@@@@@@:. :.:::.::.::.-@@@@@@@@@@@@@         *@@@@@@              
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@:@@-:.::.::.:.::-:-@@@@@@@@@@:           -@@ :.:.:..      .:::@@@@@@@@@@@@            @@                
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@:.:.:.:.:.:@@:@@@@@@@@@@.         :@@. .:.:  ::.:.:.:.:..+@@@@@@@@@@@          *@+                 
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@.:.:.:.:.:.::@@@@@@@@@@@@:        %@-      .:..:.::.:.:.:=@@@@@@@@@@@@        -@@                   
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@ :.::.:.:.:.@@@@@@@@@@@@@. #@@- *@*         .::.:.:.::.::@@@@@@@@@@@@@ :@@# :@@.                    
            *@@@@@@@@@@@@@@+           @@@@@@@@@@@@@@@ :.:.::.::.=@@@@@@@@@@@@@:=@@@@@=         .:.:.::.::.:.:@@@@@@@@@@@@@@ @@@@@#                       
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@*@@ .:.:.:.:.:=@@@@@@@@@@@@@.  ::             .:    :..:.:.%@@@@@@@@@@@@@   :.                         
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@ :.::.::.:.+@@@@@@@@@@@@@:                 :.:.:  ..::.::@@@@@@@@@@@@@                              
            *@@@@@@@@@@@@@@=           @@@@@@@@@@@@@@@  :.:.:.:. +@@@@@@@@@@@@@@@%#+=              :.:..:.:.:.*@@@@@@@@@@@@@@#*+:                        
            *@@@@@@@@@@@@@@@@.         @@@@@@@@@@@@@@@@@=:.::.:. .-@@@=.-+%@@@@@@@@@@@@@@@@@%+     .:::.::.::.:@@@@@@@@@@@@@@@@@@@@@@@@@#:       -@@=    
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
                                    :.::.:::.:       ::         .::.:::.:   .:.::.:.::.:    :.:   :::.::.:::.:      .::.::.::.`;
                                    
    setAsciiArt(art.split('\n'));
  }, []);

  useEffect(() => {
    // Start the matrix effect
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    let startTime = Date.now();
    let nextDropTime = startTime;
    const duration = 1500; // 1.5 seconds total duration
    
    const animateMatrix = () => {
      const currentTime = Date.now();
      
      // Check if we should end the animation
      if (currentTime - startTime > duration && !completedRef.current) {
        setIsExiting(true);
        completedRef.current = true;
        setTimeout(() => {
          onComplete();
        }, 300); // Exit animation time
        return;
      }
      
      // Add new matrix drops periodically
      if (currentTime >= nextDropTime && currentTime - startTime < duration) {
        const newDrops = [...drops];
        
        // Add a few new drops
        for (let i = 0; i < 3; i++) {
          const x = Math.random() * screenWidth;
          const y = Math.random() * screenHeight;
          const char = chars[Math.floor(Math.random() * chars.length)];
          const speed = 2 + Math.random() * 2; // Random speed between 2-4s
          const opacity = 0.3 + Math.random() * 0.7; // Random opacity
          const delay = Math.random() * 0.5; // Slight delay variance
          
          newDrops.push(
            <MatrixDrop 
              key={`drop-${currentTime}-${i}`}
              char={char} 
              x={x} 
              y={y} 
              speed={speed} 
              opacity={opacity}
              delay={delay}
            />
          );
        }
        
        setDrops(newDrops);
        nextDropTime = currentTime + 50; // Add new drops every 50ms
      }
      
      // Show ASCII art after a short delay
      if (currentTime - startTime > 300 && !showAscii) {
        setShowAscii(true);
      }
      
      // Request next frame if we're still within duration
      if (!isExiting) {
        animationRef.current = requestAnimationFrame(animateMatrix);
      }
    };
    
    // Start the animation
    animationRef.current = requestAnimationFrame(animateMatrix);
    
    // Cleanup
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drops, showAscii, isExiting, onComplete]);

  const scaleFactor = 0.4; // Reduce the size by 60%

  return (
    <AnimatePresence mode="wait">
      {!isExiting ? (
        <motion.div 
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Matrix rain effect */}
          <div className="absolute inset-0 overflow-hidden">
            {drops}
          </div>
          
          {/* ASCII art overlay */}
          {showAscii && (
            <motion.div 
              className="relative text-green-500 font-mono text-xs whitespace-pre z-10 opacity-80 scale-40"
              initial={{ opacity: 0, scale: scaleFactor * 0.8 }}
              animate={{ opacity: 0.8, scale: scaleFactor }}
              exit={{ opacity: 0, scale: scaleFactor * 0.8 }}
              transition={{ duration: 0.5 }}
              style={{ 
                transform: `scale(${scaleFactor})`,
                lineHeight: '1em',
                maxHeight: '80vh',
                overflow: 'hidden'
              }}
            >
              {asciiArt.map((line, i) => (
                <div key={`line-${i}`}>{line}</div>
              ))}
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const [showMatrix, setShowMatrix] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      setShowMatrix(true);
      prevPathRef.current = location.pathname;
    }
  }, [location]);

  const handleMatrixComplete = () => {
    setShowMatrix(false);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header />
      <div className={cn("flex-1 overflow-auto p-4 md:p-6 relative", {})}>
        {children}
      </div>
      
      {/* Matrix animation on route change */}
      {showMatrix && <MatrixAnimation onComplete={handleMatrixComplete} />}
    </div>
  );
};

export default MainContent;
