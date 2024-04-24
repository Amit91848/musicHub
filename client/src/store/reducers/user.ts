import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CommonTracks, source } from "@/constant/services";

export interface initialState {
    // user: {
    active: source | 'settings' | 'playlists' | 'queue'
    spotify: CommonProfile,
    youtube: CommonProfile,
    soundcloud: CommonProfile
    selectedTrack: CommonTracks
    // }
}

// export interface updateUser {
//     spotify: 
// }

export interface CommonProfile {
    isConnected: boolean,
    id: string | null,
    profileUrl: string | null,
    username: string | null,
    image: string | null
}

interface activeProp {
    active: source | 'settings' | 'playlists' | 'queue'
    track?: CommonTracks
}

const commonProfileTemplate: CommonProfile = {
    isConnected: false,
    id: null,
    profileUrl: null,
    username: null,
    image: null
}

const commonTrackTemplate: CommonTracks = {
    album: {
        id: '',
        title: '',
    },
    artist: [{ id: '', name: '' }],
    duration: 0,
    id: '',
    img: [{ height: null, url: '', width: null }],
    source: 'spotify',
    title: ''
}


const initialState: initialState = {
    // user: {
    active: 'settings',
    selectedTrack: { ...commonTrackTemplate },
    spotify: { ...commonProfileTemplate },
    soundcloud: { ...commonProfileTemplate },
    youtube: { ...commonProfileTemplate }
    // }
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        updateUser: (state, action: PayloadAction<initialState>) => {
            //eslint-disable-next-line
            const { soundcloud, spotify, youtube } = action.payload
            return state = {
                ...state,
                spotify: { ...spotify },
                soundcloud: { ...soundcloud },
                youtube: { ...youtube }
            }
        },
        updateActive: (state, action: PayloadAction<activeProp>) => {
            if (action.payload.track) {
                return state = {
                    ...state,
                    active: action.payload.active,
                    selectedTrack: action.payload.track
                }
            } else {
                return state = {
                    ...state,
                    active: action.payload.active,
                }
            }
        }
    }
})

export const { updateUser, updateActive } = userSlice.actions;
export default userSlice.reducer;
