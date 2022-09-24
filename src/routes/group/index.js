import { useEffect } from 'preact/hooks'
import { useQuery } from '@urql/preact'

import useAppStore from '../../stores/application'
import Description from './components/description'
import MembersList from './components/memberlist'
import MeetingsTable from './components/meetingstable'
import LoadingSpinner from '../../components/loading'

const { notifyError } = useAppStore.getState()

const GROUP_ID =
    'query($id: ID!) { groupById(id: $id) { title, areaOfInterest, description, owner { id }, members { id, firstName, lastName }, meetings { id, name, dateTime, location, type } } }'

const Group = ({ id }) => {
    const [{ fetching, data, error }] = useQuery({ query: GROUP_ID, variables: { id } })

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
        const { title, areaOfInterest, description, owner, members, meetings } = data.groupById

        return (
            <div class="flex-grow-1">
                <div class="row my-4">
                    <div class="col-2 d-none d-lg-block" />
                    <div class="col mx-2 mx-md-5 mx-lg-0">
                        <div class="card shadow px-3">
                            <div class="card-header text-center bg-white">
                                <h1 class="display-3">{title}</h1>
                                <h3 class="display-6 text-primary">{areaOfInterest}</h3>
                            </div>
                            <div class="card-body">
                                <Description value={description} />
                                <MembersList ownerId={owner.id} members={members} />
                                <MeetingsTable meetings={meetings} />
                            </div>
                        </div>
                    </div>
                    <div class="col-2 d-none d-lg-block" />
                </div>
            </div>
        )
    }

    return <LoadingSpinner />
}

export default Group
