
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MatrixDrop from "./matrix-drop";
import { cn } from "../../../lib/utils";

interface MatrixAnimationProps {
  onComplete: () => void;
}

const MatrixAnimation: React.FC<MatrixAnimationProps> = ({ onComplete }) => {
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
                 @-                 @@@@@@@@-         .:.::.:.:.:.:.:.::.:.:.:.::.:.:.:.:.:.:.:.:.:.  :.::.:.:.::.:.:.:                                         
                 @.     @@-          @@@@@@@@@       :.::.:.:.:.:.:.::.:.:.::.:.:.::.::.::.:.:.:.:.:.:.:.:.:.::.:.::.:..                                        
                  @:   +@@@*         -@@@@@@@@@      .:.:.:.::.:.::...:.:.:.:.::.:.:.:.:.:.::.:.::.:.::.:.:.:.:.:.:.                                            
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
    // Prevent the animation from starting if we've already completed it
    if (completedRef.current) return;
    
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
    }, 600);
    
    // Start exiting after 1 second (further reduced)
    const exitTimer = setTimeout(() => {
      if (!completedRef.current) {
        setIsExiting(true);
        console.log("Matrix animation set to exit");
      }
    }, 1000);
    
    // Complete animation and notify parent after exit animation
    const completeTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        console.log("Matrix animation calling onComplete");
        onComplete();
      }
    }, 1300); // 1s + 300ms for exit animation
    
    return () => {
      clearTimeout(asciiTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-[#120825] z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden">
        {drops}
      </div>
      
      {/* ASCII art display */}
      <AnimatePresence mode="wait">
        {showAscii && !isExiting && (
          <motion.div 
            className="relative z-10 transform-gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }} // Even faster fade out
          >
            <div className="text-green-400 font-mono leading-none text-xs whitespace-pre overflow-hidden transform scale-[0.25] sm:scale-[0.35] md:scale-[0.4] lg:scale-[0.45]">
              {asciiArt.map((line, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.01 * index }}
                  className={cn(
                    "whitespace-pre font-mono", 
                    index % 3 === 0 ? "text-green-300" : index % 3 === 1 ? "text-green-400" : "text-green-500"
                  )}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MatrixAnimation;
