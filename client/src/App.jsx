import { useState } from 'react';
import InputSection from './components/InputSection';
import ResultCard from './components/ResultCard';
import TipSection from './components/TipSection';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslate = async (text) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Translation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">SpeakFlow</h1>
          <p className="text-slate-400">将你的表达转化为地道的英语</p>
        </header>

        <InputSection onSubmit={handleTranslate} loading={loading} />

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-2 border-slate-500 border-t-slate-200 rounded-full animate-spin" />
          </div>
        )}

        {result && !loading && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">表达建议</h2>
            </div>

            {result.expressions?.map((expr, index) => (
              <ResultCard key={index} data={expr} />
            ))}

            {result.tips && result.tips.length > 0 && (
              <TipSection tips={result.tips} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
