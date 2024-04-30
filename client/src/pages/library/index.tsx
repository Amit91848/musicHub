import axios from 'axios'
import * as React from 'react'

import Playlists from '@/components/LibraryPlaylist/Playlists'

import { updatePlaylists } from '@/store/reducers/library'
import { useAppDispatch } from '@/store/store'
import Layout from '@/components/layout/Layout'

export default function LibraryPage() {
    const dispatch = useAppDispatch()
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const getAllPlaylists = async (sync: boolean | undefined) => {
        const res = await axios.get(
            `${backendURL}/api/playlists?sync=${sync}`,
            {
                withCredentials: true,
            }
        )

        dispatch(updatePlaylists(res.data))
    }
    React.useEffect(() => {
        getAllPlaylists(undefined)
        //eslint-disable-next-line
    }, [])
    return (
        <>
            <Layout>
                <button onClick={() => getAllPlaylists(true)}> Sync </button>
                <Playlists />
            </Layout>
        </>
    )
}
