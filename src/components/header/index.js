import useSessionStore from '../../store/session'
import style from './style.scss'

const Header = () => {
    const login = useSessionStore((state) => state.login)
    const logout = useSessionStore((state) => state.logout)

    return (
        <div className={style.header}>
            <button onClick={() => login("accessToken", "refreshToken")}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Header
