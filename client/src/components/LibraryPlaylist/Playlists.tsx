import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

import PlaylistRow from './services/PlaylistRow'

export const Playlists: React.FC = () => {
    const playlists = useSelector((state: RootState) => state.library.playlists)

    return (
        <div className='space-y-9'>
            {playlists.spotify.length !== 0 && (
                <PlaylistRow source='spotify' playlists={playlists.spotify} />
            )}
            {playlists.youtube.length !== 0 && (
                <PlaylistRow source='youtube' playlists={playlists.youtube} />
            )}
            {playlists.soundcloud.length !== 0 && (
                <PlaylistRow
                    source='soundcloud'
                    playlists={playlists.soundcloud}
                />
            )}
        </div>
    )
}

export default Playlists
