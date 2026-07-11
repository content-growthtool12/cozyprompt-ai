import React from 'react';
import {
  MessageSquare,
  Sparkles,
  BrainCircuit,
  Image as ImageIcon,
  Video,
  Code,
  Megaphone,
  Briefcase,
  Share2,
  PenTool,
  Heart,
  Copy,
  ChevronRight,
  Search,
  User,
  Star,
  Settings,
  X,
  Check,
  TrendingUp,
  Award,
  Zap,
  LogOut,
  ChevronLeft,
  ArrowRight,
  Sparkle,
  Share,
  Calendar,
  Layers,
  Lock,
  Compass
} from 'lucide-react';

export const IconMap = {
  MessageSquare,
  Sparkles,
  BrainCircuit,
  Image: ImageIcon,
  Video,
  Code,
  Megaphone,
  Briefcase,
  Share2,
  PenTool,
  Heart,
  Copy,
  ChevronRight,
  Search,
  User,
  Star,
  Settings,
  X,
  Check,
  TrendingUp,
  Award,
  Zap,
  LogOut,
  ChevronLeft,
  ArrowRight,
  Sparkle,
  Share,
  Calendar,
  Layers,
  Lock,
  Compass
};

export type IconType = keyof typeof IconMap;

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 20 }) => {
  // Safe lookup with fallback
  const LucideIcon = (IconMap as any)[name] || MessageSquare;
  return <LucideIcon className={className} size={size} />;
};
