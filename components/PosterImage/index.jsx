import React from 'react'
import Image from 'next/image'



function PosterImage({posterPath}) {
  return (
    <div className="relative self-center sm:self-auto mb-4 sm:mb-0 w-[210px] lg:w-[260px] xl:w-[300px] h-max aspect-[1/1.5] poster-container mr-4 lg:mr-8 rounded-md overflow-hidden">
        <Image 
            src={`https://image.tmdb.org/t/p/original/${posterPath}`}
            blurDataURL={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            placeholder='blur'
            alt="image"
            layout="fill"
            objectFit='cover'
            objectPosition='center'
        /> 
    </div>
  )
}

export default PosterImage