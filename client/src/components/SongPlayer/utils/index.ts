import axios from "axios"

export const useSpotifyWebPlaybackSDKScript = () => {
    if (typeof window !== 'undefined') {
        if (!window.Spotify) {
            appendSpotifySDKScriptToDOM()
        }
    }
}

export const appendSpotifySDKScriptToDOM = () => {
    const spotifyScript = document.createElement('script')
    spotifyScript.id = 'spotify-script'
    spotifyScript.src = 'https://sdk.scdn.co/spotify-player.js'
    document.head.append(spotifyScript)
}

export const fetchAccessToken = async (): Promise<string> => {

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const token = await axios.get(`${backendURL}/api/spotify/access_token`, { withCredentials: true });
    return token.data;
}