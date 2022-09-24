import useAppStore from './stores/application'

const { notifyError } = useAppStore.getState()

//
export const handleGraphQlError = (e) => {
    if (e.networkError) {
        notifyError(e.networkError.message)
    }

    if (e.graphQLErrors) {
        e.graphQLErrors.forEach((e) => notifyError(e.message))
    }
}
