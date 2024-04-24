import React from 'react'
import { FaSyncAlt } from 'react-icons/fa'

import clsxm from '@/lib/clsxm'

import { CommonProfile } from '@/store/reducers/user'

import { source } from '@/constant/services'

import LinkAccount from './LinkAccount'
import ModalPlaylist from './ModalPlaylist'
import UnlinkAccount from './UnlinkAccount'

interface AccountInfoProps {
    profile: CommonProfile | undefined
    active: source
}

export const AccountInfo: React.FC<AccountInfoProps> = ({
    profile,
    active,
}) => {
    const img = profile?.image === '' ? '/images/account.png' : profile?.image
    return (
        <div className='flex flex-col justify-between'>
            <div className='flex  items-center justify-between gap-3 py-6 '>
                <div
                    style={{ backgroundImage: `url(${img})` }}
                    className='h-16 w-16 min-w-[4rem] rounded-lg bg-cover bg-center bg-no-repeat'
                ></div>
                <div className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs'>
                    <div className='mb-2'>{profile?.username}</div>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href={profile?.profileUrl || ''}
                        className='cursor-pointer transition hover:text-white'
                    >
                        {profile?.profileUrl}
                    </a>
                </div>
                <div
                    className={clsxm(
                        profile?.isConnected
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed'
                    )}
                >
                    <FaSyncAlt size={25} />
                </div>
            </div>
            <div className='flex-1'>
                <ModalPlaylist active={active} />
            </div>
            <div>
                {!profile?.isConnected &&
                    (active === 'soundcloud' ||
                        active === 'spotify' ||
                        active === 'youtube') && (
                        <LinkAccount active={active} />
                    )}
                {profile?.isConnected &&
                    (active === 'soundcloud' ||
                        active === 'spotify' ||
                        active === 'youtube') && (
                        <UnlinkAccount active={active} />
                    )}
            </div>
        </div>
    )
}

export default AccountInfo
