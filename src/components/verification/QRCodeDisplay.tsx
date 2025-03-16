
import React from 'react';
import SelfQRcodeWrapper, { SelfApp } from '@selfxyz/qrcode';
import { motion } from 'framer-motion';

interface QRCodeDisplayProps {
  selfApp: SelfApp;
  onSuccess: () => void;
}

export const QRCodeDisplay = ({ selfApp, onSuccess }: QRCodeDisplayProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-4"
    >
      <div className="bg-black/50 p-4 rounded-lg border border-primary/20 mb-4">
        <SelfQRcodeWrapper
          selfApp={selfApp}
          onSuccess={onSuccess}
          darkMode={true}
          size={250}
        />
      </div>
      <div className="text-sm text-foreground/70 text-center max-w-[250px] mb-4">
        Scan this QR code with the Self app to verify your age securely and privately
      </div>
      <div className="text-xs text-foreground/50 text-center">
        <a href="https://selfwallet.xyz/download" target="_blank" rel="noopener noreferrer" className="underline">
          Don't have the Self app? Download here
        </a>
      </div>
    </motion.div>
  );
};
