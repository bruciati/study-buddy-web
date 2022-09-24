import { useState } from 'preact/hooks'
import { useMutation } from '@urql/preact'
import useAppStore from '../../../../stores/application'
import { handleGraphQlError } from '../../../../utils'

import style from './style.scss'

const { notifySuccess } = useAppStore.getState()

const INSERT_GROUP = 'mutation($input: GroupInput!) { saveGroup(input: $input) { id } }'

const Modal = ({ hideModal }) => {
    const [{ fetching }, insertGroup] = useMutation(INSERT_GROUP)

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [areaOfInterest, setAreaOfInterest] = useState()

    const handleSelect = (e) => setAreaOfInterest(e.target.options[e.target.selectedIndex].text)

    const handleCreateGroup = (e) => {
        e.preventDefault()
        insertGroup({ input: { title, description, areaOfInterest } }).then(({ data }) => {
            if (data.saveGroup) {
                notifySuccess(`The ${title} group was successfully created.`)
                hideModal()
            }
        })
    }

    return (
        <div class={`modal d-block ${style.overlay}`} tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create new group</h5>
                        <button class="btn-close" type="button" onClick={hideModal} />
                    </div>
                    <div class="modal-body">
                        <form onSubmit={handleCreateGroup}>
                            <div class="mb-3">
                                <label for="group-title" class="form-label">
                                    Title
                                </label>
                                <input
                                    id="group-title"
                                    type="text"
                                    class="form-control"
                                    required
                                    value={title}
                                    onInput={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div class="mb-3">
                                <label for="group-aoi" class="form-label">
                                    Area of interest
                                </label>
                                <select id="group-aoi" class="form-select" required onChange={handleSelect}>
                                    <option selected>Miscellaneous</option>
                                    <option value="1">Architecture</option>
                                    <option value="2">Biology</option>
                                    <option value="3">Computer Science</option>
                                    <option value="4">Engineering</option>
                                    <option value="5">Literature</option>
                                    <option value="6">Mathematics</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="group-desc" class="form-label">
                                    Description
                                </label>
                                <textarea
                                    id="group-desc"
                                    class="form-control"
                                    rows="4"
                                    value={description}
                                    onInput={(e) => setDescription(e.target.value)}
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
