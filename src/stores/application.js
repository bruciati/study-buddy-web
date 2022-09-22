import create from 'zustand'

// Notify list store slice
const NotifySlice = (set) => ({
    notifyList: [],
    notifyInfo: (text) => set((state) => ({ notifyList: [...state.notifyList, { type: 'primary', text }] })),
    notifySuccess: (text) => set((state) => ({ notifyList: [...state.notifyList, { type: 'success', text }] })),
    notifyWarn: (text) => set((state) => ({ notifyList: [...state.notifyList, { type: 'warning', text }] })),
    notifyError: (text) => set((state) => ({ notifyList: [...state.notifyList, { type: 'danger', text }] })),
})

// Application store
const useAppStore = create((...opts) => ({
    ...NotifySlice(...opts),
}))

export default useAppStore
