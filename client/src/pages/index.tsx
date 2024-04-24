import * as React from 'react'

import ArrowLink from '@/components/links/ArrowLink'
import UnderlineLink from '@/components/links/UnderlineLink'

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
    return (
        <main className='text-white'>
            <section className='flex min-h-screen overflow-clip bg-cover bg-center bg-no-repeat bg-[url(https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg)] brightness-90'>
                <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
                    <h1 className='mt-4'>
                        Music Hub
                    </h1>
                    <p className='mt-2 text-base '>
                        Unleash your tunes with our music player app, your ultimate audio companion.
                        <br />
                        Seamlessly stream your top tracks from Spotify and YouTube, anytime, anywhere.
                        <br />
                        Dive into the rhythm and let the music play!
                    </p>
                    <p className='mt-2 text-base '>
                        <ArrowLink href='/login'>
                            Login
                        </ArrowLink>
                    </p>
                    <p className='mt-2 text-base '>
                        <ArrowLink target="_blank" href='https://github.com/Amit91848/musicHub'>
                            See the repository
                        </ArrowLink>
                    </p>
                    <footer className='absolute bottom-2 '>
                        © {new Date().getFullYear()} By{' '}
                        <UnderlineLink href='https://github.com/Amit91848'>
                            Amit Sharma
                        </UnderlineLink>
                    </footer>
                </div>
            </section>
        </main>
    )
}
