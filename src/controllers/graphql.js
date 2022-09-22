import { route } from 'preact-router'

import useSessionStore from '../stores/session'
import { doRefresh, doLogout } from './auth'

//
export const getAuth = async ({ authState }) => {
    // First access token warmup
    if (authState == null) {
        const { accessToken } = useSessionStore.getState()
        if (accessToken) return { token: accessToken }
    }

    // Refresh access token
    else if (authState.token == null) {
        const { refreshToken } = useSessionStore.getState()
        if (refreshToken) {
            console.log('Refreshing the access token...')

            try {
                const { accessToken } = await doRefresh()
                return { token: accessToken }
            } catch (error) {
                doLogout()
                route('/login', true)
                console.log('Access token refresh failed!')
            }
        }
    }

    return null
}

//
export const didAuthError = ({ authState, error }) => {
    if (authState == null) {
        return true
    }

    if (error.networkError != null && error.networkError.message.toLowerCase() === 'unauthorized') {
        authState.token = null
        return true
    }

    return false
}
