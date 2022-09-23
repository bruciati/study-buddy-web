import { route } from 'preact-router'
import { useState } from 'preact/hooks'

import { doLogin, doRegistration } from '../../controllers/auth'
import useAppStore from '../../stores/application'
import style from './style.scss'

import EmailForm from './components/emailform'
import FacebookForm from './components/facebookform'
import RegisterSwitch from './components/registerswitch'

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
    const [isLoading, setLoading] = useState(false)
    const [isRegister, setRegister] = useState(false)

    return (
        <div class="row flex-grow-1">
            <div class="col d-flex align-items-center justify-content-center p-3">
                <div>
                    {/* Header */}
                    <img src="/assets/img/login.svg" class={style.loginhero} alt="Login" />
                    <h1 class="text-center my-4">{isRegister ? 'Register' : 'Sign In'}</h1>

                    {/* Email login/register form */}
                    <EmailForm
                        isLoading={isLoading}
                        isRegister={isRegister}
                        rememberState={rememberState}
                        handleLogin={handleLogin(setLoading)}
                        handleRegistration={handleRegistration(setLoading)}
                    />

                    {/* Facebook login form */}
                    {isRegister || (
                        <>
                            <span class={`${style.divider} my-3`}>OR</span>
                            <FacebookForm
                                isLoading={isLoading}
                                onSuccess={handleLogin(setLoading)}
                                onFail={(e) => notifyError(e.message)}
                            />
                        </>
                    )}

                    {/* Register switch */}
                    <div class="d-flex justify-content-center mt-3">
                        <RegisterSwitch isRegister={isRegister} setRegister={setRegister} />
                    </div>
                </div>
            </div>
            <div class={`d-none d-lg-block col ${style.placeholder}`} />
        </div>
    )
}

export default Login
