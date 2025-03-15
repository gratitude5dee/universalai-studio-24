
import React from "react";
import { ArrowDownRight, Bank, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const OffRamp = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-studio-sand/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-50 p-3 rounded-xl">
            <ArrowDownRight className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-studio-charcoal">Offramp</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Enable your users to convert cryptocurrency back to fiat currency (USD, EUR, etc.). 
          Offramp provides a simple way for users to cash out their crypto assets.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-100"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Bank className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-xs text-purple-600 font-medium">Convenient</div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Cashout Methods</h3>
            <p className="text-gray-600 text-sm">
              Support bank transfers, PayPal, and more for withdrawing funds to user accounts.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl border border-indigo-100"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="text-xs text-indigo-600 font-medium">Efficient</div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Competitive Rates</h3>
            <p className="text-gray-600 text-sm">
              Provide users with competitive exchange rates when converting crypto to fiat.
            </p>
          </motion.div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-purple-100 text-purple-600 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <span className="text-gray-700">Support for multiple cryptocurrencies and networks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-purple-100 text-purple-600 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <span className="text-gray-700">Easy URL generation for quick integration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-purple-100 text-purple-600 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <span className="text-gray-700">Transaction status tracking and reporting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-purple-100 text-purple-600 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <span className="text-gray-700">Available in 30+ countries worldwide</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OffRamp;
