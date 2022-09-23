import { route } from 'preact-router'
import useSessionStore from '../stores/session'

export const handleRouteChange = async ({ url }) => {
    const { accessToken } = useSessionStore.getState()
    const isLoginPage = url === '/login'

    if (!isLoginPage && !accessToken) {
        setTimeout(() => route('/login', true), 0) // Workaround for routing
    } else if (isLoginPage && accessToken) {
        setTimeout(() => route('/', true), 0) // Workaround for routing
    }
}
