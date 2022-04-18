import React , {useState, useEffect} from 'react'
import { useQuery } from 'react-query'
import {useRouter} from 'next/router'
import {useFilterGenreState,useSortState,useShowFilterState} from '../../store/useStore'
import { getShowsApi } from '../../api/api'
import Pagination from '../Pagination'
import Loading from '../Loading'
import Poster from '../Poster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function Shows() {
    const router = useRouter()
    const type = router.pathname.replace('/', '')
    const [page, setPage] = useState(1)

    const genres = useFilterGenreState(state => state.genres).join(',')
    const currentSort = useSortState(state => state.currentSort)
    const isFilterShow = useShowFilterState(state => state.isFilterShow)
    const toggleFilterShow = useShowFilterState(state => state.toggleFilterShow)

    const {
        isLoading,
        error,
        data,
        isFetching,
    } = useQuery(['shows', page , genres , currentSort , type], 
        () => getShowsApi(page , genres , currentSort , type)
    )

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
        <div className={`${isFilterShow? 'hidden' : 'block'} flex-1`}>
            <div className="title font-bold pb-2 flex justify-between items-center">
                <div className="label text-2xl">
                    <span className="capitalize">{type}</span> 
                    <span className="text-sm block text-black/60">{isLoading? '0' : data.total_results} Results</span>
                </div>
                <div className="filter block md:hidden">
                    <button
                        onClick={toggleFilterShow}
                        className="bg-cyan-400 py-[0.4rem] px-3 rounded-sm flex items-center gap-2"
                    >
                        <div className="icon-container h-[1rem] aspect-square">
                                <FontAwesomeIcon color='white' icon={faFilter} width={"100%"} />
                        </div>
                        <span className="text-sm font-semibold text-white">Filter</span>
                    </button>
                </div>
            </div>
            {
                (isLoading || isFetching)?
                <Loading gridClass={"grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"} />    :
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