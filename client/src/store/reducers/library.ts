import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CommonPlaylist, CommonTracks, service } from '@/constant/services'

export interface initialState {
    playlists: {
        spotify: CommonPlaylist[],
        youtube: CommonPlaylist[],
        soundcloud: CommonPlaylist[]
    }
}

interface LoadTrackOnPlaylistAction {
    tracks: CommonTracks[],
    playlistId: string,
    source: service
}

export interface TrackUpdateAction {
    source: service,
    tracks: CommonTracks[],
    playlistId: string
}

const initialState: initialState = {
    playlists: {
        spotify: [],
        youtube: [],
        soundcloud: []
    }
}

const library = createSlice({
    initialState,
    name: 'library',
    reducers: {
        updatePlaylists: (state, action: PayloadAction<Partial<initialState>>) => {
            state.playlists = { ...state.playlists, ...action.payload.playlists }
        },
        loadTracksOnPlaylist: (state, action: PayloadAction<LoadTrackOnPlaylistAction>) => {
            const { playlistId, source, tracks } = action.payload
            const updatedPlaylists = state.playlists[source].map(playlist => {
                if (playlist.playlistId === playlistId) {
                    return {
                        ...playlist,
                        tracks: tracks
                    }
                }
                return playlist
            })
            state.playlists[source] = updatedPlaylists
        }
    }
})

export const { updatePlaylists, loadTracksOnPlaylist } = library.actions;
export default library.reducer;