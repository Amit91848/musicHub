import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillSound } from 'react-icons/ai'
import { useSelector } from 'react-redux'

import logger from '@/lib/logger'

import ServiceIcon from '@/components/ServiceIcon/ServiceIcon'

import { RootState } from '@/store/store'

import { CommonPlaylist } from '@/constant/services'
interface SinglePlaylistProps {
    playlist: CommonPlaylist
    link?: boolean
}

export const SinglePlaylist: React.FC<SinglePlaylistProps> = ({
    playlist,
    link,
}) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const playlistPlaying = useSelector(
        (state: RootState) => state.player.playlist
    )
    const { active, selectedTrack } = useSelector(
        (state: RootState) => state.user
    )
    const [isCurrentPlaylistPlaying, setIsCurrentPlaylistPlaying] =
        useState(false)

    const handleAddSongToPlaylist = async () => {
        await axios.post(
            `${backendURL}/api/${selectedTrack.source}/playlist/${playlist.playlistId}`,
            { trackUri: `${selectedTrack.source}:track:${selectedTrack.id}` },
            { withCredentials: true }
        )
    }

    useEffect(() => {
        setIsCurrentPlaylistPlaying(playlistPlaying.id === playlist.playlistId)
        //eslint-disable-next-line
    }, [playlistPlaying])
    return (
        <div
            onClick={() => {
                if (link === false) {
                    handleAddSongToPlaylist()
                }
            }}
            className='group flex w-full cursor-pointer items-center justify-between text-left transition hover:scale-105 hover:text-white'
        >
            <div
                className='overflow-hidden text-ellipsis whitespace-nowrap
                    font-light tracking-wide'
            >
                {playlist.name}
            </div>
            {!isCurrentPlaylistPlaying ? (
                <ServiceIcon
                    className='ml-3 hidden duration-300 group-hover:flex'
                    size={18}
                    source={playlist.source}
                    disabled
                />
            ) : (
                <AiFillSound size={16} />
            )}
        </div>
    )
}

export default SinglePlaylist
