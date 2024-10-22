import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    // Simulating OCR processing
    setOcrResult('Processing...');
    
    // Mock OCR function (replace this with actual API call when you have a backend)
    const mockOcr = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`OCR Result for ${file.name}:\n\nThis is a simulated OCR result. In a real application, this would be the text extracted from the uploaded image or document.`);
        }, 2000); // Simulate 2 second processing time
      });
    };

    const result = await mockOcr(file);
    setOcrResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">OCR File Upload</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file-upload">
            Choose a file
          </label>
          <div className="flex items-center">
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf"
            />
            <label
              htmlFor="file-upload"
              className="flex-1 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
            >
              <Upload className="inline-block mr-2" size={18} />
              {file ? file.name : 'Select File'}
            </label>
            <button
              onClick={handleUpload}
              disabled={!file}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Process
            </button>
          </div>
        </div>

        {ocrResult && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <FileText className="inline-block mr-2" size={24} />
              OCR Result
            </h2>
            <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{ocrResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;