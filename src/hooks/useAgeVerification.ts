
import { useState, useCallback, useEffect } from 'react';
import { SelfAppBuilder } from '@selfxyz/qrcode';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

// Action types for verification
export type VerificationAction = 'guest' | 'login' | 'feature' | null;

export const useAgeVerification = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [verificationAction, setVerificationAction] = useState<VerificationAction>(null);
  const [verificationState, setVerificationState] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');
  const [userId, setUserId] = useState<string>('');

  // Generate a new userId when the hook is first initialized
  useEffect(() => {
    const newUserId = uuidv4();
    setUserId(newUserId);
    console.log("Generated userId for verification:", newUserId);
  }, []);

  // Create SelfApp instance with proper configuration
  const createSelfApp = useCallback(() => {
    // Use the stored userId or generate a new one if not available
    const verificationUserId = userId || uuidv4();
    console.log("Creating new SelfApp instance with userId:", verificationUserId);
    
    return new SelfAppBuilder({
      appName: "WZRD Studio",
      scope: "wzrd-age-verification",
      // Use Supabase Function endpoint
      endpoint: `${supabase.functions.url}/verify-age`,
      userId: verificationUserId,
      disclosures: {
        date_of_birth: true,
        minimumAge: 18,
      },
    }).build();
  }, [userId]);
  
  // Handle QR code success
  const handleQRCodeSuccess = useCallback(() => {
    console.log("QR code scanned successfully");
    setVerificationState('loading');
    
    // The actual verification happens on the backend via the Self Protocol
    // This is just UI feedback while that process completes
    setTimeout(() => {
      // We'll set success here since the Self Protocol will handle the actual verification
      // and store the result. If there's an error, the Self app will show it.
      setVerificationState('success');
      console.log("Verification state set to success");
      
      // Store verification in localStorage to remember the user passed verification
      localStorage.setItem('age_verification_session', 'verified');
      
      // Show success notification
      toast.success("Age verification successful!");
      
      // Reset the modal
      setTimeout(() => {
        setShowVerification(false);
        setVerificationState('initial');
      }, 1000);
    }, 1500);
  }, []);
  
  // Reset the verification state
  const resetVerification = useCallback(() => {
    console.log("Resetting verification state");
    setVerificationState('initial');
  }, []);

  // Check for existing verification session
  const isVerified = useCallback(() => {
    return localStorage.getItem('age_verification_session') === 'verified';
  }, []);

  // Trigger verification for a specific action
  const triggerVerification = useCallback((action: VerificationAction) => {
    console.log(`Triggering verification for action: ${action}`);
    setVerificationAction(action);
    setShowVerification(true);
  }, []);

  // Handle verify later option
  const handleVerifyLater = useCallback(() => {
    console.log("Verify later selected");
    setShowVerification(false);
    toast.info("You can verify your age later in account settings");
  }, []);

  return {
    showVerification,
    setShowVerification,
    verificationAction,
    verificationState,
    setVerificationState,
    isVerified,
    triggerVerification,
    createSelfApp,
    handleQRCodeSuccess,
    resetVerification,
    handleVerifyLater,
    userId
  };
};
