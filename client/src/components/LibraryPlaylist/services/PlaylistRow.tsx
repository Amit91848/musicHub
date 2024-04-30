import clsx from 'clsx'
import React from 'react'

import { CommonPlaylist, source } from '@/constant/services'

import PlaylistCard from './PlaylistCard'

interface PlaylistRowProps {
    source: source
    playlists: CommonPlaylist[]
}

export const PlaylistRow: React.FC<PlaylistRowProps> = ({
    source,
    playlists,
}) => {
    return (
        <div className='text-white'>
            {' '}
            <div
                className={clsx(
                    source === 'spotify' && 'text-lime-300/70',
                    source === 'youtube' && 'text-red-300/70',
                    source === 'soundcloud' && 'text-orange-300/70',
                    'font-eliteSpecial text-3xl'
                )}
            >
                {source.charAt(0).toUpperCase() + source.slice(1)} Playlist
            </div>
            <div className='mt-3 grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-5'>
                {playlists?.map((playlist) => (
                    <PlaylistCard
                        source={source}
                        playlist={playlist}
                        key={playlist.playlistId}
                    />
                ))}
            </div>
        </div>
    )
}

export default PlaylistRow
