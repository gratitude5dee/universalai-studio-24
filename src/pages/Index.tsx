
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@crossmint/client-sdk-react-ui";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Index() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login error:", error);
    }
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
            Sign in with Crossmint
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
            onClick={() => navigate("/home")}
          >
            Enter as Guest
          </Button>
        </div>
        
        <div className="text-center text-sm text-white/60 mt-6">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </motion.div>
  );
}
