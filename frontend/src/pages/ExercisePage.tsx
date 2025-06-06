import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/common/Layout';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const LANGUAGES = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  // Ajoute d'autres langages ici si tu veux
];

const ExercisePage: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState<string>('python');

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    try {
      const token = localStorage.getItem('access');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.post(`${API_URL}/api/run-code/`, { code, language }, { headers });
      setOutput(res.data.output);
    } catch (err: any) {
      setOutput('Erreur lors de l\'exécution');
    }
    setIsRunning(false);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Exercice interactif</h1>
        <div className="mb-4">
          <label className="mr-2 font-semibold">Langage :</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="border rounded p-1"
          >
            {LANGUAGES.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
        <textarea
          className="w-full h-40 p-2 border rounded mb-4 font-mono"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder={`Écris ton code ${LANGUAGES.find(l => l.value === language)?.label} ici...`}
        />
        <div className="flex gap-4 mb-4">
          <button
            className="btn btn-primary"
            onClick={runCode}
            disabled={isRunning}
          >
            Exécuter
          </button>
          <button
            className="btn btn-outline"
            onClick={() => { setCode(''); setOutput(''); }}
          >
            Réinitialiser
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <strong>Sortie :</strong>
          <pre className="mt-2">{output}</pre>
        </div>
      </div>
    </Layout>
  );
};

export default ExercisePage;