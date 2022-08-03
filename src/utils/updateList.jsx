import create from "zustand";
export const reloadList = create((set) => ({
    reload: true,
    troggle: () => set((state) => ({reload: !state.reload})),
}))