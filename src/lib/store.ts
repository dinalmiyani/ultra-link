import { User } from "@/types";
import { create } from "zustand";

interface AppStore {
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Current user (will come from auth later)
  currentUser: User | null;
  setCurrentUser: (user: User) => void;

  // Presence — who else is on this page
  presentUsers: User[];
  setPresentUsers: (users: User[]) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  presentUsers: [],
  setPresentUsers: (user) => set({ presentUsers: user }),
}))