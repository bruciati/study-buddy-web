import { createClient, cacheExchange, dedupExchange, errorExchange, fetchExchange, makeOperation } from '@urql/preact'
import { authExchange } from '@urql/exchange-auth'

import { SERVER_BASEURL } from '../constants'
import { getAuth, didAuthError, onError } from '../controllers/graphql'

// Applies an auth state to each request
const addAuthToOperation = ({ authState, operation }) => {
    if (!authState || !authState.token) {
        return operation
    }

    return makeOperation(operation.kind, operation, {
        ...operation.context,
        fetchOptions: {
            headers: {
                Authorization: `Bearer ${authState.token}`,
            },
        },
    })
}

// Triggers the logic in `getAuth` without the need to send a request.
const willAuthError = ({ authState }) => !authState || !authState.token

// Graphql Client instance
const GraphQlClient = createClient({
    url: `${SERVER_BASEURL}/graphql`,
    requestPolicy: 'cache-and-network',
    exchanges: [
        dedupExchange,
        cacheExchange,
        errorExchange({
            onError,
        }),
        authExchange({
            getAuth,
            addAuthToOperation,
            didAuthError,
            willAuthError,
        }),
        fetchExchange,
    ],
})

export default GraphQlClient
