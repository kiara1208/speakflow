import { useState } from 'react';

const TONE_CONFIG = {
  Casual: { emoji: '😎', bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', text: 'text-amber-400' },
  Daily: { emoji: '💬', bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
  Emotional: { emoji: '🔥', bg: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-500/30', text: 'text-rose-400' },
};

function ResultCard({ data }) {
  const [copied, setCopied] = useState(false);

  const config = TONE_CONFIG[data.tone] || TONE_CONFIG.Daily;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.expression);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`p-5 bg-gradient-to-r ${config.bg} border ${config.border} rounded-xl backdrop-blur-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{config.emoji}</span>
        <span className={`${config.text} font-medium`}>{data.tone}</span>
      </div>

      <p className="text-white text-lg leading-relaxed mb-4">{data.expression}</p>

      <div className="flex items-center justify-between">
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            copied
              ? 'bg-green-500/20 text-green-400'
              : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300'
          }`}
        >
          {copied ? '✓ 已复制' : '📋 一键复制'}
        </button>

        {data.alternatives && data.alternatives.length > 0 && (
          <div className="flex gap-2">
            {data.alternatives.slice(0, 2).map((alt, i) => (
              <span key={i} className="px-3 py-1 bg-slate-700/30 text-slate-400 text-xs rounded-full">
                {alt}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultCard;
