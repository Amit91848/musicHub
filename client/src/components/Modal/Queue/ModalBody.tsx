import React, { ReactElement } from 'react'
interface ModalSubheadingProps {
    children: ReactElement
}

export const ModalBody: React.FC<ModalSubheadingProps> = ({ children }) => {
    return <div className='w-full pl-4 pr-6'>{children}</div>
}

export default ModalBody
