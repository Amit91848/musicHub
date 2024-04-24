import axios from 'axios'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function Header() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = React.useState('')
    React.useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && searchQuery !== '') {
                router.push(`/library/search/${searchQuery}`)
            }
        }
        document.addEventListener('keyup', handleKeyUp)
        return () => document.removeEventListener('keyup', handleKeyUp)
    }, [searchQuery, router])
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${backendURL}/auth/logout`, {
                withCredentials: true,
            })
            if (response.data.success) {
                router.push('/login')
            }
        } catch (err) {
            // console.log(err)
        }
    }
    return (
        <div className='flex h-20 items-center justify-between border-b border-[#383f41] bg-[#151d20] shadow-lg'>
            <div className='ml-4 w-1/3 gap-2'>
                <div className='form-control w-full'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='input-bordered input bg-[#bbb]'
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                        }}
                    />
                </div>
            </div>
            <div className='dropdown-end dropdown mr-2'>
                <label tabIndex={0} className='btn-ghost btn-circle avatar btn'>
                    <div className='w-10 rounded-full'></div>
                </label>
                <ul
                    tabIndex={0}
                    className='dropdown-content menu rounded-box menu-compact mt-3 w-52 p-2 text-light shadow'
                >
                    <li>
                        <a>Settings</a>
                    </li>
                    <li>
                        <p onClick={handleLogout}>Logout</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
