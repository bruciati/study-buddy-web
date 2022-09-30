import { createClient, cacheExchange, dedupExchange, errorExchange, fetchExchange } from '@urql/preact'
import { authExchange } from '@urql/exchange-auth'

import { SERVER_BASEURL } from '../constants'
import { addAuthToOperation, getAuth, didAuthError, onError } from '../controllers/graphql'

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
            addAuthToOperation,
            didAuthError,
            getAuth,
        }),
        fetchExchange,
    ],
})

export default GraphQlClient
