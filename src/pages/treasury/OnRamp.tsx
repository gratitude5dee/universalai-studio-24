
import React from "react";
import { ArrowUpRight, CreditCard, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const OnRamp = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-studio-sand/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-50 p-3 rounded-xl">
            <ArrowUpRight className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-studio-charcoal">Onramp</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Convert fiat currency (USD, EUR, etc.) to cryptocurrency directly within your application. 
          Onramp lets users buy crypto using bank transfers, credit/debit cards, and more.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div 
            className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-100"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-xs text-green-600 font-medium">Fast & Simple</div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Payment Methods</h3>
            <p className="text-gray-600 text-sm">
              Offer credit/debit cards, bank transfers, Apple Pay, and more in 90+ countries.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-100"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-xs text-blue-600 font-medium">Seamless UX</div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Direct to Wallet</h3>
            <p className="text-gray-600 text-sm">
              Cryptocurrencies are sent directly to your user's connected wallet address.
            </p>
          </motion.div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold mb-3">Implementation Options</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <span className="text-gray-700">URL Generation - Create custom URLs that open the Coinbase onramp flow</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <span className="text-gray-700">React SDK - Use the `@coinbase/onchainkit/fund` SDK for React integration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <span className="text-gray-700">Transaction Status API - Track the status of onramp transactions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OnRamp;
