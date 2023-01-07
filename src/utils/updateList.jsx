import create from "zustand";
export const reloadList = create((set) => ({
    reload: true,
    toggle: () => set((state) => ({reload: !state.reload})),
}))