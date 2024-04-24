import React, { useEffect, useRef, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

import { CommonTracks } from '@/constant/services'

interface YoutubePlayerProps {
    currentTrack: CommonTracks
    isPlaying: boolean
    volume: number
    forwardRef: React.MutableRefObject<YT.Player | undefined>
    handleOnEnd: () => void
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
    currentTrack,
    isPlaying,
    volume,
    forwardRef,
    handleOnEnd,
}) => {
    const [videoId, setVideoId] = useState<string | undefined>(undefined)
    const player = useRef<YT.Player>()

    const onStateChange: YouTubeProps['onStateChange'] = (event) => {
        if (event.data === YT.PlayerState.ENDED) {
            handleOnEnd()
        }
    }

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            controls: 0,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            autoplay: isPlaying ? 1 : 0,
        },
    }

    useEffect(() => {
        if (currentTrack.source === 'youtube') {
            setVideoId(currentTrack.id)
        } else {
            setVideoId(undefined)
        }
    }, [currentTrack])

    useEffect(() => {
        if (player.current) {
            if (isPlaying && currentTrack.source === 'youtube') {
                player.current.playVideo()
            } else {
                player.current.pauseVideo()
            }
        }
        // eslint-disable-next-line
    }, [isPlaying])

    useEffect(() => {
        if (player.current && currentTrack.source === 'youtube') {
            player.current.setVolume(volume * 100)
        }
        // eslint-disable-next-line
    }, [volume])

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        forwardRef.current = event.target
        player.current = event.target
    }

    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onStateChange}
        />
    )
}

export default YoutubePlayer
