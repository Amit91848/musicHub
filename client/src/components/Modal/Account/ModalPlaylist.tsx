import React from 'react'
import { useSelector } from 'react-redux'

import Source from '@/components/Sidebar/Playlist/Source'

import { RootState } from '@/store/store'

import { CommonPlaylist, source } from '@/constant/services'

interface ModalPlaylistProps {
    active: source | 'settings'
}

export const ModalPlaylist: React.FC<ModalPlaylistProps> = ({ active }) => {
    const { spotify, youtube, soundcloud } = useSelector(
        (state: RootState) => state.library.playlists
    )

    let playlists: CommonPlaylist[]
    switch (active) {
        case 'soundcloud':
            playlists = soundcloud
            break
        case 'spotify':
            playlists = spotify
            break
        case 'youtube':
            playlists = youtube
            break
        default:
            playlists = []
    }
    return (
        <div className='mt-5'>
            <div className='border-b border-b-borderGray px-5 pb-2 text-xl '>
                Your {active.charAt(0).toUpperCase() + active.slice(1)} Playlist
            </div>
            <div className='mt-3'>
                {active !== 'settings' && (
                    <Source playlists={playlists} source={active} />
                )}
            </div>
        </div>
    )
}

export default ModalPlaylist
