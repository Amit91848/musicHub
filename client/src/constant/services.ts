export type source = 'youtube' | 'spotify' | 'soundcloud'
export type service = 'youtube' | 'spotify' | 'soundcloud'


export interface CommonPlaylist {
    playlistId: string,
    description: string,
    img:
    { url: string, width: number | null, height: number | null }[],
    name: string,
    tracks: CommonTracks[],
    isStarred: false,
    isConnected: true,
    total: number,
    source: source
}

export interface libraryData {
    playlists: {
        spotify: CommonPlaylist[],
        youtube: CommonPlaylist[],
        soundcloud: CommonPlaylist[]
    }
}

export interface CommonTracks {
    album: {
        id: string,
        title: string
    },
    artist: {
        id: string,
        name: string,
    }[],
    duration?: number,
    img: {
        height: number | null,
        url: string,
        width: number | null
    }[],
    source: service,
    title: string,
    id: string
}

export interface SpotifyArtists extends SpotifyCommon {
    items: {
        externals_urls: {
            spotify: string,
        },
        followers: {
            href: null,
            total: number,
        },
        genres: string[],
        href: string,
        id: string,
        images: {
            height: number,
            url: string,
            width: number
        }[],
        name: string,
        popularity: 89,
        type: string,
        uri: string
    }[]
}

export interface SpotifyCommon {
    href: string,
    limit: number,
    next: string,
    offset: 0,
    previous: string | null,
    total: number
}

interface lastFmImage {
    '#text': string,
    size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | ''
}

interface lastFmTag {
    name: string,
    url: string
}

export interface lastFmArtistInfo {
    artist: {
        name: string,
        url: string,
        image: lastFmImage[],
        streamable: number,
        ontour: number,
        stats: {
            listeners: string,
            playcount: string
        },
        similar: {
            artist: {
                name: string,
                image: lastFmImage[]
            }[]
        },
        tags: {
            tag: lastFmTag[]
        },
        bio: {
            links: {
                link: {
                    '#text': string,
                    rel: string,
                    href: string
                }
            },
            published: string,
            summary: string,
            content: string
        }
    }
}

export interface artistInfo {
    topTracks: CommonTracks[]
    otherTracks: CommonTracks[]
    artistInfo: lastFmArtistInfo
}
