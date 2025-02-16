import React, { useState, useCallback, useEffect } from 'react';
import { Upload, CheckCircle2, Camera, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { Dropzone } from './components/Dropzone';
import LoadingPage from './components/LoadingPage';
import ResultsPage from './components/ResultsPage';
import House from './components/House';
import Scene from './components/Scene';


type FloorPlanView = {
  name: string;
  image: string;
  cameras: number;
};

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
const [isAnalyzingLoadingDone, setIsAnalyzingLoadingDone] = useState<boolean>(false);
const [showResults, setShowResults] = useState<boolean>(false);
const [isResultPageClosed, setIsResultPageClosed] = useState<boolean>(false);


  const floorPlanViews: FloorPlanView[] = [
    { name: "Room 1", image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 2 },
    { name: "Room 2", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 3 },
    { name: "Room 3", image: "https://images.unsplash.com/photo-1518481852452-9415b262eba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 2 },
    { name: "Room 4", image: "https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 4 },
    { name: "Room 5", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 3 },
    { name: "Room 6", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 2 },
    { name: "Room 7", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 3 },
    { name: "Room 8", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 4 },
    { name: "Room 9", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 2 },
    { name: "Room 10", image: "https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 3 },
    { name: "Room 11", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 2 },
    { name: "Room 12", image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 4 },
    { name: "Atrium", image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 6 },
    { name: "Corridor", image: "https://images.unsplash.com/photo-1504615755583-2916b52192a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 5 },
    { name: "Stairs", image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", cameras: 4 },
  ];

  const loadingSteps = [
    "Analyzing floor plan...",
    "Placing the Security Cameras...",
    "Analyzing optimal positions...",
    "Generating floor plan output with Camera positions..."
  ];

useEffect(() => {
  if (isAnalyzingLoadingDone) {
    setIsAnalyzing(false);
    setShowResults(true);
    console.log("isAnalyzingLoadingDone", isAnalyzingLoadingDone);
  }
}, [isAnalyzingLoadingDone]);



  const handleAnalyze =()=>{
    setIsAnalyzing(true);
  }
 

  const handleFileAccepted = (file: File) => {
    setUploadedFile(file);
      setIsFileUploaded(true);

    // Handle file upload logic here
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

export default App;


{/* <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        {!isLoading && !isComplete && (
          <div
            className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center space-y-4">
              <Upload className="w-16 h-16 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-700">Upload Floor Plan</h2>
              <p className="text-gray-500">Drag and drop your file here or</p>
              <label className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                Browse Files
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
              {file && (
                <p className="text-sm text-gray-500 mt-2">
                  Selected file: {file.name}
                </p>
              )}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-8"></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {loadingSteps[currentStep]}
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {isComplete && (
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-6">Analysis Complete!</h3>
            <div className="relative rounded-lg overflow-hidden group">
              <img
                src={floorPlanViews[currentViewIndex].image}
                alt={`Floor plan - ${floorPlanViews[currentViewIndex].name}`}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                <Camera className="w-4 h-4" />
                <span className="text-sm">{floorPlanViews[currentViewIndex].cameras} Cameras</span>
              </div>
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full">
                <span className="text-sm">{floorPlanViews[currentViewIndex].name}</span>
              </div>
              <button
                onClick={previousView}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextView}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-2 flex-wrap">
              {floorPlanViews.map((view, index) => (
                <button
                  key={view.name}
                  onClick={() => setCurrentViewIndex(index)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    currentViewIndex === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors`}
                >
                  {view.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setFile(null);
                setIsComplete(false);
                setCurrentViewIndex(0);
              }}
              className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Upload Another Plan
            </button>
          </div>
        )}
      </div>
    </div> */}