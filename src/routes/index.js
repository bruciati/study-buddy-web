import Router from 'preact-router'
import { handleRouteChange } from '../controllers/routing'

// Routes
import Home from './home'
import Login from './login'

const AppRouter = () => (
    <Router onChange={handleRouteChange}>
        <Home path="/" />
        <Login path="/login" />
    </Router>
)

export default AppRouter
