import { useState } from 'preact/hooks'
import TextInput from './textinput'
import LoginBtn from './loginbtn'
import style from './style.scss'

const EmailForm = ({
    isRegister,
    isLoading,
    rememberState: [remember, setRemember],
    handleLogin,
    handleRegistration,
}) => {
    const emailState = useState()
    const passwordState = useState()
    const firstNameState = useState()
    const lastNameState = useState()

    const onFormSubmit = (e) => {
        e.preventDefault()
        const handlerFn = isRegister ? handleRegistration : handleLogin
        handlerFn({
            email: emailState[0],
            password: passwordState[0],
            firstName: firstNameState[0],
            lastName: lastNameState[0],
        })
    }

    return (
        <form onSubmit={onFormSubmit}>
            {/* Email textinput */}
            <TextInput
                type="email"
                required 
                className="mb-3"
                label="Email Address"
                state={emailState}
            />

            {/* Firstname & Lastname textinputs */}
            {isRegister && (
                <>
                    <TextInput
                        type="text"
                        required
                        className="mb-3"
                        label="Firstname"
                        state={firstNameState}
                    />
                    <TextInput
                        type="text"
                        className="mb-3"
                        label="Lastname"
                        state={lastNameState}
                    />
                </>
            )}

            {/* Password textinput */}
            <TextInput
                type="password"
                required
                className="mb-3"
                label="Password"
                state={passwordState}
            />

            {isRegister || (
                <div class="d-flex flex-column ps-1">
                    {/* Remember me checkbox */}
                    <div>
                        <input
                            id="rememberme"
                            type="checkbox"
                            class="form-check-input"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />
                        <label
                            for="rememberme"
                            class={`form-check-label ${style.rememberlabel}`}
                        >
                            Remember me
                        </label>
                    </div>

                    {/* Fake "Forgot password" link */}
                    <a href="#">Forgot your password?</a>
                </div>
            )}

            {/* Login button */}
            <LoginBtn isRegister={isRegister} isLoading={isLoading} />
        </form>
    )
}

export default EmailForm
