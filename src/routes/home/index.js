import { useState } from 'preact/hooks'

import AllGroupList from './components/allgrouplist'
import MyGroupList from '../../components/mygrouplist'
import Modal from './components/modal'

const Home = () => {
    const [showMine, setShowMine] = useState(false)
    const [isModalShown, showModal] = useState(false)

    const handleLogOut = () => {
        doLogout()
        route('/login', true)
    }

    const [response] = useQuery({ query: 'query { me { id firstName } }' })
    const { data } = response

    useEffect(() => console.log(response), [response])

    return (
        <div class="flex-grow-1 container px-lg-4 mt-4">
            <div class="d-flex flex-row border-bottom align-items-center py-2">
                <h1 class="m-0 me-auto">{showMine ? 'My' : 'All'} Groups</h1>
                <button type="button" class="btn btn-primary" onClick={() => showModal(true)}>
                    <i class="fa-solid fa-sharp fa-plus" />
                </button>
                <div class="btn-group d-flex ms-2" role="group">
                    <input
                        id="show-all"
                        name="btnradio"
                        class="btn-check"
                        type="radio"
                        autocomplete="off"
                        defaultChecked
                        onChange={() => setShowMine(false)}
                    />
                    <label class="btn btn-outline-secondary" for="show-all">
                        <i class="fa-solid fa-bars" />
                    </label>
                    <input
                        id="show-my"
                        name="btnradio"
                        class="btn-check"
                        type="radio"
                        autocomplete="off"
                        onChange={() => setShowMine(true)}
                    />
                    <label class="btn btn-outline-secondary" for="show-my">
                        <i class="fa-solid fa-user" />
                    </label>
                </div>
            </div>
            <div class="row py-3 mx-lg-1">
                {(showMine && <MyGroupList />) || <AllGroupList />}
            </div>
            {isModalShown && <Modal showModal={showModal} />}
        </div>
    )
}

export default Home
