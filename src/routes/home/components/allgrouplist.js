import { useQuery } from '@urql/preact'

import GroupCard from '../../../components/groupcard'
import LoadingSpinner from '../../../components/loading'

const GROUPS = 'query { groups { id title areaOfInterest description owner { firstName lastName } members { id } } }'

const AllGroupList = () => {
    const [{ fetching, data }] = useQuery({ query: GROUPS })

    if (!fetching && data) {
        return data.groups.map(({ id, ...group }) => <GroupCard id={id} key={id} {...group} />)
    }

    return <LoadingSpinner />
}

export default AllGroupList
