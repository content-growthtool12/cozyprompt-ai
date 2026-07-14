import React, { useState } from 'react';
import { Prompt } from '../types';
import { Icon } from './IconHelper';
import { motion } from 'motion/react';
console.log("ShareModal Loaded");
interface ShareModalProps {
  prompt: Prompt;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ prompt, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

 const shareUrl = `${window.location.origin}/?prompt=${prompt.id}`;

const handleCopyLink = async () => {
  await navigator.clipboard.writeText(shareUrl);
  setCopiedLink(true);
  setTimeout(() => setCopiedLink(false), 2000);
};

 const handleShareTo = (platform: string) => {
  console.log("SHARE CLICK:", platform);
  const text = `Check out this AI prompt: ${prompt.title}`;

  let url = "";

  switch (platform) {
    case "WhatsApp":
  url = `https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`;

   break;

    case "X / Twitter":
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
      break;

    case "LinkedIn":
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      break;

    default:
     setActionMessage("Sharing option not available.");
setTimeout(() => setActionMessage(""), 2500);
return;
  }
console.log("CLICKED:", platform);
 console.log("Sharing:", platform, url);
 
window.open(url, "_blank");
};

  const platforms = [
    { name: 'X / Twitter', icon: 'Share2', color: 'bg-white/5 border-white/10 hover:bg-white/10' },
    { name: 'LinkedIn', icon: 'Briefcase', color: 'bg-blue-600/10 border-blue-500/20 text-blue-400 hover:bg-blue-600/20' },
    { name: 'WhatsApp', icon: 'MessageSquare', color: 'bg-emerald-600/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/20' },
    
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Background click listener to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
  style={{ pointerEvents: "auto" }}
  className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-t-3xl p-6 shadow-2xl z-10"
>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Share Prompt</h4>
            <p className="text-[11px] text-slate-500 truncate max-w-[250px]">{prompt.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <Icon name="X" size={14} />
          </button>
        </div>

        {actionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center text-xs text-purple-400"
          >
            {actionMessage}
          </motion.div>
        )}

        <div className="space-y-4">
          {/* Custom Link Copier */}
          <div className="flex items-center gap-2 p-2 bg-slate-900/60 border border-slate-800 rounded-xl">
            <span className="flex-1 text-[11px] font-mono text-slate-400 truncate px-2 select-all">
             {shareUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                copiedLink
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30'
              }`}
            >
              <Icon name={copiedLink ? 'Check' : 'Copy'} size={12} />
              {copiedLink ? 'Copied' : 'Copy'}
            </button>
          </div>

          
           {/* Platforms Grid */}
<div className="grid grid-cols-2 gap-2.5">
  {platforms.map(platform => (
  <button
    type="button"
    key={platform.name}
    onClick={() => handleShareTo(platform.name)}
    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${platform.color}`}
  >
      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
        <Icon name={platform.icon} size={14} />
      </div>

      <span className="text-xs font-medium text-slate-300">
        {platform.name}
      </span>
    </button>
  ))}
</div>
         

<button
  onClick={onClose}
  className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-900/30 text-xs text-slate-400 hover:text-slate-200 transition-colors"
>
  Cancel
</button>
        </div>
      </motion.div>
    </div>
  );
};