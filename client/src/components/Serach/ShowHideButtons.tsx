import React from 'react'
import { IconType } from 'react-icons'

import { service } from '@/constant/services'

import Button from '../buttons/Button'

export interface Contents {
    source: service
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    icon: IconType
}

interface ShowHideButtonsProps {
    objects: Contents[]
}

export const ShowHideButtons: React.FC<ShowHideButtonsProps> = ({
    objects,
}) => {
    const upperCase = (source: string) => {
        return source.charAt(0).toUpperCase() + source.substring(1)
    }
    return (
        <div className='flex space-x-4'>
            {objects.map((object) => (
                <Button
                    variant='outline'
                    leftIcon={object.icon}
                    source={object.source}
                    key={object.source}
                    onClick={() => object.setShow(!object.show)}
                >
                    {!object.show ? 'Show ' : 'Hide '}
                    {upperCase(object.source)}
                </Button>
            ))}
        </div>
    )
}

export default ShowHideButtons
