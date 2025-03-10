
import React from "react";
import { motion } from "framer-motion";

export interface MatrixDropProps {
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

export default MatrixDrop;
