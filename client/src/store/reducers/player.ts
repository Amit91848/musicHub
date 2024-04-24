import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CommonPlaylist, CommonTracks } from "@/constant/services"

interface initialState {
    currentTrack: CommonTracks,
    isMuted: boolean,
    duration: number,
    seek: number,
    isPlaying: boolean,
    volume: number,
    index: number,
    queue: CommonTracks[],
    userQueueIndex: number,
    userQueue: CommonTracks[],
    playlist: {
        source: string,
        id: string
    },
    nextHref: null | string,
    seekAmount: number,
    isPlayerExpanded: boolean,
    allowAutoplay: boolean,
    shuffleEnabled: boolean,
    repeatEnabled: boolean,
    showYoutubePlayer: boolean
}

interface Play {
    track: CommonTracks
    playlist?: CommonPlaylist
    trackList?: CommonTracks[]
}

const initialState: initialState = {
    currentTrack: {
        id: "",
        album: {
            id: "",
            title: ""
        },
        artist: [],
        duration: 0,
        img: [],
        source: "spotify",
        title: "Not Playing"
    },
    isMuted: false,
    duration: 0,
    seek: 15,
    isPlaying: false,
    volume: 0.5,
    index: 0,
    queue: [],
    userQueueIndex: 0,
    userQueue: [],
    playlist: {
        source: "",
        id: ""
    },
    nextHref: null,
    seekAmount: 15,
    isPlayerExpanded: false,
    allowAutoplay: true,
    shuffleEnabled: false,
    repeatEnabled: false,
    showYoutubePlayer: false
}

const player = createSlice({
    initialState: initialState,
    name: 'player',
    reducers: {
        play: (state, action: PayloadAction<Play>) => {
            const { playlist, track, trackList } = action.payload;

            // playing from playlists
            if (playlist) {
                const queue = playlist.tracks;
                const index = queue.findIndex((q) => track.id === q.id);

                const currentPlaylistId = state.playlist.id

                // play new track from same playlist
                if (playlist.playlistId === currentPlaylistId) {
                    return state = {
                        ...state,
                        index,
                        isPlaying: true,
                        currentTrack: { ...track },
                        duration: track.duration,
                        queue: [...queue]
                    }
                } else {
                    // empty user queue and change playlist details
                    return state = {
                        ...state,
                        index,
                        currentTrack: { ...track },
                        isPlaying: true,
                        queue: [...queue],
                        playlist: {
                            id: playlist.playlistId,
                            source: playlist.source
                        },
                        duration: track.duration,
                        userQueue: [],
                        userQueueIndex: 0
                    }
                }
            } else if (trackList) {
                // playing from search page
                const queue = trackList;
                const index = queue.findIndex((q) => track.id === q.id);

                return state = {
                    ...state,
                    index,
                    isPlaying: true,
                    currentTrack: { ...track },
                    duration: track.duration,
                    queue: [...queue],
                    playlist: {
                        id: '',
                        source: track.source
                    }
                }
            }
        },
        changeTrack: (state, action: PayloadAction<number>) => {
            const { index, userQueue, userQueueIndex, shuffleEnabled } = state;

            // Songs in user queue
            if (userQueueIndex < userQueue.length && action.payload === 1) {
                const nextTrack = userQueue[userQueueIndex];

                return state = {
                    ...state,
                    userQueueIndex: userQueueIndex + 1,
                    allowAutoplay: false,
                    duration: nextTrack.duration,
                    isPlaying: true,
                    currentTrack: { ...nextTrack },
                }
            }


            let changeTo: number;


            // No songs in user queue or prev track
            if (shuffleEnabled) {
                changeTo = Math.floor(Math.random() * state.queue.length);
            } else {
                changeTo = (index + action.payload + state.queue.length) % state.queue.length;
            }
            const newTrack = state.queue[changeTo];
            return state = {
                ...state,
                index: changeTo,
                isPlaying: true,
                currentTrack: { ...newTrack },
                duration: newTrack.duration
            }

        },
        toggleShuffle: (state) => {
            return state = {
                ...state,
                shuffleEnabled: !state.shuffleEnabled
            }
        },
        addToQueue: (state, action: PayloadAction<CommonTracks>) => {
            const track = action.payload
            return state = {
                ...state,
                userQueue: [...state.userQueue, track]
            }
        },
        emptyQueue: (state) => {
            return state = {
                ...state,
                userQueueIndex: 0,
                userQueue: []
            }
        },
        handlePlayPause: (state, action: PayloadAction<boolean>) => {
            return state = {
                ...state,
                isPlaying: action.payload
            }
        },
        updateVolume: (state, action: PayloadAction<number>) => {
            return state = {
                ...state,
                volume: action.payload
            }
        },
        toggleAutoPlay: (state) => {
            return state = {
                ...state,
                allowAutoplay: !state.allowAutoplay
            }
        }
    }
})

export const { play, changeTrack, toggleShuffle, addToQueue, emptyQueue, handlePlayPause, updateVolume, toggleAutoPlay } = player.actions
export default player.reducer