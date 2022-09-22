import { route } from 'preact-router'
import useSessionStore from '../stores/session'

export const handleRouteChange = async ({ url }) => {
    if (url !== '/login') {
        const { accessToken, refreshToken } = useSessionStore.getState()

        if (!(accessToken || refreshToken)) {
            setTimeout(() => route('/login', true), 0) // Workaround for routing
        }
    }
}
