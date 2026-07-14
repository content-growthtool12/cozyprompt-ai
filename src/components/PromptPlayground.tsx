import React, { useState, useEffect } from 'react';
import { Prompt } from '../types';
import { Icon } from './IconHelper';
import { motion, AnimatePresence } from 'motion/react';

interface PromptPlaygroundProps {
  prompt: Prompt;
  onCopy: (text: string) => void;
}

export const PromptPlayground: React.FC<PromptPlaygroundProps> = ({ prompt, onCopy }) => {
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  // Reset values when prompt changes
  useEffect(() => {
    const initial: Record<string, string> = {};
    prompt.variables.forEach(v => {
      initial[v] = '';
    });
    setVariableValues(initial);
    setCopied(false);
  }, [prompt]);

  const handleInputChange = (variable: string, value: string) => {
    setVariableValues(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const getCompiledPrompt = () => {
    let result = prompt.content;
    prompt.variables.forEach(v => {
      const val = variableValues[v];
      const replacement = val
       !== '' ? val : `[${v}]`;
      // Replace case-insensitively or exact
      result = result.split(`[${v}]`).join(replacement);
    });
    return result;
  };

  const compiledPrompt = getCompiledPrompt();

  const handleCopy = () => {
  navigator.clipboard.writeText(compiledPrompt);
  setCopied(true);
  onCopy(compiledPrompt);
  setTimeout(() => setCopied(false), 2000);
};

  const isConfigured = prompt.variables.some(v => (variableValues[v] || '').trim() !== '');

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
          <Icon name="Sparkles" size={16} />
        </div>
        <h3 className="font-semibold text-sm text-slate-200">Prompt Variable Customizer</h3>
      </div>


      {prompt.variables.length > 0 ? (
        <div className="space-y-4 mb-5">
          <div className="grid grid-cols-1 gap-3">
            {prompt.variables.map(variable => (
              <div key={variable} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 flex items-center justify-between">
                  <span>Enter {variable}</span>
                  {variableValues[variable] ? (
                    <span className="text-emerald-400 text-[10px] flex items-center gap-0.5">
                      <Icon name="Check" size={10} /> Filled
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[10px]">Placeholder</span>
                  )}
                </label>
                <input
                  type="text"
                  placeholder={`e.g., Creative Writing, Professional, etc.`}
                  value={variableValues[variable] || ''}
                  onChange={(e) => handleInputChange(variable, e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs text-slate-500 mb-5 italic bg-slate-950/20 p-3 rounded-xl border border-slate-900/40">
          This prompt contains no variables and is ready for production.
        </div>
      )}

      {/* Compiler output Terminal style */}
      <div className="flex flex-col rounded-xl overflow-hidden bg-slate-950 border border-slate-800/60 shadow-inner">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800/40 text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
            <span className="ml-1 select-none">compiled_prompt.txt</span>
          </div>
          {isConfigured && (
            <span className="text-purple-400 font-medium">Customized Live</span>
          )}
        </div>
        <div className="p-4 max-h-48 overflow-y-auto text-xs font-mono text-slate-300 leading-relaxed break-words whitespace-pre-wrap select-all selection:bg-purple-500/30">
          {compiledPrompt}
        </div>
      </div>

      <button
        onClick={handleCopy}
        className={`w-full mt-4 py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
          copied
            ? 'bg-emerald-600 text-white shadow-emerald-900/10'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-950/20 hover:from-purple-500 hover:to-blue-500 active:scale-[0.98]'
        }`}
      >
        <Icon name={copied ? 'Check' : 'Copy'} size={14} />
        {copied ? 'Copied to Clipboard!' : 'Copy Customized Prompt'}
      </button>
    </div>
  );
};
