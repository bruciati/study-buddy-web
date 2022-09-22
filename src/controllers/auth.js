import { fetchLogin, fetchRefreshToken, fetchRegistration } from '../apis/auth'
import useSessionStore from '../stores/session'

const { saveSession, resetSession } = useSessionStore.getState()

export const doRegistration = async (body) => {
    try {
        const response = await fetchRegistration(body)
        saveSession(response)
        return response
    } catch (error) {
        resetSession()
        throw error
    }
}

export const doLogin = async (body) => {
    try {
        const response = await fetchLogin(body)
        saveSession(response)
        return response
    } catch (error) {
        resetSession()
        throw error
    }
}

export const doRefresh = async () => {
    try {
        const { refreshToken } = useSessionStore.getState()
        const response = await fetchRefreshToken(refreshToken)
        saveSession(response)
        return response
    } catch (error) {
        resetSession()
        throw error
    }
}

export const doLogout = resetSession
