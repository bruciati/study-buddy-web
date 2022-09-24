import { useState } from 'preact/hooks'
import { useMutation } from '@urql/preact'
import useAppStore from '../../../../stores/application'

import style from './style.scss'

const { notifySuccess } = useAppStore.getState()

const INSERT_MEETING = 'mutation($input: MeetingInput!) { saveMeeting(input: $input) { id } }'

const Modal = ({ groupId, hideModal }) => {
    const [{ fetching }, insertMeeting] = useMutation(INSERT_MEETING)

    const [name, setName] = useState()
    const [type, setType] = useState('ONLINE')
    const [dateTime, setDateTime] = useState()
    const [location, setLocation] = useState()

    const handleSelect = (e) => setType(e.target.options[e.target.selectedIndex].value)

    const handleCreateGroup = (e) => {
        e.preventDefault()

        const unixTime = new Date(dateTime).getTime() / 1000
        const fixedLctn = type === 'ONLINE' && !location.startsWith('http') ? `https://${location}` : location

        insertMeeting({
            input: {
                name,
                groupId,
                type,
                dateTime: unixTime,
                location: fixedLctn,
            },
        }).then(({ data }) => {
            if (data.saveMeeting) {
                notifySuccess(`The ${name} meeting was successfully created.`)
                hideModal()
            }
        })
    }

    return (
        <div class={`modal d-block ${style.overlay}`} tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create new meeting</h5>
                        <button class="btn-close" type="button" onClick={hideModal} />
                    </div>
                    <div class="modal-body">
                        <form onSubmit={handleCreateGroup}>
                            <div class="mb-3">
                                <label for="meet-name" class="form-label">
                                    Name
                                </label>
                                <input
                                    id="meet-name"
                                    type="text"
                                    class="form-control"
                                    required
                                    value={name}
                                    onInput={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div class="mb-3">
                                <label for="meet-type" class="form-label">
                                    Type
                                </label>
                                <select id="meet-aoi" class="form-select" required onChange={handleSelect}>
                                    <option value="ONLINE" selected>
                                        Online
                                    </option>
                                    <option value="PHYSICAL">In person</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="meet-time" class="form-label">
                                    Date &amp; Time
                                </label>
                                <input
                                    id="meet-time"
                                    type="datetime-local"
                                    class="form-control"
                                    required
                                    value={dateTime}
                                    onChange={(e) => setDateTime(e.target.value)}
                                />
                            </div>

                            <div class="mb-3">
                                <label for="meet-loc" class="form-label">
                                    Location
                                </label>
                                <input
                                    id="meet-loc"
                                    type="text"
                                    class="form-control"
                                    required
                                    value={location}
                                    onInput={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div class="text-center">
                                <button class="btn btn-primary" type="submit" disabled={fetching}>
                                    {fetching && <i class="fa fa-refresh fa-spin" />} Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
