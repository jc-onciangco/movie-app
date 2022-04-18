import React, {useState, useRef} from 'react'
import {useQuery} from 'react-query'
import {getSearchShowsApi} from '../../api/api'
import Poster from '../Poster'
import Loading from '../Loading'

function SearchShows() {
  const inputRef = useRef()
  const [page, setPage] = useState(1)
  const [type, setType] = useState('movie')
  const [query, setQuery] = useState('')
  const [isSearchingStart, setIsSearchingStart] = useState(false)

  const {
      isLoading,
      error,
      data,
      isFetching,
      refetch,
  } = useQuery(['search', query, type, page], 
      () => getSearchShowsApi(query, type, page),
      {enabled: false}
  )

  const handleSearchShows = () => {
    const value = inputRef.current.value.trim().toLowerCase()
    if (value==='') return
    setIsSearchingStart(true)
    setQuery(value)

    setTimeout(() => {
      refetch()
    }, 100)
  }

  const handleClickEnter = (e) => {
    const value = inputRef.current.value.trim().toLowerCase()
    const keyCode = e.which

    if (value==='') return

    if (keyCode === 13) {
      setIsSearchingStart(true)
      setQuery(value)

      setTimeout(() => {
        refetch()
      }, 100)
    }
  }

  return (
    <div className="w-full min-h-screen">

        <section className="w-full">
          <SearchInput 
            inputRef={inputRef}
            type={type}
            setType={setType}
            handleSearchShows={handleSearchShows}
            handleClickEnter={handleClickEnter}
            refetch={refetch}
          />
        </section>

        <main className="w-full h-full pt-6">
          {
            isSearchingStart?
            <div>
              {
                (isLoading || isFetching)?
                <Loading gridClass={"grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"}/>:
                (
                  data?
                  (data.results.length === 0?
                  <NoMatchFound /> :
                  <>
                    <div className="match-result py-2 font-semibold text-black/60 text-sm">
                      <span>{isLoading? '0' : data.total_results}</span> Results Found
                    </div>
                    <ul className="shows grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                  </>) :
                  <Loading gridClass={"grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"}/>
                )
              }
            </div> :
            <InitialView />
          }
        </main>

    </div>
  )
}

const SearchInput = ({inputRef, type, setType, handleSearchShows,handleClickEnter, refetch}) => {

  const handleSetType = (type) => {
    setType(type)
    setTimeout(() => {
      refetch()
    }, 100)
  }

  return (
  <div className="flex mx-auto max-w-[600px] flex-col gap-2">

    <div className="search  h- flex rounded-l-md">

      <input 
        ref={inputRef}
        type="text"
        className="bg-slate-100 flex-1 py-2 px-3 rounded-sm focus:outline-1 focus:outline-cyan-400"
        placeholder="Search here..."
        onKeyDown={e => handleClickEnter(e)}
      />
      <button
        onClick={handleSearchShows}
        className="bg-cyan-500 text-white px-6 text-sm font-semibold rounded-sm ml-2"
      >Search</button>

    </div>

    <div className="flex gap-2 text-xs font-semibold">
      <div
        onClick={() => handleSetType('movie')} 
        className={`${type==='movie'? 'bg-pink-500 text-white border-transparent' : 'bg-white text-black/60 border-pink-500/40'} cursor-pointer transition-all border-2 text-white px-4 py-1 rounded-sm`}>Movie</div>
      <div
        onClick={() => handleSetType('tv')} 
        className={`${type==='tv'? 'bg-pink-500 text-white border-transparent' : 'bg-white text-black/60 border-pink-500/40'} cursor-pointer transition-all border-2 text-white px-4 py-1 rounded-sm`}>Tv</div>
    </div>

  </div>
  )
}

const NoMatchFound = () => {
  return (
  <div className="w-full">
    <div className="w-full text-center py-10 rounded-md font-semibold text-red-600 font-sans bg-red-100 h-max">
       <span className="block text-lg">No Matches Found.</span>
       <span className="block text-sm text-red-600/60">Please try another search.</span>
    </div>
  </div>
  )
}

const InitialView = () => {
  return (
  <div className="w-full h-full">
    <div className="w-full text-center py-10 rounded-md text-base  font-semibold text-cyan-600 font-sans bg-cyan-100 h-max">SEARCH YOUR FAVORITE MOVIES AND TV SHOWS.</div>
  </div>
  )
}

export default SearchShows