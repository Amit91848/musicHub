import axios from 'axios'
import React from 'react'
import { MdNoAccounts } from 'react-icons/md'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

import { source } from '@/constant/services'

interface UnlinkAccountProps {
    active: source
}

export const UnlinkAccount: React.FC<UnlinkAccountProps> = ({ active }) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const { soundcloud, youtube, spotify } = useSelector(
        (state: RootState) => state.user
    )

    const canUserSafelyRemove = () => {
        const connectedAccount = [
            soundcloud.isConnected,
            youtube.isConnected,
            spotify.isConnected,
        ].filter(Boolean)
        if (connectedAccount.length === 1) return false
        return true
    }

    const handleRemoveAccount = async () => {
        if (canUserSafelyRemove()) {
            await axios.get(
                `${backendURL}/api/user/remove?provider=${active}`,
                { withCredentials: true }
            )
        }
    }

    return (
        <div className='mt-7 flex justify-center'>
            <button
                className='flex h-11 w-fit items-center gap-3 border border-red-900 bg-red-900/30 py-3 px-4 font-light shadow-2xl transition duration-300 hover:scale-105'
                onClick={handleRemoveAccount}
            >
                {' '}
                <MdNoAccounts size={25} /> Remove Account
            </button>
        </div>
    )
}

export default UnlinkAccount
