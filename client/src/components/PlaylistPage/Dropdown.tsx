import React, { ReactNode } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { CommonTracks } from '@/constant/services'

interface DropdownProps {
    track: CommonTracks
    items: DropdownItems[]
}

export interface DropdownItems {
    onClick: VoidFunction
    Element: ReactNode
}

export const Dropdown: React.FC<DropdownProps> = ({ items }) => {
    return (
        <div className='dropdown-end dropdown compact'>
            <label
                tabIndex={0}
                className='btn m-1 border-none bg-transparent hover:bg-transparent'
            >
                <BsThreeDotsVertical
                    className='hidden duration-300 group-hover:flex'
                    size={22}
                />
            </label>
            <ul
                tabIndex={0}
                className='dropdown-content menu rounded-box w-52 bg-darkSupport p-2 shadow'
            >
                {items?.map((item) => (
                    <li key={Math.random() % 10}>
                        <a
                            onClick={item.onClick}
                            className='hover:bg-[#2f3638]'
                        >
                            {item.Element}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown
{
    /* <li>
                    <a
                        className='hover:bg-[#2f3638]'
                        onClick={handleAddToQueue}
                    >
                        {' '}
                        <MdQueueMusic size={17} /> Add To Queue
                    </a>
                </li> */
}
{
    /* <li>
                    <a className='hover:bg-[#2f3638]'>
                        {' '}
                        <label
                            className='relative flex cursor-pointer items-center'
                            htmlFor='my-modal-5'
                            onClick={() => {
                                dispatch(
                                    updateActive({
                                        active: 'playlists',
                                        track: track,
                                    })
                                )
                            }}
                        >
                            <AiOutlinePlus className='mr-3' size={17} /> Add to
                            playlist
                        </label>
                    </a>
                </li> */
}
{
    /* <li>
                        <a className='hover:bg-[#2f3638]'>
                            {' '}
                            <BsFillTrashFill size={17} /> Remove
                        </a>
                    </li> */
}
