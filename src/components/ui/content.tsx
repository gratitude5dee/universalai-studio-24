
import React from "react";
import { motion } from "framer-motion";

interface ContentProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Content = ({ title, subtitle, children, className = "" }: ContentProps) => {
  return (
    <motion.div 
      className={`w-full p-4 md:p-8 space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h1 className="text-2xl md:text-3xl font-semibold text-white">{title}</h1>}
          {subtitle && <p className="text-blue-lighter mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </motion.div>
  );
};
