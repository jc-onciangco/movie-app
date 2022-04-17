import React , {useState, useEffect} from 'react'
import { useQuery } from 'react-query'
import {useRouter} from 'next/router'
import Image from 'next/image'
import {useFilterGenreState,useSortState} from '../../store/useStore'

function Shows() {
    const router = useRouter()
    const query = router.pathname.replace('/', '')
    const [page, setPage] = useState(1)
    const genres = useFilterGenreState(state => state.genres).join(',')
    const currentSort = useSortState(state => state.currentSort)

    const {
        isLoading,
        error,
        data,
        isFetching,
    } = useQuery(['movies', page , genres , currentSort , query], async () => {
        const res = await fetch(`https://api.themoviedb.org/3/discover/${query}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}&with_genres=${genres}&sort_by=${currentSort}`)
        return res.json()
    }
    )

    const handlePaginate = (paginate) => {

        if (paginate === 'next') {
                setPage(prevState => prevState+=1)
        }

        if (paginate === 'prev') {
            setPage(prevState => {
                if (prevState === 1) return
                return prevState -= 1
            })
        }

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="flex-1">
            <div className="title text-2xl font-bold pb-2">Movies</div>
            {
                (isLoading || isFetching)?
                <SkeletonLoader />    :
                <ul className="shows grid grid-cols-5 gap-4">
                    {
                        data.results.map(result => {
                            return (
                                <Poster 
                                    key={result.id} 
                                    result={result} 
                                />
                            )
                        })
                    }
                </ul>
            }
        <Pagination handlePaginate={handlePaginate} page={page} />
        </div>
    )
}

const Pagination = ({handlePaginate, page}) => {
    return (
    <div className="py-4 flex justify-between">

        <button 
            onClick={() => handlePaginate('prev')} 
            className={`${page===1? 'opacity-0' : 'opacity-1'} bg-pink-600 text-white font-semibold text-sm py-2 px-5 rounded-md`}
            disabled={page===1? true : false}
        >
            PREV
        </button>

        <button
            onClick={() => handlePaginate('next')} 
            className="bg-pink-600 text-white font-semibold text-sm py-2 px-5 rounded-md"
        >
            NEXT
        </button>

    </div> 
    )
}

const SkeletonLoader = () => {
    return (
    <ul className="loader grid grid-cols-5 gap-4">
        {
            [...Array(20).keys()].map(n => {
                return (
                    <li key={n} className="aspect-[1/1.5] bg-slate-200 rounded-md animate-pulse"></li>
                )
            })
        }
    </ul>
    )
}

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
                        <div className="title font-semibold text-sm">{result.title}</div>
                    </div>
                }
            </div>
            <div className="details p-2">
                <div className="title leading-tight text-sm font-bold">{result.title}</div>
            </div>
        </li>
    )
}

export default Shows