import React, {useEffect} from 'react'
import MainLayout from '../../layout/MainLayout'
import FilterSort from '../../components/FilterSort'
import Shows from '../../components/Shows'
import PageLayout from '../../layout/PageLayout'
import {useFilterGenreState, useSortState} from '../../store/useStore'

function Movie() {
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
      <PageLayout>
        <FilterSort />
        <Shows />
      </PageLayout>
    </MainLayout>
  )
}

export default Movie