import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import clsxm from '@/lib/clsxm'

import { play } from '@/store/reducers/player'
import { RootState, useAppDispatch } from '@/store/store'

import { artistInfo, CommonTracks, lastFmArtistInfo } from '@/constant/services'

import Track from '../PlaylistPage/Track'

// interface ContainerProps {}

export const ArtistContainer: React.FC = () => {
    const router = useRouter()
    const { source, artistId, artistName } = router.query
    const [artistInfo, setArtistInfo] = useState<lastFmArtistInfo>()
    const [artistOtherTracks, setArtistOtherTracks] = useState<CommonTracks[]>(
        []
    )
    const [showMore, setShowMore] = useState(false)
    const [artistTopTracks, setArtistTopTracks] = useState<CommonTracks[]>([])

    const dispatch = useAppDispatch()

    const toggleShowMore = () => {
        setShowMore(!showMore)
    }

    const handlePlay = (track: CommonTracks, queue?: CommonTracks[]) => {
        dispatch(play({ track, trackList: queue }))
    }

    const { currentTrack } = useSelector((state: RootState) => state.player)

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const fetchArtistInfo = async () => {
        const response: { data: artistInfo } = await axios.get(
            `${backendURL}/api/${source}/artist/${artistId}/${artistName}`,
            { withCredentials: true }
        )
        const { artistInfo, otherTracks, topTracks } = response.data

        setArtistInfo(artistInfo)
        setArtistTopTracks(topTracks)
        setArtistOtherTracks(otherTracks)
    }

    useEffect(() => {
        if (artistName) {
            fetchArtistInfo()
        }
        //eslint-disable-next-line
    }, [artistName])
    return (
        // <div className='flex h-full w-full overflow-scroll bg-darkSupport py-10 text-lightSupport transition'>
        // <div className='mx-auto h-fit w-[95%] space-y-9 rounded-lg bg-dark p-9'>
        <div className='space-y-14'>
            <div className='flex gap-3'>
                <div
                    className='h-40 w-40 rounded-full border'
                    style={{
                        backgroundImage: `url(${artistInfo?.artist.image[0]['#text']})`,
                    }}
                ></div>
                <div>
                    <div>{artistName}</div>
                    <div>{artistInfo?.artist.stats.listeners}</div>
                </div>
            </div>
            <div>
                <div className='text-2xl'>About the Artist</div>
                <div className='mt-2 text-xs'>
                    {showMore
                        ? artistInfo?.artist.bio.content
                        : artistInfo?.artist.bio.content.slice(0, 200) + '...'}
                    <span
                        onClick={toggleShowMore}
                        className={clsxm('ml-3 cursor-pointer underline')}
                    >
                        Show {showMore ? 'Less' : 'More'}
                    </span>{' '}
                </div>
            </div>
            <div className='grid w-full grid-cols-2 '>
                <div className=''>
                    <div className='text-2xl'> Tags </div>
                    <div className='mt-2 flex text-xs'>
                        {artistInfo?.artist.tags.tag.map((tag, index) => {
                            return (
                                <div key={index + tag.name}>
                                    {index != 0 && ', '}
                                    {tag.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <div className='text-2xl'>Similar Artist</div>
                    <div className='mt-2 flex text-xs'>
                        {artistInfo?.artist.similar.artist.map(
                            (artist, index) => {
                                return (
                                    <div key={index + artist.name}>
                                        {index !== 0 && ', '}
                                        {artist.name}
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div className='text-2xl'>{artistName}'s Top Tracks</div>
                <div className='mt-1 w-full border-t'></div>
                {artistTopTracks?.map((track, index) => (
                    <Track
                        index={index}
                        isActive={track.id === currentTrack.id}
                        key={track.id}
                        track={track}
                        handlePlay={handlePlay}
                    />
                ))}
            </div>
            <div>
                <div className='text-2xl'>{artistName}'s Other Tracks</div>
                <div className='mt-1 w-full border-t'></div>
                {artistOtherTracks?.map((track, index) => (
                    <Track
                        index={index}
                        isActive={track.id === currentTrack.id}
                        key={track.id}
                        track={track}
                        handlePlay={handlePlay}
                    />
                ))}
            </div>
        </div>
    )
}

export default ArtistContainer
