import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Simulate loading state for iframe
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle iframe loading error
  const handleIframeError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  // Retry loading the iframe
  const handleRetry = () => {
    setIsLoading(true);
    setIsError(false);
    // Force iframe reload with a delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Refresh Data
        </Button>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-[541.25px] bg-gray-50">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        )}
        
        {isError && (
          <div className="flex flex-col items-center justify-center h-[541.25px] bg-gray-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center p-8"
            >
              <h3 className="text-xl font-medium text-red-600 mb-2">Failed to load dashboard</h3>
              <p className="text-gray-600 mb-6">There was a problem connecting to the analytics service</p>
              <Button onClick={handleRetry} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </motion.div>
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading || isError ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: isLoading || isError ? "none" : "block" }}
        >
          <iframe 
            title="dashboard1"
            width="100%" 
            height="541.25" 
            src="https://app.powerbi.com/reportEmbed?reportId=51cc9326-7096-4b0a-a645-c9c9102bf386&autoAuth=true&ctid=e0281d2f-78fb-4f75-ab5b-ab4a5c4c14cb" 
            frameBorder="0" 
            allowFullScreen={true}
            onError={handleIframeError}
          />
        </motion.div>
      </motion.div>
      
      </motion.div>
  );
};

export default Dashboard;