import React, { useState } from 'react'

import SearchBox from './SearchBox'

// interface RecentSearchContainerProps {}

export const RecentSearchContainer: React.FC = () => {
    // const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    //eslint-disable-next-line
    const [searches, setSearches] = useState<string[]>([])
    return (
        // <div className='h-full w-full bg-darkSupport p-8 text-lightSupport'>
        <div className='space-y-10 rounded-lg bg-dark p-10'>
            <div className='font-eliteSpecial text-[3.2rem]'>
                Your Recent Searches
            </div>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-8'>
                {searches.map((search) => (
                    <SearchBox key={1} search={search} />
                ))}
            </div>
        </div>
        // </div>
    )
}

export default RecentSearchContainer
