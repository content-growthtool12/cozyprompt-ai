import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Icon } from '../components/IconHelper';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center bg-slate-950 p-8 overflow-hidden select-none">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15)_0%,rgba(59,130,246,0.08)_40%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_60%)] pointer-events-none" />

      {/* Decorative starry layout */}
      <div className="absolute top-24 left-10 text-slate-700/40">
        <Icon name="Sparkle" size={12} className="animate-pulse" />
      </div>
      <div className="absolute top-48 right-12 text-slate-700/40 animate-pulse delay-700">
        <Icon name="Sparkle" size={16} />
      </div>
      <div className="absolute bottom-40 left-16 text-slate-700/30 animate-bounce delay-300">
        <Icon name="Sparkles" size={14} />
      </div>

      <div /> {/* Spacer */}

      {/* Animated Logo Container */}
      <div className="flex flex-col items-center gap-6 z-10 text-center">
        <motion.div
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 120, delay: 0.2 }}
          className="relative flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-[1px] shadow-[0_0_50px_rgba(124,58,237,0.3)]"
        >
          {/* Inner card */}
          <div className="w-full h-full bg-slate-950 rounded-[23px] flex items-center justify-center relative overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 pointer-events-none" />
            
            {/* Visual Logo: Cozy Coffee Cup with floating Sparkles */}
            <div className="relative flex flex-col items-center">
              {/* Steaming heat waves */}
              <div className="absolute top-[-26px] flex gap-1 justify-center w-full">
                <motion.div
                  animate={{ y: [-2, -12], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0 }}
                  className="w-1 h-3 rounded-full bg-gradient-to-t from-purple-400 to-transparent blur-[0.5px]"
                />
                <motion.div
                  animate={{ y: [-2, -15], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                  className="w-1.5 h-4.5 rounded-full bg-gradient-to-t from-indigo-300 to-transparent blur-[0.5px]"
                />
                <motion.div
                  animate={{ y: [-2, -10], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
                  className="w-1 h-3 rounded-full bg-gradient-to-t from-blue-400 to-transparent blur-[0.5px]"
                />
              </div>

              {/* The cozy prompt mug icon */}
              <div className="relative flex items-center justify-center text-purple-400">
                <Icon name="MessageSquare" size={44} className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                <div className="absolute text-blue-400">
                  <Icon name="Sparkles" size={18} className="translate-y-[-1px] translate-x-[1px]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* App Branding */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-2.5"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1">
            CozyPrompt <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-[220px] mx-auto leading-relaxed font-medium">
            Your serene sanctuary for hand-crafted AI prompts
          </p>
        </motion.div>
      </div>

      {/* Loading Progress & Manual Skip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full flex flex-col items-center gap-6 z-10"
      >
        {/* Animated Loading Bar */}
        <div className="w-36 h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"
          />
        </div>

        {/* Skip button */}
        <button
          onClick={onFinish}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 hover:text-white transition-all hover:bg-slate-900 active:scale-95"
        >
          <span>Enter Sandbox</span>
          <Icon name="ArrowRight" size={12} />
        </button>
      </motion.div>
    </div>
  );
};
