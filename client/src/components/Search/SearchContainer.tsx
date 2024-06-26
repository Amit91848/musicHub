import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsSpotify, BsYoutube } from 'react-icons/bs'
import { ImSoundcloud } from 'react-icons/im'

import SearchTracks from './SearchTracks'
import ShowHideButtons, { Contents } from './ShowHideButtons'
import SpotifySearchArtists from './SpotifySearchArtists'
import useMe from '@/hooks/useMe'
import { BiLoader } from 'react-icons/bi'

// interface SearchContainerProps {}

export const SearchContainer: React.FC = () => {
    const router = useRouter()
    const { query } = router.query

    const [showYoutube, setShowYoutube] = useState(true)
    const [showSpotify, setShowSpotify] = useState(true)
    const [showSoundcloud, setShowSoundcloud] = useState(true)

    const { user, isLoading } = useMe();
    console.log("isLoading: ", isLoading);
    console.log('user: ', user);

    const objects: Contents[] = [
        {
            source: 'youtube',
            show: showYoutube,
            setShow: setShowYoutube,
            icon: BsYoutube,
        },
        {
            source: 'spotify',
            show: showSpotify,
            setShow: setShowSpotify,
            icon: BsSpotify,
        },
        {
            source: 'soundcloud',
            show: showSoundcloud,
            setShow: setShowSoundcloud,
            icon: ImSoundcloud,
        },
    ]
    useEffect(() => {
        document.title = `MusicHub | ${query}`
    }, [query])

    return (
        // <div className='h-full w-screen overflow-y-scroll p-10'>
        <div className='flex h-fit w-full flex-col space-y-12  text-lightSupport'>
            <div>
                <div className='text-xl font-light tracking-wider'>
                    Showing search results for "{query}"
                </div>
                <Link className='mt-2' href='/library/search'>
                    {'<-'} Return to search Page
                </Link>
            </div>
            <>
                {isLoading ? <BiLoader /> :
                    <>
                        <ShowHideButtons objects={objects} />
                        {showSpotify && user?.spotifyConnected && <SpotifySearchArtists />}
                        <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4'>
                            {showSpotify && user?.spotifyConnected && <SearchTracks source='spotify' />}
                            {showYoutube && user?.googleConnected && <SearchTracks source='youtube' />}
                        </div>
                    </>
                }
            </>
        </div>
        // </div>
    )
}

export default SearchContainer
