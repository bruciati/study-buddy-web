import { Link } from 'preact-router/match'
import { route } from 'preact-router'
import useSessionStore from '../../stores/session'
import { doLogout } from '../../controllers/auth'

import style from './style.scss'

const handleLogout = () => {
    doLogout()
    route('/login', true)
}

const Header = () => {
    const isLoggedIn = useSessionStore((state) => state.accessToken != null)

    return (
        <nav class="navbar navbar-dark navbar-expand-lg bg-primary py-0">
            <div class="container px-lg-4">
                <Link class={`navbar-brand ${style.brand}`} href={isLoggedIn ? '/' : '/login'}>
                    StudyBuddy
                </Link>

                <div class={`text-white ${style.motto}`}>"Everybody needs somebody to study"</div>

                {isLoggedIn && (
                    <ul class={`navbar-nav ${style.links}`}>
                        <li class="nav-item">
                            <Link class="nav-link" activeclass="active" href="/">
                                <i class="fa-solid fa-house" /> Home
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" activeclass="active" href="/profile">
                                <i class="fa-solid fa-user" /> Profile
                            </Link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="javascript:void(0)" onClick={handleLogout}>
                                <i class="fa-solid fa-right-to-bracket" /> Logout
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Header
