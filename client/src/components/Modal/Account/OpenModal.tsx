import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

import clsxm from '@/lib/clsxm'

import { updateUser } from '@/store/reducers/user'
import { useAppDispatch } from '@/store/store'

import { source } from '@/constant/services'

import AccountBody from './AccountBody'
import ModalHeader from '../ModalHeader'
import ServiceIcon from '../../ServiceIcon/ServiceIcon'

interface OpenModalProps {
    source: source
    disabled?: boolean
}

Modal.setAppElement('#__next')

const customStyles: Modal.Styles = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '520px',
        height: '550px',
        margin: 0,
        padding: 0,
        background: '#232a2d',
        color: 'rgb(164, 164, 164)',
        border: 'none',
        borderTop: '0.5rem',
    },
    overlay: {
        zIndex: 15,
        background: 'rgba(0, 0, 0, 0.7)',
    },
}

export const OpenModal: React.FC<OpenModalProps> = ({ source, disabled }) => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    function closeModal() {
        setIsModalOpen(false)
    }

    async function getUserData() {
        const res = await axios.get(`${backendURL}/api/user`, {
            withCredentials: true,
        })
        dispatch(updateUser(res.data))
    }
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    useEffect(() => {
        getUserData()
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>
                <ServiceIcon
                    disabled={disabled}
                    className={clsxm(
                        'cursor-pointer transition duration-500 hover:scale-125'
                    )}
                    source={source}
                    size={32}
                />
                {/* </label> */}
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={true}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <ModalHeader
                        heading='Account'
                        onClickClose={() => setIsModalOpen(false)}
                    />

                    <AccountBody active={source} />
                </Modal>
            )}
        </>
    )
}

export default OpenModal
