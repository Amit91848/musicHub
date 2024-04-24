import '@/styles/globals.css'
import '@/styles/customStyle.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppProps } from 'next/app'

import { store, persistor } from '@/store/store'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}

export default MyApp
