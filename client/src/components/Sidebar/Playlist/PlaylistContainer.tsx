import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

// import { libraryData } from '@/constant/services'
import Source from './Source'

// interface PlaylistsProps {}

export const PlaylistContainer: React.FC = () => {
    const { spotify, youtube, soundcloud } = useSelector(
        (state: RootState) => state.library.playlists
    )

    return (
        <>
            <div className='mt-4 ml-5 self-start font-eliteSpecial text-xl'>
                Playlists
            </div>
            <div className='mt-5 h-full w-full overflow-y-scroll text-center'>
                <div className='flex scrollbar-hide'>
                    <div className='mx-auto w-11/12 p-1'>
                        <Source source='spotify' playlists={spotify} />
                        <Source source='youtube' playlists={youtube} />
                        <Source source='soundcloud' playlists={soundcloud} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaylistContainer
