import React , {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import ProgressCircle from '../ProgressCircle'
import moment from 'moment'

const Poster = ({result, showType = null}) => {
    const router = useRouter()
    const pathname = router.pathname.replace('/', '')
    const type = pathname==='search'? showType : pathname
    const [data, setData] = useState(result)

    useEffect(() => {
        return () => {
            setData([])
        }
    }, [])

    return (
        <li className="bg-white shadow-md rounded-md">
            <div className="relative aspect-[1/1.5] img-container rounded-t-md overflow-hidden">
                {
                    data.poster_path?
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
            <div className="details relative">
            <div className="absolute top-0 right-1 -translate-y-2/4">
                <ProgressCircle value={result.vote_average} />
            </div>
            <div className="data w-full h-full pb-3 pt-6 px-3">
                <Link href={`/${type}/${result.id}`}>
                    <a className="block title leading-tight text-sm font-bold hover:text-cyan-500 transition-all">{result.title || result.name}</a>
                </Link>
                <div className="date-release text-sm font-semibold text-slate-500/70">
                    {
                        moment(result.release_date || result.first_air_date).format('LL') 
                    }
                </div>
            </div>
            </div>
        </li>
    )
}
export default Poster