import { useEffect } from 'preact/hooks'
import { useQuery } from '@urql/preact'

import useAppStore from '../stores/application'
import GroupCard from './groupcard'
import LoadingSpinner from './loading'

const { notifyError } = useAppStore.getState()

const GROUPS = 'query { me { groups { id title areaOfInterest description owner { firstName lastName } members { id } } } }'

const MyGroupList = () => {
    const [{ fetching, data, error }] = useQuery({ query: GROUPS })

    useEffect(() => {
        if (error) {
            if (error.networkError) {
                notifyError(error.networkError.message)
            }

            if (error.graphQLErrors) {
                error.graphQLErrors.forEach((err) => notifyError(err.message))
            }
        }
    }, [error])

    if (!fetching && data) {
        return data.me.groups.map(({ id, ...group }) => <GroupCard id={id} key={id} {...group} />)
    }

    return <LoadingSpinner />
}

export default MyGroupList
