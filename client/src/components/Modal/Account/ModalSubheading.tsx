import React from 'react'

import SubButton from './SubButton'

// interface ModalSubheadingProps {
// }

export const ModalSubheading: React.FC = () => {
    return (
        <div className='flex h-16 justify-center border-b border-b-borderGray bg-modalMedium px-5 pt-5'>
            {/* <SubButton active={active} setActive={setActive} type='settings' /> */}
            <SubButton type='spotify' />
            <SubButton type='soundcloud' />
            <SubButton type='youtube' />
        </div>
    )
}

export default ModalSubheading
