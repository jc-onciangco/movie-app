import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Poster = ({result}) => {
    return (
        <li className="bg-white shadow-md rounded-md">
            <div className="relative aspect-[1/1.5] img-container rounded-t-md overflow-hidden">
                {
                    result.poster_path?
                    <Image 
                        src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        blurDataURL={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        placeholder='blur'
                        alt="image"
                        layout="fill"
                        objectFit='cover'
                        objectPosition='center'
                    /> :
                    <div className="bg-slate-300 h-full flex text-center items-center w-full">
                        <div className="title font-semibold text-sm w-full text-center text-black/60">
                            No Image Found
                        </div>
                    </div>
                }
            </div>
            <div className="details p-2">
                <Link href={`/movie/${result.id}`}>
                    <a className="title leading-tight text-sm font-bold hover:text-cyan-500 transition-all">{result.title || result.name}</a>
                </Link>
            </div>
        </li>
    )
}
export default Poster