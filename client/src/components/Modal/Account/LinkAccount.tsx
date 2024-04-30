import React from 'react'
import { IconType } from 'react-icons'
import { BsSpotify, BsYoutube } from 'react-icons/bs'
import { FaSoundcloud } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import ButtonLink from '@/components/links/ButtonLink'

import { RootState } from '@/store/store'
import { source } from '@/constant/services'

interface LinkAccountProps {
    active: source
}

export const LinkAccount: React.FC<LinkAccountProps> = ({ active }) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const icon: IconType =
        active === 'soundcloud'
            ? FaSoundcloud
            : active === 'spotify'
                ? BsSpotify
                : BsYoutube
    return (
        <div className='mt-3 flex justify-center'>
            <ButtonLink
                href={`${backendURL}/auth/${active === 'youtube' ? 'google' : active
                    }/link`}
                className='h-11 w-4/6 border py-6 px-4 text-[1px] font-light shadow-2xl'
                variant='outline'
                leftIcon={icon}
                source={
                    active === 'soundcloud' ||
                        active === 'spotify' ||
                        active === 'youtube'
                        ? active
                        : 'spotify'
                }
            >
                Connect to {active.charAt(0).toUpperCase() + active.slice(1)}
            </ButtonLink>
        </div>
    )
}

export default LinkAccount
