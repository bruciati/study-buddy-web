import { memo } from 'preact/compat'

const Description = ({ value }) => {
    if (value) {
        return (
            <>
                <h3>
                    <i class="fa-solid fa-pen me-2" /> Description
                </h3>
                <p class="text-break fs-5" style={{ textAlign: 'justify' }}>
                    {value}
                </p>
            </>
        )
    }

    return null
}

export default memo(Description)
