const RegisterSwitch = ({ isRegister, setRegister }) => (
    <div class="form-check form-switch">
        <input
            id="register-switch"
            class="form-check-input"
            type="checkbox"
            role="switch"
            checked={isRegister}
            onChange={() => setRegister(!isRegister)}
        />
        <label class="form-check-label" for="register-switch">
            Register
        </label>
    </div>
)

export default RegisterSwitch
