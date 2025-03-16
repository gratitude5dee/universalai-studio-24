
import React from 'react';
import { Button } from '@/components/ui/button';

interface ModalFooterProps {
  verificationState: 'initial' | 'loading' | 'success' | 'error';
  onVerifyLater: () => void;
  onRetry: () => void;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  verificationState,
  onVerifyLater,
  onRetry
}) => {
  // Don't show footer buttons during loading or success states
  if (verificationState === 'loading' || verificationState === 'success') {
    return null;
  }

  return (
    <div className="flex justify-end space-x-2 pt-4 border-t border-primary/10">
      {verificationState === 'initial' && (
        <Button 
          variant="ghost" 
          onClick={onVerifyLater}
          className="text-foreground/70"
        >
          Verify Later
        </Button>
      )}

      {verificationState === 'error' && (
        <Button 
          variant="secondary" 
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
