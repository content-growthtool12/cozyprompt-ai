export type Screen =
  | 'splash'
  | 'login'
  | 'home'
  | 'categories'
  | 'prompt-details'
  | 'favorites'
  | 'premium'
  | 'profile';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  likes: number;
  copies: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  variables: string[]; // List of placeholders like ["topic", "tone"]
  isPremium: boolean;
  rating?: number;
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // Lucide icon identifier
  gradient: string; // Tailwind class
  description: string;
  count?: number;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photo: string;

  isPremium: boolean;
  savedPromptsCount: number;
  copiedPromptsCount: number;
  activeDays: number;
}
