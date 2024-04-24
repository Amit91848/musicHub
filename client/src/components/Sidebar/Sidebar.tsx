import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons'
import { BiSearch } from 'react-icons/bi'
import { ImMusic } from 'react-icons/im'

import PlaylistContainer from './Playlist/PlaylistContainer'
import Modal from '../Modal/Account/Modal'
import OpenModal from '../Modal/Account/OpenModal'

const Sidebar = () => {
    const router = useRouter()
    return (
        <div className=''>
            <div className='items-between relative flex h-[calc(100vh_-_80px)] w-[240px] flex-col text-font shadow-lg'>
                <div className='absolute bottom-20 top-0 left-0 flex h-full w-full flex-col items-center'>
                    <div className='relative bottom-4 h-20'>
                        <Link
                            href='/library'
                            className='cursor-pointer text-xl normal-case text-font'
                        >
                            <Image
                                src='/images/logo.png'
                                alt='Music Hub'
                                width={200}
                                height={200}
                            />
                            {/* Music Hub */}
                        </Link>
                    </div>
                    <h3 className='mt-3 ml-5 self-start font-eliteSpecial'>
                        App
                    </h3>
                    <div className='text mt-2 w-4/5 font-light'>
                        <Link href='/library'>
                            <SidebarNav
                                Icon={ImMusic}
                                name='Library'
                                selected={router.pathname === '/library'}
                            />
                        </Link>
                        <Link href='/library/search'>
                            <SidebarNav
                                Icon={BiSearch}
                                name='Search'
                                selected={router.pathname.includes(
                                    '/library/search'
                                )}
                            />
                        </Link>
                    </div>
                    <PlaylistContainer />
                    <Modal />
                </div>
            </div>
            <div className=' absolute bottom-0 flex h-20 w-[240px] justify-evenly border-t border-[#383f41] px-3 py-5'>
                <OpenModal source='spotify' />
                <OpenModal source='soundcloud' />
                <OpenModal source='youtube' />
            </div>
        </div>
    )
}

export default Sidebar

interface SidebarNav {
    selected: boolean
    Icon: IconType
    name: string
}

function SidebarNav({ selected, Icon, name }: SidebarNav) {
    return (
        <div
            className={clsx(
                'flex w-full cursor-pointer items-center gap-2 py-2 px-4 transition duration-300 hover:text-white',
                selected && 'rounded-lg bg-gray-300/10'
            )}
        >
            {' '}
            <Icon size={20} />
            <div className='text-sm'>{name}</div>
        </div>
    )
}
