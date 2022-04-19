import React from 'react'
import Image from 'next/image'

function BackdropImage({backdropPath}) {
    return (
        <div className="relative w-full aspect-[1/0.3] backdrop-container">
            <Image 
                src={`https://image.tmdb.org/t/p/original/${backdropPath}`}
                blurDataURL={`https://image.tmdb.org/t/p/w500/${backdropPath}`}
                placeholder='blur'
                alt="image"
                layout="fill"
                objectFit='cover'
                objectPosition='center'
            /> 
        </div>
    )
}

export default BackdropImage