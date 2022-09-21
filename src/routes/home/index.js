import useSessionStore from '../../store/session'
import style from './style.scss'

const Home = () => {
    const accessToken = useSessionStore((state) => state.accessToken)
    const refreshToken = useSessionStore((state) => state.refreshToken)

    return (
        <div class={style.home}>
           <span>accessToken: {accessToken}</span><br />
           <span>refreshToken: {refreshToken}</span>
        </div>
    )
}

export default Home
