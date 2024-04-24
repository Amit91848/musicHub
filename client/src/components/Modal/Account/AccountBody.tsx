import React from 'react'
import { useSelector } from 'react-redux'

import { CommonProfile } from '@/store/reducers/user'
import { RootState } from '@/store/store'

import AccountInfo from './AccountInfo'

interface AccountBodyProps {
    active: string
}

export const AccountBody: React.FC<AccountBodyProps> = ({ active }) => {
    const { soundcloud, spotify, youtube } = useSelector(
        (state: RootState) => state.user
    )
    let profile: CommonProfile | undefined

    switch (active) {
        case 'youtube':
            profile = youtube
            break
        case 'spotify':
            profile = spotify
            break
        case 'soundcloud':
            profile = soundcloud
            break
        default:
            break
    }
    return (
        <div className='px-10 pb-16'>
            {(active === 'soundcloud' ||
                active === 'spotify' ||
                active === 'youtube') && (
                <AccountInfo active={active} profile={profile} />
            )}
        </div>
    )
}

export default AccountBody
