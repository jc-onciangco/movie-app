import React from 'react'
import SortSection from './SortSection'
import FilterSection from './FilterSection'
function FilterSort() {
  return (
    <div className="hidden md:block w-[250px] lg:w-[300px] mr-6 lg:mr-10">
        <div className="flex flex-col gap-6">
            <SortSection />
            <FilterSection />
        </div>
    </div>
  )
}

export default FilterSort