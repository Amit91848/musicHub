import React from 'react'
import { useSelector } from 'react-redux'

import ArtistLink from '@/components/PlaylistPage/ArtistLink'
import Source from '@/components/Sidebar/Playlist/Source'

import { RootState } from '@/store/store'

// interface PlaylistBodyProps {}

export const PlaylistBody: React.FC = () => {
    const track = useSelector((state: RootState) => state.user.selectedTrack)
    const playlists = useSelector((state: RootState) => state.library.playlists)
    let url = ''
    if (track.img[0]) {
        url = track.img[1].url
    }
    return (
        <div className='flex flex-col space-y-10 overflow-scroll px-14 py-8'>
            <div className='mx-auto text-center'>
                <div
                    style={{ backgroundImage: `url(${url})` }}
                    className=' h-32 rounded bg-cover bg-center bg-no-repeat transition duration-200 group-hover:brightness-50'
                ></div>
                <div>{track.title}</div>
                <div>
                    {track.artist.map((a, index) => (
                        <ArtistLink
                            key={a.id}
                            artist={a}
                            source={track.source}
                            index={index}
                        />
                    ))}{' '}
                </div>
            </div>
            <div>
                <Source
                    source={track.source}
                    playlists={playlists[track.source]}
                    link={false}
                />
            </div>
        </div>
    )
}

export default PlaylistBody
