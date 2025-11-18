import { create } from 'zustand';
import { UserProfile } from '../types';
import { calculateLevel } from '../gamification';

export interface LifeState {
  user: UserProfile | null;
  xp: number;
  level: number;
  loading: boolean;
  error: string | null;

  setUser: (user: UserProfile | null) => void;
  addXP: (amount: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchUserData: () => Promise<void>;
  resetStore: () => void;
}

export const useLifeStore = create<LifeState>((set, get) => ({
  user: null,
  xp: 0,
  level: 1,
  loading: false,
  error: null,

  setUser: (user: UserProfile | null) => {
    set({
      user,
      xp: user?.xp_total ?? 0,
      level: user?.current_level ?? 1,
    });
  },

  addXP: (amount: number) => {
    const state = get();
    const newXp = state.xp + amount;
    const newLevel = calculateLevel(newXp);
    const leveledUp = newLevel > state.level;

    set({
      xp: newXp,
      level: newLevel,
    });

    if (leveledUp) {
      const event = new CustomEvent('levelUp', { detail: { level: newLevel } });
      window.dispatchEvent(event);
    }
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  fetchUserData: async () => {
    set({ loading: true, error: null });
    try {
      // This will be implemented by the app-level store initialization
      // For now, this is a placeholder that should be overridden
      set({ loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch user data';
      set({ error: message, loading: false });
    }
  },

  resetStore: () => {
    set({
      user: null,
      xp: 0,
      level: 1,
      loading: false,
      error: null,
    });
  },
}));
