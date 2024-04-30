import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'

import { loadTracksOnPlaylist } from '@/store/reducers/library'
import { play } from '@/store/reducers/player'
import { useAppDispatch } from '@/store/store'

import { CommonPlaylist, CommonTracks, source } from '@/constant/services'

interface PlaylistCardProps {
    playlist: CommonPlaylist
    source: source
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
    playlist,
    source,
}) => {
    const dispatch = useAppDispatch()
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const fetchTracks = async () => {
        const response = await axios.get<CommonTracks[]>(
            `${backendURL}/api/${source}/playlist/${playlist.playlistId}/tracks`,
            {
                withCredentials: true,
            }
        )
        const tracks = response.data
        dispatch(
            loadTracksOnPlaylist({
                tracks: tracks,
                playlistId: playlist.playlistId,
                source: source,
            })
        )
        return tracks;
    }
    const handlePlayPlaylist = async (
        e: React.MouseEvent<SVGElement, MouseEvent>
    ) => {
        e.preventDefault()
        const tracks = playlist.tracks.length === 0 ? await fetchTracks() : playlist.tracks;
        dispatch(play({ playlist, track: tracks[0], trackList: tracks }))
    }
    const { playlistId, img, name, total } = playlist;
    return (
        <Link
            href={`/library/playlist/${source.toLowerCase()}/${playlistId
                }`}
        >
            <div className='align-center group group flex h-fit w-full cursor-pointer flex-col justify-center space-y-5 rounded-lg bg-[#1e2629] p-6 transition duration-300 hover:bg-[#2f3638]'>
                <div className='relative flex items-center justify-center'>
                    <BsFillPlayFill
                        className='invisible absolute z-10 group-hover:visible'
                        size='80px'
                        onClick={(e) => handlePlayPlaylist(e)}
                    />
                    <div
                        style={{
                            backgroundImage: `url(${img[0] ? img[0].url : ''
                                })`,
                        }}
                        className='h-28 w-28 rounded-lg border-[2px] border-gray-700  bg-cover bg-center bg-no-repeat group-hover:brightness-75'
                    ></div>
                </div>
                <div className='overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm'>
                    {name}
                    <div className='mt-1 font-primary text-xs text-gray-400/50'>
                        {total} tracks
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaylistCard
