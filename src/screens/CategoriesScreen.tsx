import React, { useState, useEffect } from 'react';
import { Prompt, Category } from '../types';
import { PROMPTS, CATEGORIES } from '../data/prompts';
import { Icon } from '../components/IconHelper';
import { PromptCard } from '../components/PromptCard';
import { motion, AnimatePresence } from 'motion/react';

interface CategoriesScreenProps {
  initialCategoryId?: string | null;
  onNavigate: (screen: string, extraData?: any) => void;
  favorites: string[];
  onToggleFavorite: (promptId: string, e: React.MouseEvent) => void;
  onCopy: (promptId: string, text: string, e: React.MouseEvent) => void;
  isPremium: boolean;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  initialCategoryId,
  onNavigate,
  favorites,
  onToggleFavorite,
  onCopy,
  isPremium
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>(CATEGORIES[0].id);
  const [innerSearch, setInnerSearch] = useState('');

  // Sync state if navigation passed an initial category id
  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCatId(initialCategoryId);
    }
  }, [initialCategoryId]);

  const activeCategory = CATEGORIES.find(c => c.id === selectedCatId) || CATEGORIES[0];

  // Prompts belonging to active category, optionally filtered by inner search
  const filteredPrompts = PROMPTS.filter(p => {
    const matchesCategory = p.category === selectedCatId;
    const matchesSearch = innerSearch.trim() === ''
      ? true
      : p.title.toLowerCase().includes(innerSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(innerSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto pb-24 scrollbar-none select-none">
      {/* Page Header */}
      <div className="px-5 pt-6 pb-2.5 flex flex-col gap-1">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Icon name="Compass" size={18} />
          </div>
          Explore Library
        </h2>
        <p className="text-[11px] text-slate-400">
          Vetted prompts configured by AI engineers.
        </p>
      </div>

      {/* Horizontal Category Capsule Selector */}
      <div className="px-5 py-3 flex gap-2 overflow-x-auto scrollbar-none z-10">
        {CATEGORIES.map(category => {
          const isActive = category.id === selectedCatId;
          return (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCatId(category.id);
                setInnerSearch('');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500/30 shadow-lg shadow-purple-950/20 scale-[1.03]'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700/60'
              }`}
            >
              <Icon name={category.iconName} size={12} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Category Description Banner */}
      <div className="mx-5 my-2.5 p-4 bg-slate-900/30 border border-slate-900 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 rounded-full blur-xl pointer-events-none" />
        <h3 className="text-xs font-bold text-purple-300 mb-1 flex items-center gap-1.5">
          <Icon name={activeCategory.iconName} size={11} />
          About {activeCategory.name}
        </h3>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
          {activeCategory.description}
        </p>
      </div>

      {/* Mini Inner Search Bar */}
      <div className="px-5 py-2.5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Icon name="Search" size={12} />
          </div>
          <input
            type="text"
            placeholder={`Filter ${activeCategory.name} prompts...`}
            value={innerSearch}
            onChange={(e) => setInnerSearch(e.target.value)}
            className="w-full text-xs pl-8.5 pr-8 py-2.5 bg-slate-900/40 border border-slate-900 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/20 focus:ring-1 focus:ring-purple-500/5"
          />
          {innerSearch && (
            <button
              onClick={() => setInnerSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
            >
              <Icon name="X" size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="px-5 py-2">
        <AnimatePresence mode="popLayout">
          {filteredPrompts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-4"
            >
              {filteredPrompts.map(prompt => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  isFavorited={favorites.includes(prompt.id)}
                  onSelect={(id) => onNavigate('prompt-details', { promptId: id })}
                  onToggleFavorite={onToggleFavorite}
                  onCopy={onCopy}
                  isUserPremium={isPremium}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3.5"
            >
              <div className="p-3.5 rounded-full bg-slate-900/60 border border-slate-800 text-slate-600">
                <Icon name="Sparkles" size={24} />
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-400">No cozy prompts found</p>
                <p className="text-[10px] text-slate-500 max-w-[200px] leading-relaxed mx-auto">
                  Try clearing your search keyword or checking other categories.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
