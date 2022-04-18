import React , {useState, useEffect} from 'react'
import { useQuery } from 'react-query'
import {useRouter} from 'next/router'
import {useFilterGenreState,useSortState} from '../../store/useStore'
import { getShowsApi } from '../../api/api'
import Pagination from './Pagination'
import Loading from '../Loading'
import Poster from '../Poster'

function Shows() {
    const router = useRouter()
    const type = router.pathname.replace('/', '')
    const [page, setPage] = useState(1)
    const genres = useFilterGenreState(state => state.genres).join(',')
    const currentSort = useSortState(state => state.currentSort)

    const {
        isLoading,
        error,
        data,
        isFetching,
    } = useQuery(['shows', page , genres , currentSort , type], 
        () => getShowsApi(page , genres , currentSort , type)
    )

    console.log(data)

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

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

        scrollToTop()
    }

    const handleJumpToPage = page => {
        setPage(page)
        scrollToTop()
    }

    return (
        <div className="flex-1">
            <div className="title text-2xl font-bold pb-2">
                <span className="capitalize">{type}</span> 
                <span className="text-sm block text-black/60">{isLoading? '0' : data.total_results} Results</span>
            </div>
            {
                (isLoading || isFetching)?
                <Loading gridClass={"grid grid-cols-5 gap-4"} />    :
                <>
                    <ul className="shows grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                    <Pagination 
                        handlePaginate={handlePaginate} 
                        handleJumpToPage={handleJumpToPage}
                        page={page} 
                        data={{...data, total_pages: 500}}
                    />
                </>
            }
        </div>
    )
}

export default Shows