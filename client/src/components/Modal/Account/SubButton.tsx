import React from 'react'
import { useSelector } from 'react-redux'

import clsxm from '@/lib/clsxm'

import ServiceIcon from '@/components/ServiceIcon/ServiceIcon'

import { updateActive } from '@/store/reducers/user'
import { RootState, useAppDispatch } from '@/store/store'

import { service } from '@/constant/services'

interface SubButtonProps {
    type: service | 'settings'
}

export const SubButton: React.FC<SubButtonProps> = ({ type }) => {
    const { active } = useSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    return (
        <div
            className={clsxm(
                'flex cursor-pointer items-center rounded-t-lg px-3 transition duration-300',
                active === type
                    ? 'scale-105 border border-borderGray bg-queueBg'
                    : ''
            )}
            onClick={() => dispatch(updateActive(type))}
        >
            <span>
                <ServiceIcon source={type} />
            </span>
            <span className='ml-1 text-sm font-light hover:text-white'>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
        </div>
    )
}

export default SubButton
