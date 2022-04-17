import React, {useState} from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import {sortingOptionsMovie, sortingOptionsTv} from './constant'
import {useRouter} from 'next/router'
import { useQuery } from 'react-query'
import {useFilterGenreState,useSortState} from '../../store/useStore'
function FilterSort() {
  return (
    <div className="w-[300px] mr-10">
        <div className="flex flex-col gap-6">
            <SortSection />
            <FilterSection />
        </div>
    </div>
  )
}

const FilterSection = () => {
    const router = useRouter()
    const query = router.pathname.replace('/', '')
    const addGenre = useFilterGenreState(state => state.addGenre)
    const removeGenre = useFilterGenreState(state => state.removeGenre)
    const genres = useFilterGenreState(state => state.genres)
    const {
        isLoading,
        error,
        data,
    } = useQuery(['genres', query], async () => {
        const res = await fetch(`https://api.themoviedb.org/3/genre/${query}/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
        return res.json()
    })

    const handleAddGenre = genreId => {
       if (genres.includes(genreId)) {
            removeGenre(genreId)
            return
       }

       addGenre(genreId)
    }

    return (
    <FilterSortContainer title={'Filter'}> 
        <ul className="flex flex-wrap gap-2">
            {
                isLoading? 
                <div className="loading">...Loading</div> :
                data.genres.map(genre => {
                    return (
                        <li
                            key={genre.id}
                            className={`${genres.includes(genre.id)? 'bg-blue-400' : 'bg-red-200'} py-1 px-3 rounded-sm text-sm`}
                            onClick={() => handleAddGenre(genre.id)}
                            >
                            {genre.name}
                        </li>
                    )
                })
            }
        </ul>
    </FilterSortContainer>  
    )
}


const SortSection = () => {
    const router = useRouter()
    const query = router.pathname.replace('/', '')
    const sortingOptions = query==='movie'? sortingOptionsMovie : sortingOptionsTv
    const changeSort = useSortState(state => state.changeSort)
    const currentSort = useSortState(state => state.currentSort)
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)

    const handleSelectOption = slug => {
        changeSort(slug)
        setIsOptionsOpen(false)
    }

    return (
    <FilterSortContainer title={'Sort'}> 
        <div className="relative selector bg-red-100">
            <div 
                onClick={() => setIsOptionsOpen(true)}
                className="flex cursor-pointer"
                >
                <div className="selected-option flex-1 py-2 px-2 capitalize">
                    {
                        sortingOptions.find(sortingOption => sortingOption.slug === currentSort).name
                    }
                </div>
                <div className="caret py-2 px-4 bg-blue-100">v</div>
            </div>

            <OutsideClickHandler onOutsideClick={() => setIsOptionsOpen(false)}>
                <div className={`${isOptionsOpen? 'block' : 'hidden'} shadow-md options absolute bg-white -bottom-1 translate-y-full w-full rounded-sm h-[150px] overflow-y-auto`}>
                    <ul className="b divide-y-2">
                        {
                            sortingOptions.map(sortingOption => {
                                return (
                                    <li 
                                        onClick={() => handleSelectOption(sortingOption.slug)}
                                        key={sortingOption.id} 
                                        className="option text-sm py-2 px-4 capitalize cursor-pointer"
                                    >
                                            {sortingOption.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </OutsideClickHandler>


        </div>
    </FilterSortContainer>
    )
}

const FilterSortContainer = ({children, title}) => {
    return (
    <div className="sort bg-white">
        <div className="label px-4 bg-yellow-400 py-3 rounded-t-md">{title}</div>
        <div className="input px-4 py-6">
            {children}
        </div>
    </div>
    )
}

export default FilterSort