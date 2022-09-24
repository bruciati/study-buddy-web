import { memo } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import useAppStore from '../../stores/application'

import style from './style.scss'

const Notify = memo(({ type, text }) => {
    const [visible, setVisible] = useState(true)
    const hideMe = () => setVisible(false)

    useEffect(() => {
        const timeout = setTimeout(hideMe, 2000)
        return () => clearTimeout(timeout)
    }, [])

    if (visible) {
        return (
            <div class={`alert alert-${type} alert-dismissible ${style.notify} fade show`} role="alert">
                <span>{text}</span>
                <button type="button" class="btn-close" aria-label="Close" onClick={hideMe} />
            </div>
        )
    }
})

const Notifies = () => {
    const notifyList = useAppStore((state) => state.notifyList)

    return (
        <div class={style.notifies}>
            {notifyList.map((props, idx) => (
                <Notify key={idx} {...props} />
            ))}
        </div>
    )
}

export default Notifies
