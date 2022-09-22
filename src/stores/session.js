import create from 'zustand'
import { persist } from 'zustand/middleware'

const initState = { accessToken: null, accessTokenTtl: 0, refreshToken: null, refreshTokenTtl: 0 }

const useSessionStore = create(
    persist(
        (set) => ({
            // Store state
            ...initState,
            // Functions
            saveSession: set,
            resetSession: () => set(initState),
        }),
        {
            name: 'study-buddy',
            getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
            serialize: (state) => btoa(JSON.stringify(state)),
            deserialize: (source) => JSON.parse(atob(source)),
        }
    )
)

export default useSessionStore
