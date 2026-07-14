import React, { useState, useEffect } from 'react';
import { Screen, UserProfile } from './types';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { PromptDetailsScreen } from './screens/PromptDetailsScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { PremiumScreen } from './screens/PremiumScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { Icon } from './components/IconHelper';
import { motion, AnimatePresence } from 'motion/react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./firebase";

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>([]);

  // Detailed Selectors
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // User State - Persisted via localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('cozy_isLoggedIn') === 'true';
  });
  const [user, setUser] = useState(() => {
  const saved = localStorage.getItem('cozy_user');

  return saved
    ? JSON.parse(saved)
    : {
        uid: "guest",
        name: "Guest User",
        email: "guest@cozyprompt.ai",
        photo: ""
      };
});
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem('cozy_isPremium') === 'true';
  });

  // Seed with 2 pre-favorited prompts, persisted via localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('cozy_favorites');
    return saved ? JSON.parse(saved) : ['chatgpt-socratic', 'img-midjourney-cinematic'];
  });
  const [copiedCount, setCopiedCount] = useState<number>(() => {
    const saved = localStorage.getItem('cozy_copiedCount');
    return saved ? parseInt(saved, 10) : 12;
  });
useEffect(() => {
  localStorage.setItem(
    "cozy_favorites",
    JSON.stringify(favorites)
  );
}, [favorites]);
  // Active Theme Setting - dark or light
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('cozy_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Presentation Settings (Mockup Device vs Responsive Fullscreen)
  const [viewMode, setViewMode] = useState<'mockup' | 'fullscreen'>('mockup');

  // Live status bar time simulation
  const [currentTime, setCurrentTime] = useState('11:04 PM');
useEffect(() => {
  if (!isLoggedIn) return;

  const promptId = new URLSearchParams(window.location.search).get("prompt");

  if (promptId) {
    setSelectedPromptId(promptId);
    setCurrentScreen("prompt-details");
  }
}, [isLoggedIn]);
  // Effects to synchronize states to LocalStorage
  useEffect(() => {
    localStorage.setItem('cozy_isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('cozy_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cozy_isPremium', String(isPremium));
  }, [isPremium]);

  useEffect(() => {
    localStorage.setItem('cozy_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cozy_copiedCount', String(copiedCount));
  }, [copiedCount]);

  useEffect(() => {
    localStorage.setItem('cozy_theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  // Global callbacks
  const handleLogin = (
  uid: string,
  name: string,
  email: string,
  photo: string
) => {
  setUser({
    uid,
    name,
    email,
    photo,
    isPremium: false,
    savedPromptsCount: favorites.length,
    copiedPromptsCount: copiedCount,
    activeDays: 0,
  });

  localStorage.setItem(
    "cozy_user",
    JSON.stringify({
      uid,
      name,
      email,
      photo,
      isPremium: false,
      savedPromptsCount: favorites.length,
      copiedPromptsCount: copiedCount,
      activeDays: 0,
    })
  );

  localStorage.setItem("cozy_isLoggedIn", "true");

  setIsLoggedIn(true);

const promptId = new URLSearchParams(window.location.search).get("prompt");

if (promptId) {
  navigateTo("prompt-details", { promptId });
} else {
  navigateTo("home");
}
};


const handleLogout = () => {
  setIsLoggedIn(false);

  localStorage.removeItem("cozy_user");
  localStorage.removeItem("cozy_isLoggedIn");

  setUser({
    name: "Guest User",
    email: "guest@cozyprompt.ai"
  });

  setFavorites(['chatgpt-socratic', 'img-midjourney-cinematic']);
  setIsPremium(false);
  setNavigationHistory([]);
  setCurrentScreen('login');
};  
const saveFavoritesToFirestore = async (favoritesList: string[]) => {
  console.log("User:", user);
  console.log("UID:", user?.uid);
  console.log("Favorites:", favoritesList);

  if (!user?.uid || user.uid === "guest") {
    console.log("No valid user found");
    return;
  }

  try {
    await setDoc(
      doc(db, "users", user.uid),
      {
        favorites: favoritesList,
      },
      { merge: true }
    );

    console.log("Favorites saved successfully!");
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
};
  const navigateTo = (screen: string, extraData?: any) => {
    setNavigationHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen as Screen);

    if (extraData) {
      if (extraData.promptId !== undefined) {
        setSelectedPromptId(extraData.promptId);
      }
      if (extraData.selectedCategoryId !== undefined) {
        setSelectedCategoryId(extraData.selectedCategoryId);
      }
    } else {
      // Clear secondary selectors on generic tab switches to prevent leakage
      if (screen !== 'prompt-details') {
        setSelectedPromptId(null);
      }
      if (screen !== 'categories') {
        setSelectedCategoryId(null);
      }
    }
  };

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const prev = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prevStack => prevStack.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('home');
    }
  };

  const handleToggleFavorite = async (
  promptId: string,
  e: React.MouseEvent
) => {
  e.stopPropagation();

  const updatedFavorites = favorites.includes(promptId)
    ? favorites.filter(id => id !== promptId)
    : [...favorites, promptId];

  setFavorites(updatedFavorites);

  await saveFavoritesToFirestore(updatedFavorites);
};

  const handleCopyCount = (promptId: string, text: string, e: React.MouseEvent) => {
    setCopiedCount(prev => prev + 1);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Render sub-screens
  const renderScreen = () => {
    // If not logged in, force onboarding splash / login screens
    if (!isLoggedIn) {
      if (currentScreen === 'splash') {
        return <SplashScreen onFinish={() => setCurrentScreen('login')} />;
      }
      return <LoginScreen onLogin={handleLogin} userEmail="mounika76622@gmail.com" />;
    }

    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={() => navigateTo('home')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} userEmail="mounika76622@gmail.com" />;
      case 'home':
        return (
          <HomeScreen
            userName={user.name}
            isPremium={isPremium}
            onNavigate={navigateTo}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onCopy={handleCopyCount}
          />
        );
      case 'categories':
        return (
          <CategoriesScreen
            initialCategoryId={selectedCategoryId}
            onNavigate={navigateTo}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onCopy={handleCopyCount}
            isPremium={isPremium}
          />
        );
      case 'prompt-details':
        return (
          <PromptDetailsScreen
            promptId={selectedPromptId || ''}
            onBack={goBack}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onCopy={handleCopyCount}
            isPremium={isPremium}
            onNavigate={navigateTo}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            favorites={favorites}
            onNavigate={navigateTo}
            onToggleFavorite={handleToggleFavorite}
            onCopy={handleCopyCount}
            isPremium={isPremium}
          />
        );
      case 'premium':
        return (
          <PremiumScreen
            isPremium={isPremium}
            onUpgrade={setIsPremium}
            onNavigate={navigateTo}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            userName={user.name}
            userEmail={user.email}
            isPremium={isPremium}
            favoritesCount={favorites.length}
            copiedCount={copiedCount}
            onLogout={handleLogout}
            onNavigate={navigateTo}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );
      default:
        return <HomeScreen userName={user.name} isPremium={isPremium} onNavigate={navigateTo} favorites={favorites} onToggleFavorite={handleToggleFavorite} onCopy={handleCopyCount} />;
    }
  };

  // Show navigation bar only for logged in sessions, excluding splash/login/details view (for native app feel)
  const showNav = isLoggedIn && currentScreen !== 'splash' && currentScreen !== 'login' && currentScreen !== 'prompt-details';

  return (
    <div className={`w-full min-h-screen font-sans flex flex-col lg:flex-row items-center justify-center p-0 md:p-6 lg:p-12 transition-colors duration-300 overflow-hidden relative selection:bg-purple-500/30 selection:text-white ${
      theme === 'light' ? 'theme-light bg-stone-100 text-stone-900' : 'theme-dark bg-slate-950 text-slate-100'
    }`}>
      {/* Dynamic atmospheric ambient backdrop */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06)_0%,transparent_60%)] pointer-events-none" />
        </>
      )}

      {/* Left side deck info bar (only visible on large screens) */}
      <div className={`hidden lg:flex flex-col max-w-sm w-full gap-5 pr-8 select-none ${
        theme === 'light' ? 'text-stone-600' : 'text-slate-400'
      }`}>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Icon name="Sparkle" size={16} />
            </div>
            <h1 className={`text-xl font-black tracking-tight ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>CozyPrompt AI</h1>
          </div>
          <p className="text-xs leading-relaxed">
            A premium mobile-first workspace demonstrating dynamic tags customizer, saved lists, 500 prompts engine, search, and premium model gate filters.
          </p>
        </div>

        {/* Sandbox Admin Dashboard Console */}
        <div className={`p-5 rounded-2xl border space-y-4 ${
          theme === 'light' ? 'bg-white border-stone-200' : 'bg-slate-900/60 border-slate-800/80'
        }`}>
          <h4 className="text-[10px] font-black text-slate-500 tracking-wider uppercase">Sandbox Quick Control</h4>
          
          <div className="space-y-3.5">
            {/* Toggle Premium admin button */}
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold ${theme === 'light' ? 'text-stone-700' : 'text-slate-300'}`}>Cozy Pro State</span>
              <button
                onClick={() => setIsPremium(!isPremium)}
                className={`px-3 py-1.5 rounded-lg font-black text-[10px] transition-all border ${
                  isPremium
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                    : theme === 'light'
                      ? 'bg-stone-100 border-stone-200 text-stone-500 hover:text-stone-800'
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                {isPremium ? 'PRO ACTIVE' : 'UPGRADE ACCOUNT'}
              </button>
            </div>

            {/* Toggle Theme mode admin button */}
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold ${theme === 'light' ? 'text-stone-700' : 'text-slate-300'}`}>Active Canvas Theme</span>
              <button
                onClick={toggleTheme}
                className={`px-3 py-1.5 border rounded-lg font-black text-[10px] uppercase transition-all ${
                  theme === 'light'
                    ? 'bg-purple-500/10 border-purple-500/20 text-purple-600 hover:bg-purple-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {theme === 'light' ? 'Cozy Light' : 'Cosmic Dark'}
              </button>
            </div>

            {/* Toggle View Mode admin button */}
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold ${theme === 'light' ? 'text-stone-700' : 'text-slate-300'}`}>Mockup Frame View</span>
              <button
                onClick={() => setViewMode(viewMode === 'mockup' ? 'fullscreen' : 'mockup')}
                className={`px-3 py-1.5 border rounded-lg font-bold transition-all text-[10px] ${
                  theme === 'light'
                    ? 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {viewMode === 'mockup' ? 'ON (MOCK PHONE)' : 'OFF (FULLSCREEN)'}
              </button>
            </div>

            <div className={`border-t pt-3 flex flex-col gap-1.5 text-[10px] text-slate-500 ${
              theme === 'light' ? 'border-stone-200' : 'border-slate-800/40'
            }`}>
              <div className="flex justify-between">
                <span>Selected Workspace Screen:</span>
                <span className={`font-mono font-bold uppercase ${theme === 'light' ? 'text-stone-800' : 'text-slate-300'}`}>{currentScreen}</span>
              </div>
              <div className="flex justify-between">
                <span>Saves DB Count:</span>
                <span className={`font-mono font-bold ${theme === 'light' ? 'text-stone-800' : 'text-slate-300'}`}>{favorites.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Simulator User:</span>
                <span className={`font-mono font-bold ${theme === 'light' ? 'text-stone-800' : 'text-slate-300'}`}>{isLoggedIn ? user.name : 'Unauthenticated'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Check-off list */}
        <div className={`p-4 rounded-xl text-[10px] space-y-2 border ${
          theme === 'light' ? 'bg-white border-stone-200/60' : 'bg-slate-900/15 border-slate-900/40'
        }`}>
          <h5 className="font-extrabold text-slate-400">Pristine Prototype Coverage:</h5>
          <div className="grid grid-cols-1 gap-1.5 text-slate-500">
            <span className="flex items-center gap-1.5"><Icon name="Check" size={10} className="text-purple-500" /> Splash screen intro animation</span>
            <span className="flex items-center gap-1.5"><Icon name="Check" size={10} className="text-purple-500" /> Custom user Google login & Guest Mode</span>
            <span className="flex items-center gap-1.5"><Icon name="Check" size={10} className="text-purple-500" /> Search results, Featured, Trending, Grids</span>
            <span className="flex items-center gap-1.5"><Icon name="Check" size={10} className="text-purple-500" /> 10 dynamic categories chips & counters</span>
            <span className="flex items-center gap-1.5"><Icon name="Check" size={10} className="text-purple-500" /> Full details workspace with prompt customizer</span>
            <span className="flex items-center gap-1.5"><Icon name="Check" size={10} className="text-purple-500" /> Saved lists, Premium toggles, Profile stats</span>
          </div>
        </div>
      </div>

      {/* Primary Device Viewport Container */}
      <div
        className={`relative transition-all duration-300 ${
          viewMode === 'mockup'
            ? theme === 'light'
              ? 'w-full max-w-[390px] h-[780px] rounded-[50px] border-[12px] border-stone-200 shadow-[0_25px_60px_rgba(0,0,0,0.1)] outline outline-1 outline-stone-300/40 overflow-hidden'
              : 'w-full max-w-[390px] h-[780px] rounded-[50px] border-[12px] border-slate-900/90 shadow-[0_25px_60px_rgba(0,0,0,0.8)] outline outline-1 outline-slate-800/40 overflow-hidden'
            : theme === 'light'
              ? 'w-full max-w-5xl h-screen md:h-[780px] md:rounded-[36px] md:border border-stone-200 shadow-2xl overflow-hidden'
              : 'w-full max-w-5xl h-screen md:h-[780px] md:rounded-[36px] md:border border-slate-800/80 shadow-2xl overflow-hidden'
        } ${theme === 'light' ? 'theme-light bg-stone-50' : 'theme-dark bg-slate-950'} flex flex-col`}
      >
        {/* Dynamic iPhone Status Bar (only shown in phone mockup view mode) */}
        {viewMode === 'mockup' && (
          <div className={`h-11 px-7 flex items-center justify-between text-[11px] font-bold select-none z-40 shrink-0 border-b relative ${
            theme === 'light' ? 'bg-stone-50 border-stone-200 text-stone-900' : 'bg-slate-950 border-slate-950 text-slate-100'
          }`}>
            {/* Clock display */}
            <span>{currentTime}</span>

            {/* Simulated iPhone Camera Island / Notch */}
            <div className="w-24 h-4.5 bg-black rounded-full shadow-inner absolute left-1/2 translate-x-[-50%] top-2" />

            <div className="flex items-center gap-1.5">
              {/* Cellular Signal Strength Icon */}
              <div className="flex gap-0.5 items-end h-2.5">
                <span className={`w-[2px] h-[3px] rounded-2xs ${theme === 'light' ? 'bg-stone-300' : 'bg-slate-400'}`} />
                <span className={`w-[2px] h-[5px] rounded-2xs ${theme === 'light' ? 'bg-stone-300' : 'bg-slate-400'}`} />
                <span className={`w-[2px] h-[7px] rounded-2xs ${theme === 'light' ? 'bg-stone-300' : 'bg-slate-400'}`} />
                <span className={`w-[2px] h-[9px] rounded-2xs ${theme === 'light' ? 'bg-stone-900' : 'bg-white'}`} />
              </div>
              <span className="text-[10px]">5G</span>
              {/* Battery status display */}
              <div className={`w-5.5 h-3 border rounded-[4px] p-[1.5px] flex items-center bg-transparent ${
                theme === 'light' ? 'border-stone-400' : 'border-slate-500'
              }`}>
                <div className={`h-full w-4 rounded-[2px] ${theme === 'light' ? 'bg-stone-900' : 'bg-white'}`} />
                <div className={`w-0.5 h-1 rounded-r-2xs ml-[0.5px] ${
                  theme === 'light' ? 'bg-stone-400' : 'bg-slate-500'
                }`} />
              </div>
            </div>
          </div>
        )}

        {/* Screen Content Window */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Tab Navigation Bar */}
        {showNav && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={navigateTo}
            favoritesCount={favorites.length}
          />
        )}

        {/* Dynamic iOS Home bar (only shown in phone mockup view mode) */}
        {viewMode === 'mockup' && (
          <div className={`absolute bottom-1.5 left-1/2 translate-x-[-50%] w-32 h-1 rounded-full z-50 pointer-events-none ${
            theme === 'light' ? 'bg-stone-300' : 'bg-slate-800'
          }`} />
        )}
      </div>

      {/* Quick responsive bottom toggle for small viewports / mobile reviews */}
      <div className="flex lg:hidden justify-center items-center gap-3.5 mt-5 text-[11px] text-slate-500 z-10 w-full select-none">
        <span>CozyPrompt AI Sandbox Prototype</span>
        <span>•</span>
        <button
          onClick={() => setViewMode(viewMode === 'mockup' ? 'fullscreen' : 'mockup')}
          className="text-purple-500 font-bold hover:text-purple-400 underline cursor-pointer"
        >
          {viewMode === 'mockup' ? 'Fullscreen View' : 'Phone Mockup View'}
        </button>
      </div>
    </div>
  );
}
