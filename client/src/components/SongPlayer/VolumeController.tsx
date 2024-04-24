import React, { useState } from 'react'
import {
    BsFillVolumeDownFill,
    BsFillVolumeMuteFill,
    BsFillVolumeUpFill,
} from 'react-icons/bs'
import { MdQueueMusic } from 'react-icons/md'

import { updateVolume } from '@/store/reducers/player'
import { updateActive } from '@/store/reducers/user'
import { useAppDispatch } from '@/store/store'

import QueueModal from './QueueModal'

// interface VolumeControllerProps {}

export const VolumeController: React.FC = () => {
    const [volume, setVolume] = useState(0.5)
    const dispatch = useAppDispatch()

    const [showQueueModal, setShowQueueModal] = useState(false)
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value))
    }

    const handleQueueClick = () => {
        setShowQueueModal(!showQueueModal)
        dispatch(updateActive('queue'))
    }

    const handleUpdateVolume = () => {
        dispatch(updateVolume(volume))
    }

    const handleMute = () => {
        if (volume !== 0) {
            setVolume(0)
        } else {
            setVolume(0.5)
        }
        dispatch(updateVolume(volume))
    }

    return (
        <div className='flex items-center space-x-3 transition duration-700'>
            <div className='mr-2 '>
                <QueueModal
                    setShowQueueModal={setShowQueueModal}
                    showQueueModal={showQueueModal}
                />
                <MdQueueMusic
                    className='cursor-pointer hover:text-yellow-500/80'
                    size={23}
                    onClick={handleQueueClick}
                />
            </div>
            <div className='group flex items-center space-x-3'>
                <div
                    className='cursor-pointer group-hover:text-yellow-500/80'
                    onClick={handleMute}
                >
                    {volume === 0 ? (
                        <BsFillVolumeMuteFill className=' ' size={21} />
                    ) : volume < 0.4 ? (
                        <BsFillVolumeDownFill className='' size={21} />
                    ) : (
                        <BsFillVolumeUpFill className='' size={21} />
                    )}
                </div>
                <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.05'
                    value={volume}
                    onChange={(e) => handleVolumeChange(e)}
                    onMouseUp={handleUpdateVolume}
                    className=' h-1 cursor-pointer rounded-lg accent-lightSupport focus:outline-none group-hover:accent-yellow-500'
                />
            </div>
        </div>
    )
}

export default VolumeController
