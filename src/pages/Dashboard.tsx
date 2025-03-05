import React, { useState } from 'react';
import { Upload, CheckCircle2, Camera, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import LoadingPage from '../components/LoadingPage';
import ResultsPage from '../components/ResultsPage';
import { Dropzone } from '../components/Dropzone';

function Dashboard() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isAnalyzingLoadingDone, setIsAnalyzingLoadingDone] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any>(null)

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0] || null;
  //   setUploadedFile(file);
  //   setIsFileUploaded(!!file);
  // };
  const handleFileAccepted = (file: File) => {
    setUploadedFile(file);
      setIsFileUploaded(true);
    // Handle file upload logic here
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      // formData.append('format', 'dxf');

      const response = await fetch('https://sight.wiki/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload response:', data);
        if (data.success) {
          setTimeout(() => setIsAnalyzingLoadingDone(true), 2000);
          setResponseData(data)
          setShowResults(true);
        } else {
          setIsAnalyzing(false);
          alert('Upload failed: ' + data.message);
        }
      } else {
        setIsAnalyzing(false);
        alert('Upload failed: ' + response.statusText);
      }
    } catch (error) {
      setIsAnalyzing(false);
      console.error('Upload error:', error);
      alert('Upload error: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {isAnalyzing && <LoadingPage setIsAnalyzingLoadingDone={setIsAnalyzingLoadingDone} />}
      {showResults && (
        <ResultsPage
          setShowResults={setShowResults}
          setUploadedFile={setUploadedFile}
          setIsFileUploaded={setIsFileUploaded}
          setIsAnalyzing={setIsAnalyzing}
          responseData={responseData}
          setResponseData = {setResponseData}
        />
      )}
      
      <div className="relative container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          <h1 className="text-7xl font-bold font-mono leading-none">
            REDEFINING SECURITY IN THE DIGITAL ERA
          </h1>
        </div>

        <div className="flex flex-col items-center">
          {/* <input type="file" accept=".dxf" onChange={handleFileChange} className="mb-4" /> */}
          <Dropzone onFileAccepted={handleFileAccepted} />
          {isFileUploaded && (
            <button onClick={handleAnalyze} className="bg-blue-500 px-4 py-2 rounded text-white">
              Analyze File
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
