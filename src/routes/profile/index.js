import { useMemo } from 'preact/hooks'
import { useQuery } from '@urql/preact'

import LoadingSpinner from '../../components/loading'
import MyGroupList from '../../components/mygrouplist'

import style from './style.scss'

const ME = 'query { me { firstName lastName } }'

const Profile = () => {
    const [{ fetching, data }] = useQuery({ query: ME })

    if (!fetching && data) {
        const fullName = useMemo(() => 
            data.me.firstName + (data.me.lastName ? ` ${data.me.lastName}` : ''),
            [data]
        )

        return (
            <div class="flex-grow-1">
                <div class={style.profile}>
                    <div class={style.banner} />
                    <div class={style.info}>
                        <div class={style.image} />
                        <h1>{fullName}</h1>
                    </div>
                </div>
                <div class="container px-lg-4">
                    <div class="border-bottom mt-2">
                        <h3>My Groups</h3>
                    </div>
                    <div class="row py-3 mx-lg-1">
                        <MyGroupList />
                    </div>
                </div>
            </div>
        )
    }

    return <LoadingSpinner />
}

export default Profile
