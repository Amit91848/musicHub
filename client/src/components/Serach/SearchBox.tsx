import React from 'react'
import { RxCross2 } from 'react-icons/rx'

interface SearchBoxProps {
    search: string
}

export const SearchBox: React.FC<SearchBoxProps> = ({ search }) => {
    return (
        <div className='flex cursor-pointer flex-col rounded-lg bg-darkSupport/30 p-4 transition hover:bg-lightSupport/30'>
            <div className='ml-auto hover:scale-110 hover:text-light'>
                <RxCross2 size={17} strokeWidth={1.25} />{' '}
            </div>
            <div className='p-2 text-center'>"{search.substring(0, 14)}"</div>
        </div>
    )
}

export default SearchBox
