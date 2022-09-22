import { route } from 'preact-router'
import { useState } from 'preact/hooks'

import { doLogin } from '../../controllers/auth'
import useAppStore from '../../stores/application'

const Login = () => {
    const notifyError = useAppStore((state) => state.notifyError)
    const [email, setEmail] = useState('pinco@panco.it')
    const [password, setPassword] = useState('pwd123')

    const handleSubmit = (e) => {
        e.preventDefault()
        doLogin({ email, password })
            .then(() => route('/', true))
            .catch((e) => notifyError(e.message))
    }

    return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input className="my-1" type="email" value={email} onInput={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                <input className="my-1" type="password" value={password} onInput={(e) => setPassword(e.target.value)} />
                <button className="mt-3" type="submit">
                    Sign in
                </button>
            </form>
        </div>
    )
}

export default Login
