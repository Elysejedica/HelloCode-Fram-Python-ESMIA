import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Check, X } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config';

interface CodeEditorProps {
  exerciseId: number;
  initialCode: string;
  onSuccess?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ exerciseId, initialCode, onSuccess }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };
  
  const handleRunCode = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/api/code-submission/`, {
        exercise: exerciseId,
        code
      });
      
      setOutput(response.data.output);
      setIsSuccess(response.data.is_correct);
      
      if (response.data.is_correct && onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred while running your code');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="card">
      <div className="code-editor-header">
        <div className="text-sm font-medium">Code Editor</div>
        <button
          onClick={handleRunCode}
          disabled={isLoading}
          className="btn btn-primary py-1 px-3 text-sm"
        >
          {isLoading ? (
            <span className="flex items-center">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              Running...
            </span>
          ) : (
            <span className="flex items-center">
              <Play size={16} className="mr-1" />
              Run Code
            </span>
          )}
        </button>
      </div>
      
      <div className="h-64">
        <Editor
          height="100%"
          defaultLanguage="python" // This should be dynamic based on the lesson
          value={code}
          onChange={handleEditorChange}
          theme="vs"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
          }}
        />
      </div>
      
      {(output !== null || error !== null) && (
        <div className="p-4 border-t border-neutral-200">
          <div className="font-medium mb-2 flex items-center">
            {isSuccess !== null && (
              <span className={`flex items-center mr-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {isSuccess ? (
                  <Check size={16} className="mr-1" />
                ) : (
                  <X size={16} className="mr-1" />
                )}
              </span>
            )}
            Output:
          </div>
          <pre className="bg-neutral-100 p-3 rounded-md text-sm overflow-auto max-h-40">
            {error || output}
          </pre>
          
          {isSuccess && (
            <div className="mt-3 text-sm text-green-600 font-medium">
              Great job! Your solution is correct.
            </div>
          )}
          
          {isSuccess === false && !error && (
            <div className="mt-3 text-sm text-red-600 font-medium">
              Your solution doesn't match the expected output. Try again!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;