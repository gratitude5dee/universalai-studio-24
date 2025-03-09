
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// IP Portal Logo Component
const IPLogo = () => (
  <div className="rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-[2px] w-16 h-16 flex items-center justify-center">
    <div className="rounded-full bg-black w-full h-full flex items-center justify-center">
      <span className="text-white font-bold text-xl">IP</span>
    </div>
  </div>
);

// Navigation Steps Component
const NavigationStep = ({ number, title, isActive, isCompleted }: { 
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}) => (
  <div className="flex items-center gap-2 py-2">
    <div className={`rounded-full w-7 h-7 flex items-center justify-center ${
      isCompleted 
        ? 'bg-white' 
        : isActive 
          ? 'bg-white text-black' 
          : 'border border-gray-500 text-gray-500'
    }`}>
      {isCompleted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <span>{number}</span>
      )}
    </div>
    <span className={`text-sm ${isActive || isCompleted ? 'text-white' : 'text-gray-500'}`}>
      {title}
    </span>
  </div>
);

// Step types
type RegistrationType = "new" | "remix" | null;
type UploadType = "upload" | "wallet" | null;

// Main StoryPortal Component
const StoryPortal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationType, setRegistrationType] = useState<RegistrationType>(null);
  const [uploadType, setUploadType] = useState<UploadType>(null);
  const [assetName, setAssetName] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create URL for preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
      
      toast.success("File uploaded successfully");
    }
  };

  // Handle back button
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle next button
  const handleNext = () => {
    // Simple validation based on current step
    if (currentStep === 1 && !registrationType) {
      toast.error("Please select a registration type");
      return;
    }
    
    if (currentStep === 2) {
      if (!assetName.trim()) {
        toast.error("Please enter an asset name");
        return;
      }
      
      if (!file && uploadType === "upload") {
        toast.error("Please upload a file");
        return;
      }
    }
    
    if (currentStep === 3 && uploadType === "upload" && !description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    
    if (currentStep === 4) {
      if (!collectionName.trim()) {
        toast.error("Please enter a collection name");
        return;
      }
      if (!collectionSymbol.trim()) {
        toast.error("Please enter a token symbol");
        return;
      }
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle final registration
  const handleRegister = () => {
    // In a real implementation, this would connect to the blockchain
    toast.success("Registration successful!");
    onClose();
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Choose a Registration type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div 
                className={`p-6 rounded-lg border cursor-pointer transition-all ${
                  registrationType === "new" 
                    ? "border-purple-500 bg-[#1a1a1a]" 
                    : "border-gray-700 hover:border-gray-500"
                }`}
                onClick={() => setRegistrationType("new")}
              >
                <div className="bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 18.5L6 14.5V8.5L12 4.5L18 8.5V14.5L12 18.5Z" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-1">New IP</h3>
                <p className="text-sm text-gray-400">Register an original image, video, or prose to the Story catalog</p>
              </div>
              
              <div 
                className={`p-6 rounded-lg border cursor-pointer transition-all ${
                  registrationType === "remix" 
                    ? "border-purple-500 bg-[#1a1a1a]" 
                    : "border-gray-700 hover:border-gray-500"
                }`}
                onClick={() => setRegistrationType("remix")}
              >
                <div className="bg-teal-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9L9 4M9 4L4 9M9 4V12M10 15L15 20M15 20L20 15M15 20V12" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-1">Remix</h3>
                <p className="text-sm text-gray-400">Register a remix, derivative, or other asset related to an existing parent</p>
              </div>
            </div>
            
            <div className="bg-yellow-900/20 rounded-lg p-4 mt-6 flex gap-3">
              <div className="bg-yellow-500/20 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm text-yellow-300">Get some $IP first!</h4>
                <p className="text-xs text-gray-300">You will need some $IP for gas and transaction fees.</p>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Add asset details</h2>
            
            <div className="mt-6">
              <Label htmlFor="assetName" className="text-sm text-gray-300 mb-1 block">Name your asset</Label>
              <Input 
                id="assetName"
                placeholder="Add a name"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="bg-transparent border-gray-700 focus:border-purple-500"
              />
            </div>
            
            <div className="mt-6">
              <div className="mb-4">
                <div className="flex border-b border-gray-700">
                  <button 
                    className={`py-2 px-4 ${uploadType === "upload" ? "border-b-2 border-purple-500" : ""}`}
                    onClick={() => setUploadType("upload")}
                  >
                    Upload asset
                  </button>
                  <button 
                    className={`py-2 px-4 ${uploadType === "wallet" ? "border-b-2 border-purple-500" : ""}`}
                    onClick={() => setUploadType("wallet")}
                  >
                    Choose from wallet
                  </button>
                </div>
              </div>
              
              {uploadType === "upload" && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Upload File</p>
                  <p className="text-xs text-gray-500 mb-4">
                    Supported file types: JPG, PNG, GIF, SVG, WEBP, MP4, WEBM, MOV, WAV, MP3, FLAC, AAC, OGG, M4A, OPUS
                    <br />Maximum size 20MB
                  </p>
                  
                  <div 
                    className="border-2 border-dashed border-gray-700 rounded-lg p-8 mt-4 text-center"
                    onClick={() => document.getElementById("fileInput")?.click()}
                  >
                    <div className="flex justify-center gap-4 mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                        <path d="M21 8v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0l-9-7-9 7m0 0h18" />
                      </svg>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                        <path d="M10 9H8" />
                      </svg>
                    </div>
                    
                    <p className="text-gray-400 mb-1">Browse or drag and drop your file here.</p>
                    
                    <input 
                      type="file" 
                      id="fileInput" 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*,video/*,audio/*"
                    />
                    
                    {previewUrl && (
                      <div className="mt-4">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="max-h-40 mx-auto rounded" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {uploadType === "wallet" && (
                <div className="text-center py-8 text-gray-400">
                  <p>Connect your wallet to view your NFTs</p>
                  <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Asset Details</h2>
            
            {uploadType === "upload" && (
              <div>
                <p className="text-base font-medium mb-2">Describe the asset</p>
                <p className="text-sm text-gray-400 mb-4">You can include information like history, usage guidelines, or other helpful details.</p>
                
                <textarea 
                  className="w-full h-40 p-3 rounded-lg bg-transparent border border-gray-700 focus:border-purple-500 focus:outline-none" 
                  placeholder="Add a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            )}
          </div>
        );
        
      case 4:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Create Catalog</h2>
            <p className="text-gray-400 mb-6">Enter the details for this catalog</p>
            
            <div className="mt-4">
              <p className="text-sm mb-2">Thumbnail</p>
              <div 
                className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center" 
                onClick={() => document.getElementById("thumbnailInput")?.click()}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Thumbnail" className="w-24 h-24 object-cover rounded" />
                ) : (
                  <div className="w-24 h-24 bg-gray-800 rounded flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#666" strokeWidth="2" />
                      <path d="M3 16l5-5 12 12" stroke="#666" strokeWidth="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="#666" strokeWidth="2" />
                    </svg>
                  </div>
                )}
                <p className="text-sm text-gray-400 mt-3">Browse or drag and drop your image here.</p>
                <p className="text-xs text-gray-500">JPG, PNG, SVG, WEBP, AVIF up to 25MB</p>
                
                <button className="mt-4 px-4 py-2 border border-gray-600 rounded-full text-sm">
                  Choose file
                </button>
                
                <input 
                  type="file" 
                  id="thumbnailInput" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <Label htmlFor="collectionName" className="text-sm text-gray-300 mb-1 block">Collection Name (required)</Label>
                <Input 
                  id="collectionName"
                  placeholder="My Custom Collection"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  className="bg-transparent border-gray-700 focus:border-purple-500"
                />
              </div>
              
              <div>
                <Label htmlFor="collectionSymbol" className="text-sm text-gray-300 mb-1 block">Symbol (required)</Label>
                <Input 
                  id="collectionSymbol"
                  placeholder="Enter token symbol"
                  value={collectionSymbol}
                  onChange={(e) => setCollectionSymbol(e.target.value)}
                  className="bg-transparent border-gray-700 focus:border-purple-500"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Label htmlFor="collectionDescription" className="text-sm text-gray-300 mb-1 block">Description</Label>
              <p className="text-xs text-gray-500 mb-2">Optional</p>
              <textarea 
                id="collectionDescription"
                className="w-full h-24 p-3 rounded-lg bg-transparent border border-gray-700 focus:border-purple-500 focus:outline-none" 
                placeholder="Describe your collection"
              ></textarea>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Review and register</h2>
            <p className="text-gray-400 mb-6">Here's an overview of your registration</p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-sm font-medium mb-2">Your Asset</h3>
                {previewUrl && (
                  <div className="border border-gray-700 rounded-lg overflow-hidden">
                    <img src={previewUrl} alt="Asset preview" className="w-full object-cover h-48" />
                    <div className="p-3 border-t border-gray-700">
                      <p className="text-xs text-gray-500">Portal Public Collection</p>
                      <p className="font-medium">{assetName || "Untitled Asset"}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <p className="text-xs text-gray-500">Publisher</p>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                          <span className="text-sm">You</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Licenses (1)</h3>
                  <button className="text-xs py-1 px-3 border border-gray-700 rounded-full">
                    Add License
                  </button>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
                  <span>Commercial Remix</span>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Define button text based on current step
  const getButtonText = () => {
    if (currentStep === 5) return "Login to Register";
    return "Next";
  };

  // Only render when modal is open
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
      >
        <motion.div 
          className="bg-black w-full max-w-4xl rounded-xl border border-gray-800 overflow-hidden"
          variants={modalVariants}
        >
          <div className="flex">
            {/* Left sidebar */}
            <div className="w-64 bg-black p-6 border-r border-gray-800 hidden md:block">
              <div className="mb-6">
                <IPLogo />
              </div>
              
              <h1 className="text-xl font-bold mb-1">Register your IP</h1>
              <p className="text-sm text-gray-400 mb-6">
                This tool will help you register your IP on Story. Registering IP on Story means your work is rights protected and verifiable.
              </p>
              
              <div className="space-y-1">
                <NavigationStep 
                  number={1} 
                  title="Registration type" 
                  isActive={currentStep === 1} 
                  isCompleted={currentStep > 1}
                />
                <NavigationStep 
                  number={2} 
                  title="Asset Details" 
                  isActive={currentStep === 2} 
                  isCompleted={currentStep > 2}
                />
                <NavigationStep 
                  number={3} 
                  title="Contributor" 
                  isActive={currentStep === 3} 
                  isCompleted={currentStep > 3}
                />
                <NavigationStep 
                  number={4} 
                  title="Licensing" 
                  isActive={currentStep === 4} 
                  isCompleted={currentStep > 4}
                />
                <NavigationStep 
                  number={5} 
                  title="Review & Register" 
                  isActive={currentStep === 5} 
                  isCompleted={currentStep > 5}
                />
              </div>
              
              <div className="absolute bottom-6 left-6 flex items-center gap-2 text-xs text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 12.5L11 15.5L16 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Powered by Story
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1 bg-[#111] flex flex-col max-h-[90vh] overflow-hidden">
              {/* Mobile header */}
              <div className="md:hidden flex items-center p-4 border-b border-gray-800">
                <IPLogo />
                <div className="ml-3">
                  <h1 className="text-lg font-bold">Register your IP</h1>
                  <p className="text-xs text-gray-400">Protect your creative work on Story</p>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {renderStepContent()}
              </div>
              
              {/* Footer with navigation */}
              <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={currentStep === 1 ? onClose : handleBack}
                  className="border-gray-700 hover:bg-gray-800 hover:text-white"
                >
                  {currentStep === 1 ? (
                    <>Back</>
                  ) : (
                    <><ChevronLeft size={16} /> Back</>
                  )}
                </Button>
                
                <Button
                  onClick={currentStep === 5 ? handleRegister : handleNext}
                  className={`${
                    currentStep === 5 
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600" 
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {getButtonText()} {currentStep < 5 && <ChevronRight size={16} />}
                </Button>
              </div>
              
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StoryPortal;
