import { route } from 'preact-router'
import { useState } from 'preact/hooks'

import { doLogin, doRegistration } from '../../controllers/auth'
import useAppStore from '../../stores/application'
import style from './style.scss'

import EmailForm from './components/emailform'
import FacebookForm from './components/facebookform'

const { notifyError } = useAppStore.getState()

const handleRegistration = (setLoading) => (body) => {
    setLoading(true)
    doRegistration(body)
        .then(() => route('/', true))
        .catch((e) => notifyError(e.message))
        .finally(() => setLoading(false))
}

const handleLogin = (setLoading) => (body) => {
    setLoading(true)
    doLogin(body)
        .then(() => route('/', true))
        .catch((e) => notifyError(e.message))
        .finally(() => setLoading(false))
}

const Login = () => {
    const rememberState = useState(false)
    const [loading, setLoading] = useState(false)
    const [register, setRegister] = useState(false)

    return (
        <div class="row flex-grow-1">
            <div class="col d-flex align-items-center justify-content-center p-3">
                <div>
                    {/* Header */}
                    <img src="/assets/img/login.svg" class={style.loginhero} alt="Login" />
                    <h1 class="text-center my-4">{register ? 'Register' : 'Sign In'}</h1>

                    {/* Email login/register form */}
                    <EmailForm
                        isLoading={loading}
                        isRegister={register}
                        rememberState={rememberState}
                        handleLogin={handleLogin(setLoading)}
                        handleRegistration={handleRegistration(setLoading)}
                    />

                    {/* Facebook login form */}
                    {register || (
                        <>
                            <span class={`${style.divider} my-3`}>OR</span>
                            <FacebookForm
                                isLoading={loading}
                                onSuccess={handleLogin(setLoading)}
                                onFail={(e) => notifyError(e.message)}
                            />
                        </>
                    )}

                    {/* Register switch */}
                    <div class="d-flex justify-content-center mt-3">
                        <div class="form-check form-switch">
                            <input
                                id="register-switch"
                                class="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={register}
                                onChange={() => setRegister(!register)}
                            />
                            <label class="form-check-label" for="register-switch">
                                Register
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class={`d-none d-lg-block col ${style.placeholder}`} />
        </div>
    )
}

export default Login
