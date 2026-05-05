import { useState } from 'react';

function InputSection({ onSubmit, loading }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !loading) {
      onSubmit(text.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入中文场景描述或不地道的英文..."
          maxLength={500}
          disabled={loading}
          className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-50"
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-500">
          {text.length}/500
        </div>
      </div>

      <button
        type="submit"
        disabled={!text.trim() || loading}
        className="w-full py-3 px-6 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
      >
        {loading ? 'Thinking...' : '生成表达'}
      </button>
    </form>
  );
}

export default InputSection;
