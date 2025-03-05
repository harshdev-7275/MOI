import React, { useState, useCallback, useEffect } from 'react';
import { Upload, CheckCircle2, Camera, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { Dropzone } from '../components/Dropzone';
import LoadingPage from '../components/LoadingPage';
import ResultsPage from '../components/ResultsPage';
import imageCompression from 'browser-image-compression';


type FloorPlanView = {
  name: string;
  image: string;
  cameras: number;
};

function Dashboard() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
const [isAnalyzingLoadingDone, setIsAnalyzingLoadingDone] = useState<boolean>(false);
const [showResults, setShowResults] = useState<boolean>(false);





// useEffect(() => {
//   if (isAnalyzingLoadingDone) {
//     setIsAnalyzing(false);
//     setShowResults(true);
//     console.log("isAnalyzingLoadingDone", isAnalyzingLoadingDone);
//   }
// }, [isAnalyzingLoadingDone]);




const handleFileAccepted = (file: File) => {
  setUploadedFile(file);
  setIsFileUploaded(true);
};

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
  
    try {
      // Create FormData object
      const formData = new FormData();
      if (uploadedFile) {
        formData.append('file', uploadedFile);
        formData.append('format', 'dxf');
      }
  
      // Upload file to server (let browser handle headers)
      const response = await fetch('https://sight.wiki/upload', {
        method: 'POST',
        body: uploadedFile,
      });
  
      // Check if response is successful
      if (response.ok) {
        const data = await response.json();
        console.log('Upload response:', data);
        if (data.success) {
          setTimeout(() => {
            setIsAnalyzingLoadingDone(true);
          }, 2000);
        } else {
          setIsAnalyzing(false);
          console.error('Upload failed:', data.message);
          alert('Upload failed: ' + data.message);
        }
      } else {
        setIsAnalyzing(false);
        let errorMessage = response.statusText || 'Unknown error';
  
        // Attempt to parse JSON, fall back to status text if it fails
        try {
          const data = await response.json();
          if (data.message) {
            errorMessage = data.message;
          }
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
  
        if (response.status === 413) {
          alert('The uploaded file is too large. Please upload a smaller file. ' + errorMessage);
        } else {
          alert('Upload failed: ' + errorMessage + ' (Status: ' + response.status + ')');
        }
      }
    } catch (error) {
      // Handle network errors
      setIsAnalyzing(false);
      console.error('Upload error:', error);
      alert('Upload error: ' + (error instanceof Error ? error.message : String(error)));
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative">
        {
          isAnalyzing && <LoadingPage setIsAnalyzingLoadingDone={setIsAnalyzingLoadingDone} />
        }
        {
          showResults && <ResultsPage setShowResults ={setShowResults} setUploadedFile={setUploadedFile} setIsFileUploaded={setIsFileUploaded} setIsAnalyzing={setIsAnalyzing} />
        }
       
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src="https://cdn.pixabay.com/vimeo/527824161/31377.mp4?width=1280&hash=f2c3daf2c0f9b67f9d6a5f5a5c6f6f6f6f6f6f6f" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-12">
              <div className="inline-block bg-blue-500 text-lg font-mono px-3 py-1 rounded-full">
                M O I
              </div>
              <h1 className="text-7xl font-bold font-mono leading-none">
                REDEFINING
                <br />
                SECURITY IN THE
                <br />
                DIGITAL ERA
              </h1>
            </div>


            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-3xl font-mono font-bold text-blue-400">98%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-3xl font-mono font-bold text-blue-400">24/7</div>
                <div className="text-sm text-gray-400">Monitoring</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-3xl font-mono font-bold text-blue-400">AI</div>
                <div className="text-sm text-gray-400">Powered</div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="relative flex flex-col items-center">
              {
                !isFileUploaded && ( <Dropzone onFileAccepted={handleFileAccepted} />)
              }
             
              {uploadedFile && (
                <div className="mt-4 p-4 h-[200px] w-full flex items-center justify-center bg-blue-500/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Uploaded: {uploadedFile.name}
                  </p>
                </div>
              )}
              <div>
              {
                isFileUploaded && (
                  <button className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 mt-5 rounded-lg transition-colors font-mono inline-flex items-center' onClick={handleAnalyze}>
                    ANALYZE
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                )
              }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Camera className="w-8 h-8" />,
              title: "AI ANALYSIS",
              description: "Our AI scans entry points, blind spots, and high-risk zones"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "SMART SECURITY",
              description: "Get instant recommendations on optimal camera placement"
            },
            {
              icon: <Upload className="w-8 h-8" />,
              title: "EASY SETUP",
              description: "Upload your blueprint and receive AI-powered insights"
            }
          ].map((feature, index) => (
            <div key={index} className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg p-8 transition-all">
              <div className="bg-blue-500 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-mono font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Scene */}
      <div className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-mono font-bold mb-4">AI-POWERED ANALYSIS</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch our AI system analyze your building's layout in real-time, identifying optimal camera positions for maximum coverage.
          </p>
        </div>
        {/* <Screen /> */}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 pb-24">
        <div className="bg-blue-500 rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-mono font-bold mb-4">SECURE YOUR SPACE</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Stop wasting time on trial and error. Let AI find the best camera locations for you!</p>
            <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-mono font-bold hover:bg-gray-100 transition-colors inline-flex items-center">
              GET STARTED
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 font-mono">
          <p>© 2025 SMART CAMERA PLACEMENT. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;


