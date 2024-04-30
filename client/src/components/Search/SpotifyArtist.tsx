import Link from 'next/link'
import React from 'react'
import { BsSpotify } from 'react-icons/bs'

import { SpotifyArtists } from '@/constant/services'

interface SpotifyArtistsProps {
    artist: SpotifyArtists['items'][0]
}

export const SpotifyArtist: React.FC<SpotifyArtistsProps> = ({ artist }) => {
    return (
        <Link
            href={`/library/artist/spotify/${artist.id}/${artist.name}`}
            className='h-fit w-full '
        >
            <div
                className='mx-auto flex h-[100px] w-[100px] cursor-pointer  items-end justify-end rounded-full bg-cover bg-center bg-no-repeat transition duration-300 hover:shadow-spotify'
                style={{ backgroundImage: `url(${artist.images[0]?.url})` }}
            >
                <BsSpotify
                    opacity={0.8}
                    color='#1DB954'
                    size={32}
                    className='mr-2'
                />
            </div>
            <div className='mt-2 text-center'>{artist.name}</div>
        </Link>
    )
}

export default SpotifyArtist
