import React from 'react'
import Link from 'next/link'

function NavigationBar() {
    const navLinks = [
        {id: 0, name: 'movie', url: '/movie'},
        {id: 1, name: 'tv', url: '/tv'}
    ]

  return (
    <nav className="bg-red-100 px-2 md:px-4">
        <div className="flex items-center justify-between h-[8vh] max-w-[1380px] mx-auto bg-red-400">

            <div className="flex items-center gap-8">
                <div className="logo text-xl font-bold">SHOWFLIX</div>
                <ul className="flex gap-4 uppercase">
                    {
                        navLinks.map(link => {
                            return (
                                <li key={link.id}
                                    className="text-base font-semibold"
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
                    Seacrh
                </div>
            </div>

        </div>
    </nav>
  )
}

export default NavigationBar