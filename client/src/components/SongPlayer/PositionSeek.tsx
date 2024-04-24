import React from 'react'

interface PositionSeekProps {
    seekPosition: number
    setSeekPosition: React.Dispatch<React.SetStateAction<number>>
    handleSeek: (position: number) => void
    setIsUserSeeking: React.Dispatch<React.SetStateAction<boolean>>
    isUserSeeking: boolean
    duration: number
    songPosition: number
}

export const PositionSeek: React.FC<PositionSeekProps> = ({
    seekPosition,
    setSeekPosition,
    handleSeek,
    setIsUserSeeking,
    isUserSeeking,
    duration,
    songPosition,
}) => {
    return (
        <input
            type='range'
            name=''
            id=''
            min={0}
            max={duration || 0}
            value={isUserSeeking ? seekPosition : songPosition || 0}
            onMouseUp={() => {
                handleSeek(seekPosition)
                setIsUserSeeking(false)
            }}
            onChange={(e) => setSeekPosition(Number(e.target.value))}
            onMouseDown={() => setIsUserSeeking(true)}
            className='absolute top-0 h-[1px] w-full cursor-pointer rounded-lg accent-lightSupport transition duration-500 hover:h-1 hover:accent-yellow-500 focus:outline-none'
        />
    )
}

export default PositionSeek
