import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { SpotifyArtists } from '@/constant/services'

import { SpotifyArtist } from './SpotifyArtist'
import { BACKEND_URL } from '@/constant'

// interface SpotifySearchArtistsProps {}

export const SpotifySearchArtists: React.FC = () => {
    const router = useRouter()
    const { query } = router.query
    const [artists, setArtists] = useState<SpotifyArtists['items']>([])
    useEffect(() => {
        async function fetchArtists() {
            const response = await axios.get(
                `${BACKEND_URL}/api/spotify/search/artist/${query}`,
                { withCredentials: true }
            )
            if (response.status === 200) {
                const artists: SpotifyArtists['items'] = response.data.items
                setArtists(artists?.slice(0, 7))
            }
        }
        fetchArtists()
        //eslint-disable-next-line
    }, [query])
    return (
        <div className='grid h-full w-full grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-x-5 gap-y-3'>
            {artists?.map((artist) => (
                <SpotifyArtist key={artist.id} artist={artist} />
            ))}
        </div>
    )
}

export default SpotifySearchArtists
