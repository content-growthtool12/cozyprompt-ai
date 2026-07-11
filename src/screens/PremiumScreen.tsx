import React, { useState } from 'react';
import { Icon } from '../components/IconHelper';
import { motion, AnimatePresence } from 'motion/react';

interface PremiumScreenProps {
  isPremium: boolean;
  onUpgrade: (status: boolean) => void;
  onNavigate: (screen: string) => void;
}

export const PremiumScreen: React.FC<PremiumScreenProps> = ({ isPremium, onUpgrade, onNavigate }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePurchase = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onUpgrade(true);
      setPurchaseSuccess(true);
    }, 1500);
  };

  const handleCancelSubscription = () => {
    if (confirm('Cancel your CozyPrompt Premium subscription? You will lose access to Pro-only prompts.')) {
      onUpgrade(false);
    }
  };

  const premiumFeatures = [
    { icon: 'Zap', title: 'Unlock Pro Prompt Library', desc: 'Direct access to advanced multi-modal visual critiques, SOLID refactoring, and business models.' },
    { icon: 'Code', title: 'Unlimited Variable Injection', desc: 'Type custom variables into placeholders and auto-compile without copying limits.' },
    { icon: 'Sparkles', title: 'Ad-Free High Performance', desc: 'Clean, lightning-fast UI with zero visual distractions or interruption tags.' },
    { icon: 'Layers', title: 'Early Access to New Engines', desc: 'Be the first to copy prompts designed for upcoming models (e.g., Sora, Gemini 2.0 Ultra).' }
  ];

  if (purchaseSuccess) {
    return (
      <div className="w-full h-full flex flex-col justify-between bg-slate-950 p-6 text-slate-100 select-none text-center relative overflow-hidden">
        {/* Confetti light gradient effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25)_0%,rgba(59,130,246,0.15)_50%,transparent_80%)] pointer-events-none" />
        
        <div /> {/* Spacer */}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6 z-10"
        >
          {/* Glowing check circle */}
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 p-[2px] shadow-[0_0_40px_rgba(245,158,11,0.4)]">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-400">
              <Icon name="Check" size={32} className="stroke-[3]" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">You are now Cozy PRO!</h2>
            <p className="text-xs text-slate-400 max-w-[240px] mx-auto leading-relaxed">
              Your account has been upgraded successfully. You now have unlimited access to every variable injector, pro library, and high-fidelity output.
            </p>
          </div>
        </motion.div>

        <button
          onClick={() => {
            setPurchaseSuccess(false);
            onNavigate('home');
          }}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-950/30 cursor-pointer hover:scale-[1.01] active:scale-[0.98] transition-transform z-10"
        >
          Let's Explore Pro Prompts
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto pb-24 scrollbar-none select-none relative">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="px-5 pt-6 pb-2.5 flex items-center justify-between z-10">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Icon name="Zap" size={16} />
          </div>
          CozyPrompt Premium
        </h2>
      </div>

      {isPremium ? (
        /* Active Premium Settings view */
        <div className="px-5 py-4 space-y-6 z-10">
          <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-slate-950 border border-amber-400/20 shadow-xl relative overflow-hidden text-center space-y-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 shadow-md">
              <Icon name="Zap" size={18} />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Your Premium Plan is Active</h3>
              <p className="text-[10px] text-emerald-400 flex items-center justify-center gap-1">
                <Icon name="Check" size={12} /> Auto-renewing • Active Account
              </p>
            </div>

            <p className="text-[10px] text-slate-400 leading-normal max-w-[240px] mx-auto">
              You currently enjoy unlimited prompt customizer usage, no unlock tags, and access to all 10 specialized pro prompt vectors.
            </p>
          </div>

          <div className="p-4 bg-slate-900/20 border border-slate-900 rounded-2xl space-y-3.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billing Settings</h4>
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Next Renewal Date</span>
              <span className="font-mono text-slate-400">Aug 06, 2026</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Payment Method</span>
              <span className="flex items-center gap-1 font-mono text-slate-400">
                Google Pay •••• 9811
              </span>
            </div>

            <button
              onClick={handleCancelSubscription}
              className="w-full mt-3 py-2.5 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 text-xs font-bold transition-all cursor-pointer"
            >
              Cancel Premium Subscription
            </button>
          </div>
        </div>
      ) : (
        /* Purchase upgrade view */
        <div className="px-5 py-2 space-y-5 z-10">
          {/* Custom toggle monthly / yearly */}
          <div className="p-1 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingPeriod === 'monthly'
                  ? 'bg-slate-950 text-white shadow-md border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly ($4.99)
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center gap-1.5 cursor-pointer ${
                billingPeriod === 'yearly'
                  ? 'bg-slate-950 text-white shadow-md border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Yearly ($35.99)</span>
              <span className="text-[8px] bg-amber-500/10 border border-amber-500/30 text-amber-400 px-1.5 py-0.5 rounded-md font-bold leading-none">
                Save 40%
              </span>
            </button>
          </div>

          {/* Golden glow banner premium */}
          <div className="rounded-3xl p-5 bg-gradient-to-br from-indigo-950/60 via-slate-900/40 to-slate-950 border border-amber-500/30 shadow-xl relative overflow-hidden">
            {/* Ambient golden dust */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[30px] pointer-events-none" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                COZY PRO ACCESS
              </span>
              <div className="text-right">
                <span className="text-xl font-extrabold text-white">
                  {billingPeriod === 'monthly' ? '$4.99' : '$2.99'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">/mo</span>
                {billingPeriod === 'yearly' && (
                  <p className="text-[9px] text-slate-500 font-semibold italic">billed annually at $35.99</p>
                )}
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-100 mb-4">CozyPrompt Professional</h3>

            {/* Benefit Bullets */}
            <div className="space-y-3.5 mb-6">
              {premiumFeatures.map(feat => (
                <div key={feat.title} className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5 border border-amber-500/20">
                    <Icon name={feat.icon} size={11} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[11px] font-bold text-slate-200">{feat.title}</h4>
                    <p className="text-[10px] text-slate-400 leading-normal">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Upgrade button */}
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-950/30 hover:scale-[1.01] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Icon name="Zap" size={13} />
                  <span>Activate Cozy PRO now</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[9px] text-slate-600 text-center px-4 leading-normal">
            Simulated payment sandbox. Upgrading will enable Pro flags locally on your browser. Your account remains stored in temporary state. No real payment is taken.
          </p>
        </div>
      )}
    </div>
  );
};
