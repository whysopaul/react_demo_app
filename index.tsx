import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './src/App'

//css
import '@fortawesome/fontawesome-free/css/all.min.css';





import { persistStore } from 'redux-persist'
import store from './src/store'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.querySelector('#root')
)

