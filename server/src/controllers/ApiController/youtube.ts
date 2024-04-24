import axios from "axios";
import { youtubePlaylistItemsResponse, youtubeVideosQuery } from "src/types/youtube";
import { fetchProfileAndSetAccessToken } from "../../utils/services";

const youtubeURL = process.env.YOUTUBE_BASE_URL;
const youtubeKey = process.env.YOUTUBE_API_KEY;
export const getYoutubePlaylists = async (userId: string) => {
    const accessToken = await fetchProfileAndSetAccessToken(userId, 'youtube');
    let playlistsInfo;

    try {
        const response = await axios.get(`${youtubeURL}/playlists?part=snippet%2CcontentDetails&maxResults=50&mine=true&key=${youtubeKey}&access_token=${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        playlistsInfo = await response.data.items;
    } catch (err) {
        console.log(err.data);
    }

    return playlistsInfo;
}

export const getYoutubePlaylistsItems = async (playlistId: string, userId: string): Promise<youtubePlaylistItemsResponse[]> => {
    const accessToken = await fetchProfileAndSetAccessToken(userId, 'youtube');
    let playlistsItems: youtubePlaylistItemsResponse[];

    try {
        const response = await axios.get(`${youtubeURL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistId}&key=${youtubeKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        playlistsItems = response.data.items;
        return playlistsItems;
    } catch (err) {
        console.log(err.data);
        return [];
    }
}

export const getYoutubeSearchQuery = async (query: string, userId: string) => {
    const accessToken = await fetchProfileAndSetAccessToken(userId, 'youtube');
    try {
        const response = await axios.get(`${youtubeURL}/search?part=snippet&maxResults=20&q=${query}&key=${youtubeKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data;
    } catch (err) {
        return err;
    }
}

export const addTrackToYoutubePlaylist = async (userId: string, trackId: string, playlistId: string) => {
    const accessToken = await fetchProfileAndSetAccessToken(userId, 'youtube');
    try {
        const response = await axios.post(`${youtubeURL}/playlistItems?part=snippet&key=${youtubeKey}`, {
            snippet: {
                playlistId: playlistId,
                resourceId: {
                    kind: 'youtube#video',
                    videoId: trackId
                }
            }
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (err) {
        console.log(err.response.data);
    }
}

export const getYoutubeVideoLength = async (id: string, userId: string): Promise<youtubeVideosQuery[]> => {
    const accessToken = await fetchProfileAndSetAccessToken(userId, 'youtube');
    try {
        const response = await axios.get(`${youtubeURL}/videos?part=contentDetails&maxResults=50&id=${id}&key=${youtubeKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.items;
    } catch (err) {
        // console.log('error ', err);
        throw new Error(err);
    }
}