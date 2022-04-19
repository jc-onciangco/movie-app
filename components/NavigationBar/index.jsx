import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
function NavigationBar() {
    const router = useRouter()
    const type = router.pathname.replace('/', '')
    const navLinks = [
        {id: 0, name: 'movie', url: '/movie'},
        {id: 1, name: 'tv', url: '/tv'}
    ]

  return (
    <nav className="fixed z-[20] w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-white px-2 md:px-4">
        <div className="flex items-center justify-between h-[8vh] max-w-[1380px] mx-auto px-2 sm:px-4 md:px-0">

            <div className="flex items-center gap-8">
                <div className="logo text-xl font-extrabold">SHOWFLIX</div>
                <ul className="flex gap-2 capitalize">
                    {
                        navLinks.map(link => {
                            return (
                                <li key={link.id}
                                    className={`text-base font-bold px-3 py-1 rounded-md ${type===link.name? 'bg-pink-500' : 'bg-transparent'}`}
                                    >
                                    <Link href={link.url}>
                                        <a>{link.name}</a>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="search">
                <div className="search-icon">
                    <Link href="/search">
                        <a className='bg-cyan-500 h-[2rem] aspect-square rounded-full flex justify-center items-center'>
                            <FontAwesomeIcon icon={faSearch} height="50%" />
                        </a>
                    </Link>
                </div>
            </div>

        </div>
    </nav>
  )
}

export default NavigationBar