import * as React from 'react'

import Header from './Header'
import Sidebar from '../Sidebar/Sidebar'
import Player from '../SongPlayer/Player'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className='flex h-screen overflow-y-hidden bg-dark'>
                <Sidebar />
                <div className='relative w-full'>
                    <Header />
                    <div className='absolute top-[80px] right-0 bottom-20 w-full'>
                        <div className='flex h-full w-full overflow-scroll bg-greenBg p-6 text-lightSupport transition'>
                            <div className='mx-auto h-fit w-full rounded-lg bg-contentBg p-8'>
                                {children}
                            </div>
                        </div>
                    </div>
                    <Player />
                </div>
            </div>
        </>
    )
}
