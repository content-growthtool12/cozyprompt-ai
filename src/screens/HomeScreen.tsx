import React, { useState } from 'react';
import { Prompt, Category } from '../types';
import { PROMPTS, CATEGORIES } from '../data/prompts';
import { Icon } from '../components/IconHelper';
import { PromptCard } from '../components/PromptCard';
import { motion, AnimatePresence } from 'motion/react';

interface HomeScreenProps {
  userName: string;
  isPremium: boolean;
  onNavigate: (screen: string, extraData?: any) => void;
  favorites: string[];
  onToggleFavorite: (promptId: string, e: React.MouseEvent) => void;
  onCopy: (promptId: string, text: string, e: React.MouseEvent) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName,
  isPremium,
  onNavigate,
  favorites,
  onToggleFavorite,
  onCopy
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Filter prompts for search suggestions
  const filteredSearchPrompts = searchQuery.trim() === ''
    ? []
    : PROMPTS.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Pick a high-quality prompt for Featured Section
  const featuredPrompt = PROMPTS.find(p => p.id === 'img-midjourney-cinematic') || PROMPTS[0];

  // Pick top 3 trending prompts based on copies/likes
  const trendingPrompts = [...PROMPTS]
    .sort((a, b) => b.copies - a.copies)
    .slice(0, 4);

  // Quick action tags
  const searchTags = ['Cinematic', 'Socratic', 'Boilerplate', 'Refactor'];

  const getCategoryCount = (catId: string) => {
    return PROMPTS.filter(p => p.category === catId).length;
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto pb-24 scrollbar-none select-none">
      {/* Top Welcome Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
              SANDBOX VERSION 1.1
            </span>
            {isPremium && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold border border-yellow-400/20">
                PRO
              </span>
            )}
          </div>
          <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-1.5">
            Hello, {userName} <span className="animate-bounce inline-block">👋</span>
          </h3>
        </div>

        {/* Mini avatar linked to Profile Screen */}
        <button
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 p-[1.5px] cursor-pointer shadow-md shadow-indigo-950/20 active:scale-95 transition-transform"
        >
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              {userName.substring(0, 2).toUpperCase()}
            </span>
          </div>
        </button>
      </div>

      {/* Interactive Search Section */}
      <div className="px-5 pb-4 relative z-20">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Icon name="Search" size={14} />
          </div>
          <input
            type="text"
            placeholder="Search ChatGPT, Midjourney prompts..."
            value={searchQuery}
            onFocus={() => setIsSearching(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-10 py-3.5 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/10 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearching(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Icon name="X" size={14} />
            </button>
          )}
        </div>

        {/* Real-time Search Overlay */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-5 right-5 top-15 max-h-72 overflow-y-auto bg-slate-950 border border-slate-800/80 rounded-2xl shadow-2xl p-3 z-50 space-y-2 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold px-2 pb-1 border-b border-slate-900">
                <span>SUGGESTED RESULTS ({filteredSearchPrompts.length})</span>
                <button
                  onClick={() => setIsSearching(false)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Close
                </button>
              </div>

              {searchQuery.trim() === '' ? (
                <div className="space-y-2.5 p-2">
                  <p className="text-[10px] text-slate-400">Popular hot keys:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {searchTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-purple-500/30 transition-all cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredSearchPrompts.length > 0 ? (
                <div className="space-y-1">
                  {filteredSearchPrompts.map(prompt => (
                    <button
                      key={prompt.id}
                      onClick={() => {
                        setIsSearching(false);
                        onNavigate('prompt-details', { promptId: prompt.id });
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-900 transition-colors cursor-pointer group"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-purple-400 transition-colors truncate">
                          {prompt.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {prompt.description}
                        </p>
                      </div>
                      <Icon name="ChevronRight" size={12} className="text-slate-600 group-hover:text-purple-400 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500 font-medium">
                  No matching cozy prompts found. Try "cinematic".
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Featured Prompt Showcase Card */}
      <div className="px-5 pb-6">
        <div className="flex items-center gap-1.5 mb-3">
          <Icon name="Award" size={14} className="text-amber-400 animate-pulse" />
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Featured Masterpiece
          </h4>
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => onNavigate('prompt-details', { promptId: featuredPrompt.id })}
          className="relative rounded-3xl p-5 bg-gradient-to-br from-indigo-950/60 via-slate-900/40 to-slate-950 border border-purple-500/20 shadow-xl cursor-pointer overflow-hidden group"
        >
          {/* Neon background decorations */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/15 rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-[30px] pointer-events-none" />

          <div className="flex items-center justify-between mb-3 z-10">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-950/30">
              WEEKLY FEATURED
            </span>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                <Icon name="Star" size={10} className="fill-amber-400" />
                4.9
              </span>
              <span>•</span>
              <span>{featuredPrompt.copies} copies</span>
            </div>
          </div>

          <h3 className="text-base font-extrabold text-white group-hover:text-purple-300 transition-colors mb-2 z-10">
            {featuredPrompt.title}
          </h3>
          <p className="text-xs text-slate-300 leading-normal mb-5 z-10 line-clamp-2">
            {featuredPrompt.description}
          </p>

          <div className="flex items-center justify-between border-t border-slate-800/40 pt-4 z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20 font-bold uppercase">
                {featuredPrompt.difficulty}
              </span>
              <span className="text-[10px] text-slate-500">By {featuredPrompt.author}</span>
            </div>

            <span className="text-xs text-purple-400 font-bold group-hover:translate-x-1 transition-all flex items-center gap-1">
              Customize
              <Icon name="ArrowRight" size={12} />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Trending Prompts (Horizontal Scroll) */}
      <div className="pb-6">
        <div className="px-5 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Icon name="TrendingUp" size={14} className="text-pink-400" />
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Trending Collections
            </h4>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
          >
            See All
          </button>
        </div>

        {/* Horizontal Card Scroll container */}
        <div className="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-none snap-x snap-mandatory">
          {trendingPrompts.map((prompt, idx) => (
            <div key={prompt.id} className="min-w-[260px] max-w-[260px] snap-start">
              <div className="relative">
                {/* Ranking tag */}
                <div className="absolute top-2.5 left-2.5 z-20 w-5 h-5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-200 font-black text-[10px] flex items-center justify-center shadow-lg">
                  #{idx + 1}
                </div>
                <PromptCard
                  prompt={prompt}
                  isFavorited={favorites.includes(prompt.id)}
                  onSelect={(id) => onNavigate('prompt-details', { promptId: id })}
                  onToggleFavorite={onToggleFavorite}
                  onCopy={onCopy}
                  isUserPremium={isPremium}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid (Grid of 10) */}
      <div className="px-5">
        <div className="mb-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Icon name="Layers" size={14} className="text-blue-400" />
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Browse Categories
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((category) => {
            const count = getCategoryCount(category.id);
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('categories', { selectedCategoryId: category.id })}
                className={`flex flex-col items-start p-4 bg-gradient-to-br ${category.gradient} border rounded-2xl text-left transition-all relative overflow-hidden group cursor-pointer`}
              >
                {/* Overlay card reflection */}
                <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />

                <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/40 mb-3 text-current group-hover:scale-105 transition-transform shadow-sm">
                  <Icon name={category.iconName} size={15} />
                </div>

                <h4 className="font-semibold text-xs text-white group-hover:text-purple-200 transition-colors mb-0.5">
                  {category.name}
                </h4>
                <p className="text-[9px] text-slate-400 font-mono">
                  {count} hand-picked prompts
                </p>

                {/* Micro chevron overlay */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                  <Icon name="ChevronRight" size={12} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
