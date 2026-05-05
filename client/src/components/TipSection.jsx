function TipSection({ tips }) {
  return (
    <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
      <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
        <span>💡</span> 替换建议
      </h3>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-red-400 line-through text-sm mt-0.5">{tip.original}</span>
              <span className="text-slate-600">→</span>
              <span className="text-green-400 text-sm">{tip.replacement}</span>
            </div>
            <p className="text-slate-400 text-sm mt-2">{tip.explanation}</p>
            {tip.usage_note && (
              <p className="text-slate-500 text-xs mt-1 italic">{tip.usage_note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TipSection;
