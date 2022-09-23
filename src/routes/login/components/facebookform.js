import FacebookLogin from '@greatsumini/react-facebook-login'

import { FACEBOOK_APPID } from '../../../constants'

const FacebookForm = ({ isLoading, onSuccess, onFail }) => (
    <FacebookLogin
        appId={FACEBOOK_APPID}
        disabled={isLoading}
        className="btn btn-lg btn-primary w-100"
        onSuccess={({ accessToken, userID }) => onSuccess({ token: accessToken, userId: userID })}
        onFail={onFail}
    />
)

export default FacebookForm
