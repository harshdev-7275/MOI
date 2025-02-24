import React from "react";
import { motion } from "framer-motion";
import { Database, Eclipse, FileCode, Film, Frame, Gauge, Hourglass, Lightbulb, MessageCircleX, Video, X } from "lucide-react";
import Carousel from "./Caraousal";
import Scene from "./Scene";

interface ResultsPageProps {
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
  setIsFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnalyzing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  setShowResults,
  setUploadedFile,
  setIsFileUploaded,
  setIsAnalyzing,
}) => {
  const handleCloseResultsPage = () => {
    setShowResults(false);
    setUploadedFile(null);
    setIsFileUploaded(false);
    setIsAnalyzing(false);
  };

  return (
    <motion.div
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "10vh", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-0 left-0 z-50 flex h-[100vh] w-full flex-col overflow-hidden rounded-t-md bg-[#070825] shadow-lg mb-10 border-blue-600 border-t-2"
    >
      {/* Close Button */}
      <span className="absolute right-3 top-3 cursor-pointer">
     
        < X color="white" size={28} className="hover:text-red-500" onClick={handleCloseResultsPage} />
      </span>

      {/* Main Content */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-xl bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8 shadow-2xl text-white">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  Camera Information
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex gap-1"><Film />Resolution</p>
                  <p className="text-white">720p (1280x720)</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex gap-1"><Frame />Frame Rate</p>
                  <p className="text-white">30fps</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex gap-1"><FileCode />Encoding</p>
                  <p className="text-white break-words">H.265 (high compression efficiency)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8 shadow-2xl text-white">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  Surveillance information
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex gap-1"><Video /> Number of cameras</p>
                  <p className="text-white">20</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex items-center gap-1"><Hourglass />Duration of surveillance</p>
                  <p className="text-white">24 hours per day, 120 days</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex gap-1 items-center"><Database />Total Storage required for 120days retention period</p>
                  <p className="text-white">24.3 TB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8 shadow-2xl text-white">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  Optimization & Compliance
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex gap-1 items-center"><Lightbulb />Suggestions for Improvement</p>
                  <p className="text-white">Use better encryption</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex gap-1 items-center"><Eclipse />Blind spots to address</p>
                  <p className="text-white">3 detected</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex gap-1 items-center"><Database />Storage Optimization</p>
                  <p className="text-white">Use another encoder</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <p className="text-blue-300 font-medium flex gap-1 items-center"><Gauge />Latency Reduction</p>
                  <p className="text-white">Optimize encoding & bandwidth</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Visualization */}
        <Carousel />
        <div className="flex h-[400px]">
          <Scene />
          <div>
            <p className="text-red-400">🔴 Blind Spots</p>
            <p className="text-green-400">🟢 Security Camera Coverage</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsPage;
