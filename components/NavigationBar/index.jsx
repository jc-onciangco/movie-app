import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Logo = () => {
    return (
<svg className='h-full' viewBox="0 0 896 600" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M448.2 0C584.9 0 701.6 85.9 747.4 206.7C832.9 229.3 896 307.3 896 400C896 510.5 806.5 600 696.1 600H199.9C89.5 600 0 510.5 0 400C0 307.1 63.3 229.1 149 206.6C194.8 85.8 311.5 0 448.2 0ZM447.5 539C315.788 539 209 432.212 209 300.5C209 168.788 315.788 62 447.5 62C579.212 62 686 168.788 686 300.5C685.324 431.953 578.953 538.324 447.56 539H447.5ZM447.5 95.8472C334.471 95.8472 242.847 187.471 242.847 300.5C242.847 413.529 334.471 505.153 447.5 505.153C560.529 505.153 652.153 413.529 652.153 300.5V300.401C652.153 187.431 560.569 95.8472 447.599 95.8472H447.5ZM569.055 345.834V345.119H325.944V345.834C325.944 377.883 338.675 408.619 361.337 431.281C383.999 453.943 414.735 466.674 446.784 466.674H447.46H447.499H448.215C480.264 466.674 511 453.943 533.662 431.281C556.324 408.619 569.055 377.883 569.055 345.834ZM401.33 259.14V258.961L401.31 258.98C401.31 250.765 398.874 242.734 394.309 235.903C389.745 229.072 383.258 223.748 375.667 220.604C368.077 217.46 359.725 216.637 351.667 218.24C343.61 219.843 336.208 223.799 330.399 229.608C324.59 235.417 320.633 242.819 319.031 250.877C317.428 258.934 318.25 267.286 321.394 274.877C324.538 282.467 329.862 288.954 336.693 293.519C343.525 298.083 351.556 300.519 359.771 300.519H359.95C382.806 300.519 401.33 281.996 401.33 259.14ZM566.13 288.333C573.92 280.543 578.297 269.977 578.297 258.961L578.317 258.941V258.901C578.093 247.958 573.643 237.526 565.9 229.791C558.157 222.055 547.721 217.615 536.778 217.402H536.599C513.743 217.402 495.219 235.926 495.219 258.782V258.961C495.219 269.977 499.596 280.543 507.386 288.333C515.176 296.123 525.741 300.499 536.758 300.499C547.775 300.499 558.34 296.123 566.13 288.333Z" fill="white"/>
</svg>
    )
}


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
                <div className="logo text-xl font-extrabold flex items-center gap-2">
                    <div className="img container h-[2rem] hidden md:block">
                        <Logo />
                    </div>
                    <span>SKYFLIX</span>
                </div>
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