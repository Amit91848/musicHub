import React from 'react'

import RecentSearchContainer from '@/components/Serach/RecentSearchContainer'

interface indexProps {
    source: string
}

export const index: React.FC<indexProps> = ({ source }) => {
    return (
        <>
            <RecentSearchContainer />
            {source}
        </>
    )
}

export default index
