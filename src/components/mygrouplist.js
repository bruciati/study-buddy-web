import { useQuery } from '@urql/preact'

import GroupCard from './groupcard'
import LoadingSpinner from './loading'

const GROUPS = 'query { me { groups { id title areaOfInterest description owner { firstName lastName } members { id } } } }'

const MyGroupList = () => {
    const [{ fetching, data }] = useQuery({ query: GROUPS })

    if (!fetching && data) {
        return data.me.groups.map(({ id, ...group }) => <GroupCard id={id} key={id} {...group} />)
    }

    return <LoadingSpinner />
}

export default MyGroupList
