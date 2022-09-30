import { route } from 'preact-router'
import { makeOperation } from '@urql/preact'

import useSessionStore from '../stores/session'
import { doRefresh, doLogout } from './auth'

import useAppStore from '../stores/application'
const { notifyError } = useAppStore.getState()

// Applies an auth state to each request
export const addAuthToOperation = ({ authState, operation }) => {
    if (!authState || authState.error) {
        return operation
    }

    const { accessToken } = useSessionStore.getState()
    return makeOperation(operation.kind, operation, {
        ...operation.context,
        fetchOptions: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    })
}

//
export const getAuth = async ({ authState }) => {
    // First 
    if (!authState) {
        const { accessToken } = useSessionStore.getState()
        return { error: !accessToken }
    }
    // Refresh access token
    else if (authState.error) {
        const { refreshToken } = useSessionStore.getState()
        if (refreshToken) {
            console.log('Refreshing the access token...')

            try {
                const { accessToken } = await doRefresh()
                return { error: !accessToken }
            } catch (_) {
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
    if (error.networkError && error.networkError.message.toLowerCase() === 'unauthorized') {
        if (authState) authState.error = true
        return true
    }

    return false
}

//
export const onError = ({ networkError, graphQLErrors }/*, operation */) => {
    if (networkError) {
        notifyError(networkError.message)
    }

    if (graphQLErrors) {
        graphQLErrors.forEach((e) => notifyError(e.message))
    }
}
