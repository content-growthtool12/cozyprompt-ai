import React, { useState } from 'react';
import { Prompt } from '../types';
import { Icon } from './IconHelper';
import { motion } from 'motion/react';

interface PromptCardProps {
  prompt: Prompt;
  isFavorited: boolean;
  onSelect: (promptId: string) => void;
  onToggleFavorite: (promptId: string, e: React.MouseEvent) => void;
  onCopy: (promptId: string, text: string, e: React.MouseEvent) => void;
  isUserPremium: boolean;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  isFavorited,
  onSelect,
  onToggleFavorite,
  onCopy,
  isUserPremium
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    onCopy(prompt.id, prompt.content, e);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColors = {
    Beginner: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    Intermediate: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    Advanced: 'bg-rose-500/10 border-rose-500/20 text-rose-400'
  };

  const showLocked = prompt.isPremium && !isUserPremium;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(prompt.id)}
      className="group relative flex flex-col justify-between bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4.5 hover:border-purple-500/40 hover:bg-slate-900/70 transition-all cursor-pointer overflow-hidden shadow-md"
    >
      {/* Premium Gradient Glow */}
      {prompt.isPremium && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all" />
      )}

      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          {/* Difficulty Badge */}
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${difficultyColors[prompt.difficulty]}`}>
              {prompt.difficulty}
            </span>
            {prompt.isPremium && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border border-amber-400/30 flex items-center gap-0.5 shadow-md shadow-amber-950/20">
                <Icon name="Zap" size={8} /> Premium
              </span>
            )}
          </div>

          {/* Favorite heart toggle button */}
          <button
            onClick={(e) => onToggleFavorite(prompt.id, e)}
            className="p-1.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all"
            aria-label="Favorite"
          >
            <Icon
              name="Heart"
              size={13}
              className={`transition-all ${isFavorited ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400'}`}
            />
          </button>
        </div>

        {/* Title & Description */}
        <div className="flex items-start gap-1 mb-1.5">
          <h4 className="font-semibold text-xs text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1 flex-1">
            {prompt.title}
          </h4>
          {showLocked && (
            <Icon name="Lock" size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
          )}
        </div>
        
        <p className="text-[11px] text-slate-400 leading-normal line-clamp-2 mb-4">
          {prompt.description}
        </p>
      </div>

      {/* Footer Metrics & Copy Button */}
      <div className="flex items-center justify-between border-t border-slate-800/40 pt-3 text-[10px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 hover:text-slate-300 transition-colors">
            <Icon name="Heart" size={10} className="text-slate-500" />
            {prompt.likes}
          </span>
          <span className="flex items-center gap-1 hover:text-slate-300 transition-colors">
            <Icon name="Copy" size={10} className="text-slate-500" />
            {prompt.copies + (copied ? 1 : 0)}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
            copied
              ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
              : showLocked
              ? 'bg-slate-950 border border-slate-800 text-amber-500 hover:bg-slate-900'
              : 'bg-purple-600/10 border border-purple-500/20 text-purple-400 hover:bg-purple-600/20 group-hover:border-purple-500/40'
          }`}
        >
          {showLocked ? (
            <>
              <Icon name="Lock" size={10} />
              <span>Unlock</span>
            </>
          ) : (
            <>
              <Icon name={copied ? 'Check' : 'Copy'} size={10} />
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
