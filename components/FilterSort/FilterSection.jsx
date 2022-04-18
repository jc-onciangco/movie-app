import React from 'react'
import FilterSortContainer from './FilterSortContainer'
import {useFilterGenreState} from '../../store/useStore'
import {useRouter} from 'next/router'
import { useQuery } from 'react-query'
import {getGenresApi} from '../../api/api'
const FilterSection = () => {
    const router = useRouter()
    const type = router.pathname.replace('/', '')

    const addGenre = useFilterGenreState(state => state.addGenre)
    const removeGenre = useFilterGenreState(state => state.removeGenre)
    const genres = useFilterGenreState(state => state.genres)

    const {
        isLoading,
        error,
        data,
    } = useQuery(['genres', type], 
        () => getGenresApi(type)
    )

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
                            className={`${genres.includes(genre.id)? 'bg-pink-500 active:ring-2 active:ring-pink-600' : 'bg-cyan-500 active:ring-2 active:ring-cyan-600'} hover:contrast-[1.2] transition-all cursor-pointer text-white font-semibold py-1 px-3 rounded-md text-sm`}
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

export default FilterSection