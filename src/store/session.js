import create from 'zustand'
import { persist } from 'zustand/middleware'

const initState = { accessToken: null, refreshToken: null }

const useSessionStore = create(
    persist(
        (set) => ({
            // Store state
            ...initState,
            // Functions
            login: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
            logout: () => set(initState),
        }),
        {
            name: 'study-buddy',
            getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
            serialize: (state) => btoa(JSON.stringify(state)),
            deserialize: (source) => JSON.parse(atob(source))
        }
    )
)

export default useSessionStore
