import React from 'react'
import SortSection from './SortSection'
import FilterSection from './FilterSection'
import {useShowFilterState} from '../../store/useStore'
function FilterSort() {
  const toggleFilterShow = useShowFilterState(state => state.toggleFilterShow)
  const isFilterShow = useShowFilterState(state => state.isFilterShow)
  return (
    <div className={`${isFilterShow? 'block' : 'hidden'} px-8 md:px-0 md:block w-full md:w-[250px] lg:w-[300px] mr-0 md:mr-4 lg:mr-6 xl:mr-10`}>
        <div className="flex flex-col gap-6">
            <SortSection />
            <FilterSection />
            <button onClick={toggleFilterShow} className="block md:hidden self-end bg-cyan-400 text-white px-4 py-1 rounded-sm font-semibold">Back</button>
        </div>
    </div>
  )
}

export default FilterSort