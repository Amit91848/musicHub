import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { changeTrack } from '@/store/reducers/player'
import { RootState, useAppDispatch } from '@/store/store'

import PlayerUI from './PlayerUI'
import SpotifyPlayer from './SpotifyPlayer'
import { SpotifyWebPlaybackSDK } from './utils/SpotifyWebPlaybackSDK'
import YoutubePlayer from './YoutubePlayer'

// interface PlayerProps {}

export const Player: React.FC = () => {
    const { shuffleEnabled, currentTrack, isPlaying, volume, allowAutoplay } =
        useSelector((state: RootState) => state.player)
    const [inputSeekPosition, setInputSeekPosition] = useState(0)
    const [songPosition, setSongPosition] = useState(0)
    const [isUserSeeking, setIsUserSeeking] = useState<boolean>(false)
    const spotifyPlayer = useRef<SpotifyWebPlaybackSDK | null>(null)
    const youtubePlayer = useRef<YT.Player>()

    const dispatch = useAppDispatch()

    const handleSeek = (newTime: number) => {
        const { source } = currentTrack

        if (source === 'spotify') {
            spotifyPlayer.current?.seek(newTime)
        } else if (source === 'youtube') {
            youtubePlayer.current?.seekTo(newTime / 1000, true)
        }
    }

    const handleOnEnd = () => {
        if (allowAutoplay) {
            handleSeek(0)
        } else {
            dispatch(changeTrack(1))
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying) {
                if (currentTrack.source === 'spotify') {
                    if (spotifyPlayer.current) {
                        setSongPosition(spotifyPlayer.current.getPosition())
                    }
                } else if (currentTrack.source === 'youtube') {
                    if (youtubePlayer.current) {
                        setSongPosition(
                            Math.round(
                                youtubePlayer.current?.getCurrentTime() * 1000
                            )
                        )
                    }
                }
            }
        }, 500)

        return () => {
            clearInterval(interval)
        }
        //eslint-disable-next-line
    }, [isUserSeeking, isPlaying, currentTrack])

    return (
        <>
            <div className=''>
                <YoutubePlayer
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    volume={volume}
                    forwardRef={youtubePlayer}
                    handleOnEnd={handleOnEnd}
                />
            </div>
            <div className='absolute bottom-0 z-10 mt-3 w-full bg-dark'>
                <PlayerUI
                    inputSeekPosition={inputSeekPosition}
                    setInputSeekPosition={setInputSeekPosition}
                    shuffleEnabled={shuffleEnabled}
                    handleSeek={handleSeek}
                    isUserSeeking={isUserSeeking}
                    setIsUserSeeking={setIsUserSeeking}
                    songPosition={songPosition}
                />
                <SpotifyPlayer
                    spotifyRef={spotifyPlayer}
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    handleOnEnd={handleOnEnd}
                />
            </div>
        </>
    )
}

export default Player
