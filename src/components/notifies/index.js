import { useEffect, useState } from 'preact/hooks'
import useAppStore from '../../stores/application'
import style from './style.scss'

const Notify = ({ type, text }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 2000)
        return () => clearTimeout(timeout)
    }, [])

    return (
        visible && (
            <div class={`alert alert-${type} alert-dismissible ${style.notify} fade show`} role="alert">
                <span>{text}</span>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => setVisible(false)} />
            </div>
        )
    )
}

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
