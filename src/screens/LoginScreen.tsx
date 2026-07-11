import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Icon } from '../components/IconHelper';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
interface LoginScreenProps {
  onLogin: (
  uid: string,
  userName: string,
  email: string,
  photo: string
) => void;
  userEmail: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, userEmail }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
  setLoading('google');

  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;

    const name = user.displayName || "Cozy User";
    const email = user.email || "";
await setDoc(doc(db, "users", user.uid), {
  name: name,
  email: email,
  photo: user.photoURL || "",
  createdAt: serverTimestamp()
});
    onLogin(
  user.uid,
  name,
  email,
  user.photoURL || ""
);

  } catch (error) {
    console.error("Google login failed:", error);
  } finally {
    setLoading(null);
  }
};
const handleGuestSignIn = () => {
  setLoading("guest");

  setTimeout(() => {
    onLogin(
      "guest",
      "Cozy Companion",
      "guest@cozyprompt.ai",
      ""
    );
  }, 800);
};
  const features = [
    { icon: 'Sparkles', title: 'Curated Excellence', desc: 'Expert prompts for ChatGPT, Claude, and Gemini.' },
    { icon: 'Code', title: 'Variable Injector', desc: 'Type custom tags and compile prompts in real-time.' },
    { icon: 'Heart', title: 'Saves & Favorites', desc: 'Keep your best-performing instructions close at hand.' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-950 p-6 overflow-hidden">
      {/* Background Orbits */}
      <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-purple-600/10 blur-[40px] pointer-events-none" />
      <div className="absolute bottom-[40px] left-[-40px] w-64 h-64 rounded-full bg-blue-600/10 blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mt-4 z-10">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
          <Icon name="MessageSquare" size={16} className="text-white" />
        </div>
        <span className="text-xs font-bold text-white tracking-wide uppercase">CozyPrompt AI</span>
      </div>

      {/* Onboarding Graphic / Feature Cards */}
      <div className="my-auto py-4 z-10 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Unlock the power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Structured AI</span>
          </h2>
          <p className="text-xs text-slate-400">
            A beautiful workspace where engineering meets comfort.
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-3">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx + 0.3 }}
              className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all"
            >
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-purple-400 shadow-md">
                <Icon name={feat.icon} size={15} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-slate-200">{feat.title}</h4>
                <p className="text-[10px] text-slate-400 leading-normal">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Auth Controls */}
      <div className="space-y-3 mb-6 z-10">
        <div className="text-[10px] text-center text-slate-500 font-medium">
          Choose an access style below to begin exploring
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading !== null}
          className="relative w-full py-3.5 px-4 rounded-xl bg-white text-slate-900 font-semibold text-xs flex items-center justify-center gap-3 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-80 shadow-lg shadow-white/5 cursor-pointer"
        >
          {loading === 'google' ? (
            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {/* Clean Vector Google G Graphic */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.14 3.01-3.3 3.01l3.2 2.48c1.87-1.73 2.95-4.27 2.95-7.34z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.2-2.48c-.9.6-2.05.97-3.33.97-3.11 0-5.74-2.11-6.68-4.96l-3.32 2.58C5.35 21.05 8.41 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.32 14.62c-.24-.73-.38-1.5-.38-2.3a8.1 8.1 0 0 1 .38-2.29L2 7.45C1.1 9.27.5 11.36.5 13.5c0 2.14.6 4.23 1.5 6.05l3.32-2.93z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24.5 12 .5c-3.59 0-6.65 2.95-8.58 6.95l3.32 2.58C7.68 7.15 10.3 4.75 12 4.75z"
                />
              </svg>
              <span>Continue with {userEmail ? 'Google' : 'Google Account'}</span>
            </>
          )}
        </button>

        {/* Guest Mode */}
        <button
          onClick={handleGuestSignIn
          
          }
          
          disabled={loading !== null}
          className="w-full py-3.5 px-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:bg-slate-900 hover:text-white active:scale-[0.98] disabled:opacity-80 cursor-pointer"
        >
          {loading === 'guest' ? (
            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Icon name="User" size={13} className="text-slate-400" />
              <span>Explore as Guest</span>
            </>
          )}
        </button>

        {/* Footer legal simulation */}
        <p className="text-[10px] text-slate-600 text-center leading-normal px-4 pt-2">
          By continuing, you agree to CozyPrompt's simulated Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
