import { create } from "zustand";

interface SidebarState {
  isCollapsed: boolean;
  activeItem: string;
  expandedGroups: string[];
  toggleCollapsed: () => void;
  setActiveItem: (item: string) => void;
  toggleGroup: (group: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  activeItem: "dashboard",
  expandedGroups: ["main"],

  toggleCollapsed: () =>
    set((state) => ({ isCollapsed: !state.isCollapsed })),

  setActiveItem: (item: string) =>
    set({ activeItem: item }),

  toggleGroup: (group: string) =>
    set((state) => ({
      expandedGroups: state.expandedGroups.includes(group)
        ? state.expandedGroups.filter((g) => g !== group)
        : [...state.expandedGroups, group],
    })),
}));
