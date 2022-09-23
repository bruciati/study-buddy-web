import Router from 'preact-router'
import { Provider } from '@urql/preact'
import GraphQlClient from './apis/graphql'
import { handleRouteChange } from './controllers/routing'

// Components
import Header from './components/header'
import Notifies from './components/notifies'

// Routes
import Home from './routes/home'
import Login from './routes/login'
import Profile from './routes/profile'
import Group from './routes/group'

// App theme
import './theme.scss'

const App = () => (
    <div id="app">
        <Provider value={GraphQlClient}>
            <Header />
            <Router onChange={handleRouteChange}>
                <Home path="/" />
                <Login path="/login" />
                <Profile path="/profile" />
                <Group path="/group/:id" />
            </Router>
            <Notifies />
        </Provider>
    </div>
)

export default App
