import React  from 'react'

function Footer() {
    const date = new Date()

    return (
        <footer className='h-[10vh] w-full bg-cyan-500 flex justify-center items-center'>
            <small className="font-bold text-white">&copy; Copyright {date.getFullYear()}, SKYFLIX</small>
        </footer>
    )
}

export default Footer