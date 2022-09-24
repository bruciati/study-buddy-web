import { useEffect } from 'preact/hooks'
import { useQuery } from '@urql/preact'
import { handleGraphQlError } from '../utils'

import GroupCard from './groupcard'
import LoadingSpinner from './loading'

const GROUPS = 'query { me { groups { id title areaOfInterest description owner { firstName lastName } members { id } } } }'

const MyGroupList = () => {
    const [{ fetching, data, error }] = useQuery({ query: GROUPS })
    useEffect(() => error && handleGraphQlError(error), [error])

    if (!fetching && data) {
        return data.me.groups.map(({ id, ...group }) => <GroupCard id={id} key={id} {...group} />)
    }

    return <LoadingSpinner />
}

export default MyGroupList
