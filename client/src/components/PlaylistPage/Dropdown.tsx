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
                    <li key={Math.random() % 10} className='text-sm'>
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

export default Dropdown;
