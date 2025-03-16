
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@crossmint/client-sdk-react-ui";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AgeVerificationModal } from "@/components/verification/AgeVerificationModal";
import { useAgeVerification } from "@/hooks/useAgeVerification";

export default function Index() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'login' | 'guest' | null>(null);
  
  // Initialize the age verification hook
  const { isVerified } = useAgeVerification();

  React.useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      // Check if age verification is required
      if (isVerified()) {
        // User already verified, proceed directly
        if (login) {
          await login();
        } else {
          navigate("/home");
        }
      } else {
        // User needs to verify age first
        setPendingAction('login');
        setShowVerificationModal(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGuestEntry = () => {
    // Check if age verification is required
    if (isVerified()) {
      // User already verified, proceed directly
      navigate("/wzrd/studio");
    } else {
      // User needs to verify age first
      setPendingAction('guest');
      setShowVerificationModal(true);
    }
  };

  const handleVerificationSuccess = () => {
    // Proceed with the pending action after successful verification
    if (pendingAction === 'login') {
      if (login) {
        login();
      } else {
        navigate("/home");
      }
    } else if (pendingAction === 'guest') {
      navigate("/wzrd/studio");
    }
    
    // Reset pending action
    setPendingAction(null);
  };
  
  const handleVerifyLater = () => {
    // Proceed without verification
    if (pendingAction === 'login') {
      if (login) {
        login();
      } else {
        navigate("/home");
      }
    } else if (pendingAction === 'guest') {
      navigate("/wzrd/studio");
    }
    
    // Reset pending action and close modal
    setPendingAction(null);
    setShowVerificationModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-studio-dark to-studio-accent/80 p-4 text-white"
    >
      <div className="max-w-md w-full space-y-8 bg-black/30 backdrop-blur-lg p-8 rounded-xl border border-white/10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">WZRD Studio</h1>
          <p className="text-lg text-white/80 mb-8">Sign in to access your creative workspace</p>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full bg-studio-accent hover:bg-studio-accent/90"
            onClick={handleLogin}
          >
            {login ? "Sign in with Crossmint" : "Continue to App"}
          </Button>
          
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/30 text-white/60">or continue with</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
            onClick={handleGuestEntry}
          >
            Enter as Guest
          </Button>
        </div>
        
        <div className="text-center text-sm text-white/60 mt-6">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>

      {/* Age Verification Modal */}
      <AgeVerificationModal
        open={showVerificationModal}
        onOpenChange={setShowVerificationModal}
        onVerificationSuccess={handleVerificationSuccess}
        onVerifyLater={handleVerifyLater}
      />
    </motion.div>
  );
}
