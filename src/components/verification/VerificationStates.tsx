
import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Verifying your age..." }: LoadingStateProps) => {
  return (
    <motion.div 
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
      <p className="text-foreground/80">{message}</p>
    </motion.div>
  );
};

interface SuccessStateProps {
  message?: string;
}

export const SuccessState = ({ message = "Age verification successful!" }: SuccessStateProps) => {
  return (
    <motion.div 
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
      <p className="text-foreground/80">{message}</p>
    </motion.div>
  );
};

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState = ({ 
  message = "Verification failed. Please try again.", 
  onRetry 
}: ErrorStateProps) => {
  return (
    <motion.div 
      key="error"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <XCircle className="h-16 w-16 text-red-500 mb-4" />
      <p className="text-foreground/80">{message}</p>
      <Button 
        onClick={onRetry}
        className="mt-4"
      >
        Try Again
      </Button>
    </motion.div>
  );
};
