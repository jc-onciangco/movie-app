import React, {useState} from 'react'
import FilterSortContainer from './FilterSortContainer'
import OutsideClickHandler from 'react-outside-click-handler'
import {useSortState} from '../../store/useStore'
import {sortingOptionsMovie, sortingOptionsTv} from './constant'
import {useRouter} from 'next/router'
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
        <div className="relative selector">
            <div 
                onClick={() => setIsOptionsOpen(true)}
                className={`flex cursor-pointer bg-cyan-100 rounded-md ${isOptionsOpen? 'ring-2 ring-cyan-300' : 'ring-0'}`}
                >
                <div className="selected-option flex-1 py-2 px-2 capitalize font-semibold text-black/60">
                    {
                        sortingOptions.find(sortingOption => sortingOption.slug === currentSort).name
                    }
                </div>
                <div className="caret py-2 px-4 bg-cyan-400 rounded-r-md">v</div>
            </div>

            <OutsideClickHandler onOutsideClick={() => setIsOptionsOpen(false)}>
                <div className={`${isOptionsOpen? 'block' : 'hidden'} shadow-lg options absolute bg-white -bottom-2 translate-y-full w-full rounded-sm h-[150px] overflow-y-auto`}>
                    <ul className="b divide-y-2">
                        {
                            sortingOptions.map(sortingOption => {
                                return (
                                    <li 
                                        onClick={() => handleSelectOption(sortingOption.slug)}
                                        key={sortingOption.id} 
                                        className="option text-sm py-3 px-4 capitalize cursor-pointer hover:bg-cyan-50"
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

export default SortSection