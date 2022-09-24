import { useState } from 'preact/hooks'
import { useQuery } from '@urql/preact'

import Description from './components/description'
import MembersList from './components/memberlist'
import Meetings from './components/meetings'
import LoadingSpinner from '../../components/loading'
import Modal from './components/modal'


const GROUP_ID =
    'query($id: ID!) { groupById(id: $id) { title, areaOfInterest, description, owner { id }, members { id, firstName, lastName }, meetings { id, name, dateTime, location, type } } }'

const Group = ({ id }) => {
    const [modal, setModal] = useState(false)

    const [{ data }] = useQuery({ query: GROUP_ID, variables: { id } })

    if (data) {
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
                                <Meetings meetings={meetings} showModal={() => setModal(true)} />
                            </div>
                        </div>
                    </div>
                    <div class="col-2 d-none d-lg-block" />
                </div>
                {modal && <Modal groupId={id} hideModal={() => setModal(false)} />}
            </div>
        )
    }

    return <LoadingSpinner />
}

export default Group
