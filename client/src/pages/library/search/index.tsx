import React from 'react'

import RecentSearchContainer from '@/components/Search/RecentSearchContainer'
import Layout from '@/components/layout/Layout'

interface indexProps {
    source: string
}

export const index: React.FC<indexProps> = ({ source }) => {
    return (
        <Layout>
            <RecentSearchContainer />
            {source}
        </Layout>
    )
}

export default index
