import React from "react";
import { motion } from "framer-motion";
import { MessageCircleX } from "lucide-react";
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
      className="fixed bottom-0 left-0 z-50 flex h-[100vh] w-full flex-col overflow-hidden rounded-t-md bg-[#070825] shadow-lg mb-10"
    >
      {/* Close Button */}
      <span className="absolute right-3 top-3 cursor-pointer">
        <MessageCircleX
          color="white"
          size={20}
          onClick={handleCloseResultsPage}
        />
      </span>

      {/* Main Content */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {/* Analysis Summary */}
        <div className="rounded-md bg-gray-900 p-4 shadow-md text-white">
          <h2 className="mb-2 text-lg font-semibold">Analysis Summary</h2>
          <ul className="space-y-2 text-sm">
            <li className="text-red-400">
              🚨 Smoke detector missing in Room 2A
            </li>
            <li className="text-red-400">
              🚨 Roof height below standard in Section B
            </li>
            <li className="text-green-400">
              ✅ All exits are accessible
            </li>
          </ul>
        </div>

        {/* CCTV Coverage */}
        <div className="rounded-md bg-gray-900 p-4 shadow-md text-white">
          <h2 className="mb-2 text-lg font-semibold">CCTV Coverage</h2>
          <p className="text-red-400">
            ⚠️ Area not covered by CCTV in Zone C
          </p>
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