import React, {useEffect} from 'react'
import MainLayout from '../layout/MainLayout'
import FilterSort from '../components/FilterSort'
import Shows from '../components/Shows'
import {useFilterGenreState, useSortState} from '../store/useStore'
function Tv() {
  const resetFilter = useFilterGenreState(state => state.resetFilter)
  const resetSort = useSortState(state => state.resetSort)


  useEffect(() => {
    return () => {
      resetFilter()
      resetSort()
    }
  }, [resetFilter, resetSort])

  return (
    <MainLayout>
        <main className="w-full px-2 md:px-4 py-10">
            <div className="max-w-[1380px] mx-auto h-full flex">

                <FilterSort />

                <Shows />

            </div>
      </main>
    </MainLayout>
  )
}

export default Tv