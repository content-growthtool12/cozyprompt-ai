import React from 'react';
import { Icon } from './IconHelper';
import { motion } from 'motion/react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, favoritesCount }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'Compass' },
    { id: 'categories', label: 'Categories', icon: 'Layers' },
    { id: 'favorites', label: 'Saved', icon: 'Heart', badge: true },
    { id: 'profile', label: 'Profile', icon: 'User' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-950/80 backdrop-blur-xl border-t border-slate-900/40 px-6 flex items-center justify-around z-40">
      {navItems.map(item => {
        const isActive = currentScreen === item.id || 
          (item.id === 'categories' && currentScreen === 'categories') ||
          (item.id === 'home' && currentScreen === 'prompt-details');

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="relative flex flex-col items-center justify-center py-2 px-3 text-center cursor-pointer transition-all active:scale-95 group"
            aria-label={item.label}
          >
            {/* Active Pill Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-purple-500/10 rounded-2xl -z-10 border border-purple-500/15"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            <div className={`relative transition-colors ${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
              <Icon name={item.icon} size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-[2]'} />
              
              {/* Star Badge for Saved */}
              {item.badge && favoritesCount > 0 && (
                <span className="absolute top-[-4px] right-[-4px] min-w-[14px] h-[14px] px-1 bg-rose-500 rounded-full text-[8px] font-black text-white flex items-center justify-center shadow-md">
                  {favoritesCount}
                </span>
              )}
            </div>

            <span className={`text-[9px] font-extrabold tracking-wide mt-1 transition-colors ${
              isActive ? 'text-purple-300' : 'text-slate-500 group-hover:text-slate-400'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
