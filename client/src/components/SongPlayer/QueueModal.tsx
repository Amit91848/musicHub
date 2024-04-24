import React from 'react'
import { useSelector } from 'react-redux'

import clsxm from '@/lib/clsxm'

import { RootState } from '@/store/store'

import ModalHeader from '../Modal/ModalHeader'
import ModalBody from '../Modal/Queue/ModalBody'
import Track from '../PlaylistPage/Track'

interface QueueModalProps {
    showQueueModal: boolean
    setShowQueueModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const QueueModal: React.FC<QueueModalProps> = ({
    showQueueModal,
    setShowQueueModal,
}) => {
    const { userQueue, userQueueIndex, currentTrack, queue, index } =
        useSelector((state: RootState) => state.player)

    return (
        <div
            className={clsxm(
                'absolute h-[500px] max-h-96 w-[430px] overflow-y-hidden rounded-lg border border-[#383f41] shadow-lg',
                !showQueueModal
                    ? '-bottom-[100vw] -right-[100vh]'
                    : 'right-7 bottom-24'
            )}
        >
            <ModalHeader
                heading='Your queue'
                onClickClose={() => setShowQueueModal(false)}
            />
            <div className='flex h-full max-h-[515px] w-full flex-col items-center overflow-y-scroll bg-queueBg'>
                <ModalBody>
                    <>
                        <div className='border-b border-borderGray px-2 pb-2 pt-4 text-xl text-lightSupport'>
                            Current Track
                        </div>
                        <Track
                            index={1}
                            track={currentTrack}
                            key={currentTrack.id}
                            isActive={true}
                        />
                    </>
                </ModalBody>
                {userQueue.length != userQueueIndex && (
                    <ModalBody>
                        <>
                            <div className='border-b border-borderGray px-2 pb-2 pt-4 text-xl text-lightSupport'>
                                Upcoming Track
                            </div>
                            {userQueue &&
                                userQueue
                                    .slice(userQueueIndex)
                                    .map((t, index) => (
                                        <Track
                                            index={index}
                                            key={t.id}
                                            track={t}
                                            isActive={currentTrack.id === t.id}
                                        />
                                    ))}
                        </>
                    </ModalBody>
                )}
                <ModalBody>
                    <>
                        <div className='border-b border-borderGray px-2 pb-2 pt-4 text-xl text-lightSupport'>
                            Upcoming Track
                        </div>
                        {queue &&
                            queue
                                .slice(index + 1)
                                .map((t, index) => (
                                    <Track
                                        index={index}
                                        key={t.id}
                                        track={t}
                                        isActive={currentTrack.id === t.id}
                                    />
                                ))}
                    </>
                </ModalBody>
            </div>
        </div>
    )
}

export default QueueModal
