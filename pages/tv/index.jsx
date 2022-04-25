import React, {useEffect} from 'react'
import Head from 'next/head'
import MainLayout from '../../layout/MainLayout'
import FilterSort from '../../components/FilterSort'
import Shows from '../../components/Shows'
import {useFilterGenreState, useSortState} from '../../store/useStore'
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
        <Head>
            <title>TV Shows | SkyFlix</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/logo.svg" />
        </Head>
        <div className="h-[8vh]"></div>
        <main className="w-full px-2 md:px-4 py-6 md:py-10">
            <div className="max-w-[1380px] mx-auto h-full flex px-2 sm:px-4 md:px-0">

                <FilterSort />

                <Shows />

            </div>
      </main>
    </MainLayout>
  )
}

export default Tv