import React from 'react'
import MainLayout from '../layout/MainLayout'
import SearchShows from '../components/SearchShows'

function Search() {
  return (
    <MainLayout>
        <main className="w-full px-2 md:px-4 py-8">
            <div className="max-w-[1150px] mx-auto h-full flex">
                <SearchShows /> 
            </div>
        </main>
    </MainLayout>
  )
}

export default Search