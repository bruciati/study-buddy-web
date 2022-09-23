import { useId } from 'preact/hooks'

const TextInput = ({ label, className, state: [state, setState], ...props }) => {
    const elemId = useId()

    return (
        <div class={`form-floating ${className}`}>
            <input
                id={elemId}
                class="form-control"
                placeholder // The "label" tag needs this property
                value={state}
                onInput={(e) => setState(e.target.value)}
                {...props}
            />
            <label for={elemId}>{label}</label>
        </div>
    )
}

export default TextInput
