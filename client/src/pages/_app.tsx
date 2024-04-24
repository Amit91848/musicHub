import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@/styles/globals.css'
import '@/styles/customStyle.css'

import Layout from '@/components/layout/Layout'

import { persistor, store } from '@/store/store'
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
// import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
    const route = useRouter()
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {route.pathname.startsWith('/library') ? (
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                ) : (
                    <Component {...pageProps} />
                )}
            </PersistGate>
        </Provider>
    )
}

export default MyApp
