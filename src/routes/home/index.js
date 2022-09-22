import { useQuery } from '@urql/preact'
import { route } from 'preact-router'
import { useEffect } from 'preact/hooks'
import { doLogout } from '../../controllers/auth'
import useSessionStore from '../../stores/session'
import style from './style.scss'

const Home = () => {
    const accessToken = useSessionStore((state) => state.accessToken)
    const refreshToken = useSessionStore((state) => state.refreshToken)

    const handleLogOut = () => {
        doLogout()
        route('/login', true)
    }

    const [response] = useQuery({ query: 'query { me { id firstName } }' })
    const { data } = response

    useEffect(() => console.log(response), [response])

    return (
        <>
            <div class={style.home}>
                <span>accessToken: {accessToken}</span>
                <br />
                <span>refreshToken: {refreshToken}</span>
                <br />
            </div>
            {data && (
                <span>
                    I'm {data.me.firstName} and my ID is {data.me.id}
                </span>
            )}
            <button onClick={handleLogOut}>LogOut</button>
        </>
    )
}

export default Home
