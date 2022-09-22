import { Provider } from '@urql/preact'
import GraphQlClient from './apis/graphql'

import AppRouter from './routes'
import Header from './components/header'
import Notifies from './components/notifies'

import './theme.scss'

const App = () => (
    <Provider value={GraphQlClient}>
        <Header />
        <AppRouter />
        <Notifies />
    </Provider>
)

export default App
