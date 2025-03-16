
import React, { useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AnimatePresence } from 'framer-motion';
import { QRCodeDisplay } from './QRCodeDisplay';
import { LoadingState, SuccessState, ErrorState } from './VerificationStates';
import { ModalFooter } from './ModalFooter';
import { useAgeVerification } from '@/hooks/useAgeVerification';

interface AgeVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerificationSuccess: () => void;
  onVerifyLater: () => void;
}

export function AgeVerificationModal({
  open,
  onOpenChange,
  onVerificationSuccess,
  onVerifyLater,
}: AgeVerificationModalProps) {
  const {
    verificationState,
    setVerificationState,
    createSelfApp,
    handleQRCodeSuccess,
    resetVerification
  } = useAgeVerification();

  const selfApp = createSelfApp();
  
  // Check for existing verification session when modal opens
  useEffect(() => {
    if (open) {
      console.log("Age verification modal opened");
      const existingSession = localStorage.getItem('age_verification_session');
      if (existingSession) {
        console.log("Found existing verification session");
        setVerificationState('success');
        // Wait a moment to show success state before proceeding
        setTimeout(() => {
          onVerificationSuccess();
          onOpenChange(false);
        }, 1000);
      } else {
        // Reset state if no existing session
        console.log("No existing verification session found, resetting state");
        resetVerification();
      }
    }
  }, [open, onVerificationSuccess, onOpenChange, resetVerification, setVerificationState]);

  return (
    <Dialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md bg-background border border-primary/30 text-foreground">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <DialogTitle className="text-2xl font-bold">Age Verification</DialogTitle>
          </div>
          <DialogDescription>
            We need to verify you're 18+ to access this content
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {verificationState === 'initial' && (
            <QRCodeDisplay 
              selfApp={selfApp}
              onSuccess={handleQRCodeSuccess}
            />
          )}
          
          {verificationState === 'loading' && (
            <LoadingState />
          )}
          
          {verificationState === 'success' && (
            <SuccessState />
          )}
          
          {verificationState === 'error' && (
            <ErrorState onRetry={resetVerification} />
          )}
        </AnimatePresence>

        <ModalFooter 
          verificationState={verificationState}
          onVerifyLater={onVerifyLater}
          onRetry={resetVerification}
        />
      </DialogContent>
    </Dialog>
  );
}
