import React from 'react';
import { Prompt } from '../types';
import { PROMPTS } from '../data/prompts';
import { Icon } from '../components/IconHelper';
import { PromptCard } from '../components/PromptCard';
import { motion, AnimatePresence } from 'motion/react';

interface FavoritesScreenProps {
  favorites: string[];
  onNavigate: (screen: string, extraData?: any) => void;
  onToggleFavorite: (promptId: string, e: React.MouseEvent) => void;
  onCopy: (promptId: string, text: string, e: React.MouseEvent) => void;
  isPremium: boolean;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favorites,
  onNavigate,
  onToggleFavorite,
  onCopy,
  isPremium
}) => {
  // Filter prompts to show only favorited ones
  const favoritedPrompts = PROMPTS.filter(p => favorites.includes(p.id));

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto pb-24 scrollbar-none select-none">
      {/* Page Header */}
      <div className="px-5 pt-6 pb-4 flex flex-col gap-1">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-rose-500/10 text-rose-400">
            <Icon name="Heart" size={16} className="fill-rose-500 text-rose-500" />
          </div>
          Saved Favorites
        </h2>
        <p className="text-[11px] text-slate-400">
          Your curated folder of hand-picked instructions ({favoritedPrompts.length} saved).
        </p>
      </div>

      {/* Main Content Area */}
      <div className="px-5 py-2">
        <AnimatePresence mode="popLayout">
          {favoritedPrompts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-4"
            >
              {favoritedPrompts.map(prompt => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  isFavorited={true}
                  onSelect={(id) => onNavigate('prompt-details', { promptId: id })}
                  onToggleFavorite={onToggleFavorite}
                  onCopy={onCopy}
                  isUserPremium={isPremium}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-4 bg-slate-900/10 border border-slate-900/40 rounded-3xl p-6"
            >
              <div className="relative w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400">
                <Icon name="Heart" size={24} className="animate-pulse" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-purple-500 rounded-full blur-[2px]" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-slate-300">Your favorite folder is empty</p>
                <p className="text-[10px] text-slate-500 max-w-[220px] leading-relaxed mx-auto">
                  When browsing prompts, tap the heart button to save them in this high-utility workspace.
                </p>
              </div>

              <button
                onClick={() => onNavigate('categories')}
                className="mt-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md hover:from-purple-500 transition-all cursor-pointer active:scale-95"
              >
                Start Exploring
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
