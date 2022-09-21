import AppRouter from './routes'

import Header from './components/header'
import Notifies from './components/notifies'

const App = () => (
    <>
        <Header />
        <AppRouter />
        <Notifies />
    </>
)

export default App
