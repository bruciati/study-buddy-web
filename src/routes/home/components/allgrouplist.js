import { useEffect } from 'preact/hooks'
import { useQuery } from '@urql/preact'

import useAppStore from '../../../stores/application'
import GroupCard from '../../../components/groupcard'
import LoadingSpinner from '../../../components/loading'

const { notifyError } = useAppStore.getState()

const GROUPS = 'query { groups { id title areaOfInterest description owner { firstName lastName } members { id } } }'

const AllGroupList = () => {
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
        return data.groups.map(({ id, ...group }) => <GroupCard id={id} key={id} {...group} />)
    }

    return <LoadingSpinner />
}

export default AllGroupList
