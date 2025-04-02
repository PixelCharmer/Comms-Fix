import { create } from "zustand";

export const useGameStore = create((set) => ({
    correctWiring: false,
    correctFrequencies: false,
    isSolved: false,
    setWiring: (status) => set({ correctWiring: status }),
    setFrequencies: (status) => set({ correctFrequencies: status }),
    checkSolution: () =>
        set((state) => ({
            isSolved: state.correctWiring && state.correctFrequencies,
        })),
}));
