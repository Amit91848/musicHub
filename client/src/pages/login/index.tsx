import clsx from 'clsx'
import { AiFillYoutube } from 'react-icons/ai'
import { BsSpotify } from 'react-icons/bs'

import ButtonLink from '@/components/links/ButtonLink'
import Seo from '@/components/Seo'

export default function Login() {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    return (
        <>
            <Seo templateTitle='Login Page' />
            <main>
                <section
                    className={clsx(
                        'flex min-h-screen overflow-clip bg-cover bg-center bg-no-repeat',
                        'bg-[url(https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg)] brightness-90'
                    )}
                >
                    <div
                        className={clsx(
                            'm-auto flex h-56 w-96 rounded-lg shadow-lg backdrop-blur-3xl backdrop-filter'
                        )}
                    >
                        <div className='text- my-auto flex w-full flex-col items-center'>
                            <ButtonLink
                                href={`${backendURL}/auth/google`}
                                className='h-11 w-4/6 border border-red-700 py-6 px-4 shadow-2xl'
                                variant='outline'
                                leftIcon={AiFillYoutube}
                                source='youtube'
                            >
                                Jam With Youtube
                            </ButtonLink>
                            <br />
                            <ButtonLink
                                href={`${backendURL}/auth/spotify`}
                                className='h-11 w-4/6 border border-green-600 py-6 px-4 shadow-2xl'
                                variant='outline'
                                leftIcon={BsSpotify}
                                source='spotify'
                            >
                                Groove With Spotify
                            </ButtonLink>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
