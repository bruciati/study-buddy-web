import style from './style.scss'

const LoadingSpinner = () => (
    <div class="h-100 w-100 flex-grow-1 d-flex justify-content-center">
        <div class="d-flex align-self-center">
            <div class="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <h2 class={style.loading}>Loading</h2>
        </div>
    </div>
)

export default LoadingSpinner
