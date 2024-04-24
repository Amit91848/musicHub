import React from 'react'
import { BsSpotify, BsYoutube } from 'react-icons/bs'
import { CiSettings } from 'react-icons/ci'
import { FaSoundcloud } from 'react-icons/fa'

import { source } from '@/constant/services'

interface ServiceIconProps {
    source: source | 'settings'
    size?: number | string | undefined
    className?: string
    disabled?: boolean
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
    source,
    size,
    className,
    disabled,
}) => {
    return (
        <div className={className}>
            {source === 'spotify' && (
                <BsSpotify color={!disabled ? '#1DB954' : ''} size={size} />
            )}
            {source === 'youtube' && (
                <BsYoutube
                    color={!disabled ? `#FF0000` : ''}
                    size={Number(size) + 2}
                />
            )}
            {source === 'soundcloud' && (
                <FaSoundcloud
                    color={!disabled ? '#ff7700' : ''}
                    size={Number(size) + 6}
                />
            )}
            {source === 'settings' && <CiSettings size={Number(size)} />}
        </div>
    )
}

export default ServiceIcon
