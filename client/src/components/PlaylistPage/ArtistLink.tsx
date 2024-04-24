import Link from 'next/link'
import React from 'react'

import { CommonTracks, service } from '@/constant/services'

interface ArtistLinkProps {
    artist: CommonTracks['artist'][0]
    source: service
    index: number
    className?: string
}

export const ArtistLink: React.FC<ArtistLinkProps> = ({
    artist,
    source,
    index,
    className,
}) => {
    return (
        <>
            {index === 0 ? '' : ', '}
            <Link
                className={`${className} overflow-hidden text-ellipsis whitespace-nowrap text-xs text-yellow-500 hover:underline`}
                href={`/library/artist/${source}/${artist.id}/${artist.name}`}
            >
                {artist.name}
            </Link>
        </>
    )
}

export default ArtistLink
