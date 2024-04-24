import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

import { CommonPlaylist } from '@/constant/services'

import SinglePlaylist from './SinglePlaylist'

interface SpotifyProps {
    source: 'youtube' | 'spotify' | 'soundcloud'
    playlists: CommonPlaylist[]
    link?: boolean
}

export const Source: React.FC<SpotifyProps> = ({
    source,
    playlists,
    link = true,
}) => {
    if (playlists.length === 0) {
        return <div></div>
    } else {
        return (
            <div
                className={clsx(
                    ' space-y-4 rounded-lg px-5 py-2 text-sm transition duration-300 scrollbar-hide',
                    source === 'spotify' && 'hover:bg-green-900/30',
                    source === 'youtube' && 'hover:bg-red-900/20',
                    source === 'soundcloud' && 'hover:bg-orange-500/10'
                )}
            >
                {playlists?.map((playlist) => (
                    <div key={playlist.playlistId}>
                        {link ? (
                            <Link
                                href={`/library/playlist/${source}/${playlist.playlistId}`}
                            >
                                <SinglePlaylist playlist={playlist} />
                            </Link>
                        ) : (
                            <SinglePlaylist link={false} playlist={playlist} />
                        )}
                    </div>
                ))}
            </div>
        )
    }
}

export default Source
