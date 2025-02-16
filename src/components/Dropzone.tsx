import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, ChevronRight } from 'lucide-react';

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
}

export function Dropzone({ onFileAccepted }: DropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif','.dwg'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
        isDragActive ? 'border-blue-400 bg-blue-900/20' : 'border-white/20 hover:border-white/40'
      } backdrop-blur-sm cursor-pointer`}
    >
      <input {...getInputProps()} />
      <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragActive ? 'text-blue-400 animate-bounce' : 'text-blue-400'}`} />
      <h3 className="text-xl font-mono font-bold mb-2">UPLOAD YOUR BLUEPRINT</h3>
      <p className="text-gray-400 mb-4 font-mono">
        {isDragActive ? 'Drop your file here' : 'Drag and drop your building\'s floor plan or click to browse'}
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg transition-colors font-mono inline-flex items-center">
        CHOOSE FILE
        <ChevronRight className="ml-2 w-5 h-5" />
      </button>
    </div>
  );
}