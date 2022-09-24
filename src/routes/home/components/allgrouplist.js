import { useEffect } from 'preact/hooks'
import { useQuery } from '@urql/preact'

import { handleGraphQlError } from '../../../utils'
import GroupCard from '../../../components/groupcard'
import LoadingSpinner from '../../../components/loading'

const GROUPS = 'query { groups { id title areaOfInterest description owner { firstName lastName } members { id } } }'

const AllGroupList = () => {
    const [{ fetching, data, error }] = useQuery({ query: GROUPS })
    useEffect(() => error && handleGraphQlError(error), [error])

    if (!fetching && data) {
        return data.groups.map(({ id, ...group }) => <GroupCard id={id} key={id} {...group} />)
    }

    return <LoadingSpinner />
}

export default AllGroupList
