import { createClient, cacheExchange, dedupExchange, fetchExchange, makeOperation } from '@urql/preact'
import { authExchange } from '@urql/exchange-auth'

import { getAuth, didAuthError } from '../controllers/graphql'
import { SERVER_BASEURL } from '../constants'

// Applies an auth state to each request
const addAuthToOperation = ({ authState, operation }) => {
    if (authState == null || authState.token == null) {
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
const willAuthError = ({ authState }) => authState == null || authState.token == null

// Graphql Client instance
const GraphQlClient = createClient({
    url: `${SERVER_BASEURL}/graphql`,
    requestPolicy: 'cache-and-network',
    exchanges: [
        dedupExchange,
        cacheExchange,
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
