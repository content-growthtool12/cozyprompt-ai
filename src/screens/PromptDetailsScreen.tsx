import React, { useState } from 'react';
import { Prompt } from '../types';
import { PROMPTS } from '../data/prompts';
import { Icon } from '../components/IconHelper';
import { PromptPlayground } from '../components/PromptPlayground';
import { ShareModal } from '../components/ShareModal';
import { motion, AnimatePresence } from 'motion/react';

interface PromptDetailsScreenProps {
  promptId: string;
  onBack: () => void;
  favorites: string[];
  onToggleFavorite: (promptId: string, e: React.MouseEvent) => void;
  onCopy: (promptId: string, text: string, e: React.MouseEvent) => void;
  isPremium: boolean;
  onNavigate: (screen: string) => void;
}

export const PromptDetailsScreen: React.FC<PromptDetailsScreenProps> = ({
  promptId,
  onBack,
  favorites,
  onToggleFavorite,
  onCopy,
  isPremium,
  onNavigate
}) => {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const prompt = PROMPTS.find(p => p.id === promptId);

  if (!prompt) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-6 text-center select-none">
        <Icon name="X" size={40} className="text-slate-600 mb-3" />
        <p className="text-sm font-semibold">Prompt not found</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isFavorited = favorites.includes(prompt.id);
  const isLocked = prompt.isPremium && !isPremium;

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    onCopy(prompt.id, prompt.content, {} as any);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto pb-24 scrollbar-none select-none relative">
      {/* Top Header Row */}
      <div className="px-5 pt-6 pb-3 flex items-center justify-between bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-900/30">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
        >
          <Icon name="ChevronLeft" size={15} />
        </button>
        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
          Prompt Workspace
        </span>
        <button
          onClick={() => setShowShare(true)}
          className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
        >
          <Icon name="Share" size={14} />
        </button>
      </div>

      {/* Main Body Grid */}
      <div className="px-5 py-4 space-y-5">
        {/* Title Block */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono uppercase">
              {prompt.category.toUpperCase()}
            </span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono">
              {prompt.difficulty}
            </span>
            {prompt.isPremium && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border border-amber-400/20 flex items-center gap-0.5">
                <Icon name="Zap" size={8} /> Pro
              </span>
            )}
          </div>

          <h1 className="text-xl font-extrabold text-white tracking-tight leading-tight">
            {prompt.title}
          </h1>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>By <span className="text-slate-400 font-semibold">{prompt.author}</span></span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Icon name="Heart" size={10} /> {prompt.likes}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Icon name="Copy" size={10} /> {prompt.copies} copies
              </span>
            </div>
          </div>
        </div>

        {/* Action Tray */}
        <div className="grid grid-cols-2 gap-3">
          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => onToggleFavorite(prompt.id, e)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-800 bg-slate-900/30 text-xs text-slate-200 font-semibold hover:border-slate-700 transition-all cursor-pointer active:scale-95"
          >
            <Icon
              name="Heart"
              size={14}
              className={`transition-all ${isFavorited ? 'text-rose-500 fill-rose-500 scale-110' : 'text-slate-400'}`}
            />
            <span>{isFavorited ? 'Favorited' : 'Add Favorite'}</span>
          </button>

          {/* Quick Share Trigger */}
          <button
            onClick={() => setShowShare(true)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-800 bg-slate-900/30 text-xs text-slate-200 font-semibold hover:border-slate-700 transition-all cursor-pointer active:scale-95"
          >
            <Icon name="Share" size={13} className="text-slate-400" />
            <span>Share Prompt</span>
          </button>
        </div>

        {/* Description */}
        <div className="p-4 bg-slate-900/20 border border-slate-900 rounded-2xl">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
            Overview Description
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {prompt.description}
          </p>
        </div>

        {/* If Locked: show glass overlay. Else: show Playground Customizer */}
        {isLocked ? (
          <div className="relative rounded-2xl border border-amber-500/20 bg-slate-950 overflow-hidden p-6 text-center space-y-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_60%)] pointer-events-none" />
            
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Icon name="Lock" size={20} />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-100">Unlock Premium Prompt</h3>
              <p className="text-[10px] text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                This high-quality prompt is reserved for CozyPrompt Premium members. Get unlimited copies and customizable tags.
              </p>
            </div>

            <button
              onClick={() => onNavigate('premium')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-950/20 hover:from-amber-400 hover:to-yellow-400 transition-all cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
            >
              <Icon name="Zap" size={12} />
              Unlock Premium for $4.99/mo
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <PromptPlayground prompt={prompt} onCopy={(id) => onCopy(id, prompt.content, {} as any)} />

            {/* Quick Raw Prompt Copy block alternative */}
            <div className="p-4 bg-slate-950 border border-slate-900 rounded-2xl flex items-center justify-between gap-3.5">
              <div className="space-y-0.5">
                <h5 className="text-[10px] font-bold text-slate-500">Need the Raw Template?</h5>
                <p className="text-[10px] text-slate-400 font-medium">Copy raw script without variable replacement.</p>
              </div>
              <button
                onClick={handleCopyRaw}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                  copied
                    ? 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {copied ? 'Copied' : 'Copy Raw'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Share Tray Popup Overlay */}
      
      <AnimatePresence>
        {showShare && (
          <ShareModal prompt={prompt} onClose={() => setShowShare(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
