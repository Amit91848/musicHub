import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

import { play } from '@/store/reducers/player'
import { RootState, useAppDispatch } from '@/store/store'

import { CommonTracks, service } from '@/constant/services'

import Track from '../PlaylistPage/Track'

export interface SpotifyCommonTracks {
    href: string
    items: CommonTracks[]
    limit: number
    next: string | null
    offset: number
    previous: null
    total: number
}

interface SpotifySearchTracksProps {
    source: service
}

export const SearchTracks: React.FC<SpotifySearchTracksProps> = ({
    source,
}) => {
    const router = useRouter()
    const { query } = router.query
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const currentTrack = useSelector(
        (state: RootState) => state.player.currentTrack
    )
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tracks, setTracks] = useState<CommonTracks[]>([])
    const [, setNext] = useState('')

    const dispatch = useAppDispatch()

    const handlePlay = (track: CommonTracks) => {
        dispatch(play({ track, trackList: tracks }))
    }

    async function fetchSpotifyTracks() {
        setIsLoading(true)
        const response = await axios.get(
            `${backendURL}/api/spotify/search/track/${query}`,
            { withCredentials: true }
        )
        setTracks(response.data)
        setNext(response.data.next)
        setIsLoading(false)
    }
    async function fetchYoutubeSearchQuery() {
        setIsLoading(true)
        const response = await axios.get(
            `${backendURL}/api/youtube/search/${query}`,
            {
                withCredentials: true,
            }
        )
        setTracks(response.data)
        setIsLoading(false)
    }
    useEffect(() => {
        if (source === 'spotify') {
            fetchSpotifyTracks()
        } else if (source === 'youtube') {
            fetchYoutubeSearchQuery()
        }
        //eslint-disable-next-line
    }, [query])
    return (
        <div className='h-full w-full rounded-lg bg-darkSupport/40 p-6'>
            <div className='mt-2 h-12 font-eliteSpecial text-[3rem]'>
                Search {source}
            </div>
            <div className='flex flex-col space-y-2'>
                {!isLoading ? (
                    tracks?.map((track, index) => (
                        <Track
                            index={index}
                            handlePlay={handlePlay}
                            isActive={currentTrack.id === track.id}
                            track={track}
                            key={track.id}
                        />
                    ))
                ) : (
                    <div className='mt-2 flex h-full w-full justify-center'>
                        <TailSpin
                            height='60'
                            width='60'
                            color='#A020F0'
                            ariaLabel='tail-spin-loading'
                            radius='0'
                            wrapperStyle={{}}
                            wrapperClass=''
                            visible={true}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchTracks
