import React, { useState } from 'react';
import { Icon } from '../components/IconHelper';
import { motion } from 'motion/react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
interface ProfileScreenProps {
  userName: string;
  userEmail: string;
  isPremium: boolean;
  favoritesCount: number;
  copiedCount: number;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName,
  userEmail,
  isPremium,
  favoritesCount,
  copiedCount,
  onLogout,
  onNavigate,
  theme = 'dark',
  onToggleTheme
}) => {
  const [cacheMessage, setCacheMessage] = useState('');

  const handleClearCache = () => {
    setCacheMessage('Clearing sandbox logs...');
    setTimeout(() => {
      setCacheMessage('Sandbox memory cleared successfully!');
      setTimeout(() => setCacheMessage(''), 2500);
    }, 1200);
  };

  const statItems = [
    { label: 'Saved Prompts', value: favoritesCount, icon: 'Heart', color: 'text-rose-400' },
    { label: 'Prompt Copies', value: copiedCount, icon: 'Copy', color: 'text-purple-400' },
    { label: 'Active Days', value: 3, icon: 'Calendar', color: 'text-blue-400' }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto pb-24 scrollbar-none select-none">
      {/* Page Header */}
      <div className="px-5 pt-6 pb-2.5 flex items-center justify-between">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Icon name="User" size={16} />
          </div>
          My Profile
        </h2>
      </div>

      {/* User Card */}
      <div className="px-5 py-4">
        <div className="rounded-3xl p-5 bg-gradient-to-br from-slate-900/60 to-slate-950 border border-slate-900/80 shadow-md relative overflow-hidden flex items-center gap-4">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 rounded-full blur-xl pointer-events-none" />

          {/* User Profile Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 p-[1.5px] shadow-lg shadow-indigo-950/20">
            <div className="w-full h-full rounded-[13px] bg-slate-950 flex items-center justify-center font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              {userName.substring(0, 2).toUpperCase()}
            </div>
          </div>

          <div className="space-y-0.5 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm font-extrabold text-white truncate max-w-[120px]">{userName}</h3>
              {isPremium ? (
                <span className="text-[9px] font-black px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 rounded-full border border-yellow-400/20 shadow-md flex items-center gap-0.5 leading-none">
                  <Icon name="Zap" size={8} /> Pro
                </span>
              ) : (
                <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded-full leading-none">
                  Free Account
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {statItems.map(stat => (
            <div key={stat.label} className="p-3 bg-slate-900/40 border border-slate-900 rounded-2xl text-center space-y-1">
              <div className={`mx-auto w-7 h-7 rounded-lg bg-slate-950/80 border border-slate-800/60 flex items-center justify-center ${stat.color}`}>
                <Icon name={stat.icon} size={11} />
              </div>
              <p className="text-sm font-black text-white">{stat.value}</p>
              <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Upgrade CTA Panel */}
      {!isPremium && (
        <div className="px-5 pb-4">
          <motion.div
            whileHover={{ y: -1 }}
            onClick={() => onNavigate('premium')}
            className="rounded-2xl p-4 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-purple-500/20 shadow-lg relative overflow-hidden flex items-center justify-between gap-4 cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-start gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mt-0.5">
                <Icon name="Zap" size={14} className="animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold text-white">Upgrade to Premium</h4>
                <p className="text-[10px] text-slate-400 leading-normal line-clamp-1">
                  Access Socratic, Coding & Business models.
                </p>
              </div>
            </div>
            <Icon name="ChevronRight" size={14} className="text-slate-400 flex-shrink-0" />
          </motion.div>
        </div>
      )}

      {/* Settings Panel */}
      <div className="px-5 pb-4 space-y-3">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
          App Settings
        </h4>

        {cacheMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-xs text-emerald-400"
          >
            {cacheMessage}
          </motion.div>
        )}

        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl overflow-hidden divide-y divide-slate-900/60">
          {/* Active theme label */}
          <button
            onClick={onToggleTheme}
            className="w-full flex items-center justify-between p-3.5 text-xs text-left cursor-pointer hover:bg-slate-900/20 transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-300">
              <Icon name="Sparkles" size={13} className="text-purple-400" />
              <span>Theme Canvas</span>
            </div>
            <span className="text-[10px] font-bold text-purple-400 font-mono bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md capitalize">
              {theme === 'light' ? 'Cozy Light' : 'Cosmic Velvet Dark'}
            </span>
          </button>

          {/* Clear sandbox button */}
          <button
            onClick={handleClearCache}
            className="w-full flex items-center justify-between p-3.5 text-xs text-left cursor-pointer hover:bg-slate-900/20 transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-300">
              <Icon name="Settings" size={13} className="text-blue-400" />
              <span>Clear Cache & Logs</span>
            </div>
            <Icon name="ChevronRight" size={12} className="text-slate-600" />
          </button>

          {/* Share CozyPrompt info */}
          <button
            onClick={() => alert('Simulated Share: CozyPrompt AI URL is copied to clipboard!')}
            className="w-full flex items-center justify-between p-3.5 text-xs text-left cursor-pointer hover:bg-slate-900/20 transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-300">
              <Icon name="Share2" size={13} className="text-pink-400" />
              <span>Share CozyPrompt App</span>
            </div>
            <Icon name="ChevronRight" size={12} className="text-slate-600" />
          </button>

          {/* App Version */}
          <div className="flex items-center justify-between p-3.5 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <Icon name="Award" size={13} />
              <span>Build Version</span>
            </div>
            <span className="font-mono text-[10px]">v1.1.2-Beta</span>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="px-5">
        <button
          onClick={onLogout}
          className="w-full py-3.5 px-4 rounded-xl border border-rose-500/25 bg-rose-500/5 text-rose-400 font-extrabold text-xs flex items-center justify-center gap-2 transition-all hover:bg-rose-500/10 active:scale-[0.98] cursor-pointer"
        >
          <Icon name="LogOut" size={13} />
          <span>Switch Account (Sign Out)</span>
        </button>
      </div>
    </div>
  );
};
