import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
//COMPONENTS
import ProgressCircleBig from '../../components/ProgressCircle/ProgressCircleBig'
import BackdropImage from '../../components/BackdropImage'
import PosterImage from '../../components/PosterImage'
//STATE
import {useModalState} from '../../store/useStore'

function Show({show}) {
    const toggleModalShow = useModalState(state => state.toggleModalShow)
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    return (
        <div className="w-full">
            <div className="h-[8vh]"></div>
            <BackdropImage backdropPath={show.backdrop_path} />
            <main className="w-full bg-slate-50 md:px-4">
                <div className="relative max-w-[1350px] mx-auto flex">
                    <div className="py-4 px-4 lg:py-8 lg:px-10 content top-0 -translate-y-[0px] md:-translate-y-[100px] w-full min-h-screen bg-white/60 backdrop-blur-md rounded-none md:rounded-md shadow-lg border-1 border-slate-100">
                        
                        <div className="main-info flex flex-col sm:flex-row">

                            <PosterImage posterPath={show.poster_path} />

                            <div className="flex-1">
                                <InfoContainer>
                                    <div className="year font-bold text-md lg:text-xl leading-[1]">{(show.release_date || show.first_air_date).split('-')[0]}</div>
                                    <div className="title font-extrabold text-3xl lg:text-4xl font-sans text-cyan-500">
                                        {show.title  || show.name}
                                    </div>
                                    <ul className="genres flex gap-2 mt-2">
                                        {
                                            show.genres &&
                                            show.genres.map(genre => {
                                                return (
                                                    <li 
                                                        key={genre.id}
                                                        className="bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-sm"
                                                    >{genre.name}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <div className="font-semibold text-sm lg:text-base text-black/60 mt-3">
                                        <div className="date"> <span className="font-bold">Release Date: </span> {moment(show.release_date || show.first_air_date).format('LL')}</div>
                                        <div className="runtime"> 
                                            <span className="font-bold">Runtime: </span> 
                                            {
                                                (!show.runtime || !show.episode_run_time) ? 'N/A' : 
                                                (
                                                    (show.runtime<60 && show.episode_run_time[0]<60)?
                                                    `${show.runtime || show.episode_run_time[0]}min` :
                                                    `${Math.floor(show.runtime/60)}hr ${show.runtime - (Math.floor(show.runtime/60) * 60)}min`
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="user-score-and-play-trailer py-6 flex items-center gap-6">
                                        <div className="user-score flex items-center gap-3">
                                            <ProgressCircleBig value={show.vote_average} />
                                            <span className="font-bold text-sm">User Score</span>
                                        </div>
                                        <div onClick={toggleModalShow} className="play-trailer bg-cyan-500 text-white text-sm font-bold px-6 py-3 rounded-md cursor-pointer hover:contrast-[0.90] transition-all active:ring-2 active:ring-offset-2 active:ring-cyan-500/60">
                                            Play Trailer
                                        </div>
                                    </div>
                                    <div className="overview">
                                        <div className="title text-lg lg:text-xl font-bold mb-1 lg:mb-2">Overview</div>
                                        <p className="overview-text text-sm lg:text-base leading-snug font-semibold text-black/80">{show.overview}</p>
                                    </div>
                                    <div className="crew mt-6">
                                        <div className="title text-lg lg:text-xl font-bold mb-1 lg:mb-2">Crew</div>
                                        <ul className="crews flex justify-between">
                                            {
                                                show.credits &&
                                                show.credits.crew
                                                    .filter((val, index) => index < 3)
                                                    .map(crew => {
                                                        return (
                                                            <li key={crew.id} className="leading-snug">
                                                                <div className="name text-[0.90rem] lg:text-base font-semibold">{crew.name}</div>
                                                                <div className="role text-xs lg:text-sm font-semibold text-black/60">{crew.job}/{crew.department}</div>
                                                            </li>
                                                        )
                                                    })
                                            }
                                        </ul>
                                    </div>
                                </InfoContainer>
                                <InfoContainer>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="status">
                                            <div className="title text-[0.90rem] lg:text-base font-bold">Status</div>
                                            <p className="overview-text text-xs lg:text-sm leading-snug font-semibold text-black/80">{show.status}</p>
                                        </div>
                                        <div className="original-language">
                                            <div className="title text-[0.90rem] lg:text-base font-bold">Original Language</div>
                                            <p className="overview-text text-xs lg:text-sm leading-snug font-semibold text-black/80">{show.spoken_languages && show.spoken_languages[0].name}</p>
                                        </div>
                                        <div className="buget">
                                            <div className="title text-[0.90rem] lg:text-base font-bold">Budget</div>
                                            <p className="overview-text text-xs lg:text-sm leading-snug font-semibold text-black/80">{show.budget? formatter.format(show.budget) : 'N/A'}</p>
                                        </div>
                                    </div>
                                </InfoContainer>
                            </div>



                        </div>

                        <InfoContainer>
                            <div className="text-base md:text-lg lg:text-xl font-bold mb-4">Cast</div>
                            <ul className="cast grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                                {
                                    show.credits &&
                                    show.credits.cast
                                    .filter((cast, index) => index < 10)
                                    .map(cast => {
                                        return (
                                            <li key={cast.id} className="shadow-md rounded-md bg-black/90">
                                                <div className="relative aspect-[1/1.5] poster-container rounded-t-md overflow-hidden">
                                                    {
                                                        cast.profile_path?
                                                        <Image 
                                                            src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                                                            blurDataURL={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                                                            placeholder='blur'
                                                            alt="image"
                                                            layout="fill"
                                                            objectFit='cover'
                                                            objectPosition='center'
                                                        /> :
                                                        <div className="bg-slate-300 h-full flex text-center items-center w-full">
                                                            <div className="title font-semibold text-sm w-full text-center text-black/60">
                                                                No Image Found
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="name font-semibold leading-snug px-3 py-3 text-white">
                                                    <div className="text-sm md:text-base real-name">{cast.original_name}</div>
                                                    <div className="character text-xs text-white/60">{cast.character}</div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </InfoContainer>

                        <div className="py-10">
                            {
                                !show.recommendations.results.length || 
                                <RecommendationsAndSimilar show={show.recommendations} title={'Recommendations'} />
                            }
                            {
                                !show.similar.results.length || 
                                <RecommendationsAndSimilar show={show.similar} title={'Similar'} />
                            }
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

const InfoContainer = ({children}) => {
    return (
    <div className="secondary-info bg-white shadow-md border-1 rounded-b-md px-4 md:px-6 xl:px-8 py-3 md:py-4 xl:py-6 mb-6 border-t-4 border-cyan-500/60">
       {children}
    </div>
    )
}

const RecommendationsAndSimilar = ({show, title}) => {
    return (
    <InfoContainer>
        <div className="text-base md:text-lg lg:text-xl font-bold mb-4">{title}</div>
        <ul className="cast grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {
                show &&
                show.results
                .filter((recommendation, index) => index < 6)
                .map(recommendation => {
                    return (
                        <li key={recommendation.id} className="shadow-md rounded-md bg-black/90">
                            <div className="relative aspect-[1/1.5] poster-container rounded-t-md overflow-hidden">
                                {
                                    recommendation.poster_path?
                                    <Image 
                                        src={`https://image.tmdb.org/t/p/original/${recommendation.poster_path}`}
                                        blurDataURL={`https://image.tmdb.org/t/p/w500/${recommendation.poster_path}`}
                                        placeholder='blur'
                                        alt="image"
                                        layout="fill"
                                        objectFit='cover'
                                        objectPosition='center'
                                    /> :
                                    <div className="bg-slate-300 h-full flex text-center items-center w-full">
                                        <div className="title font-semibold text-sm w-full text-center text-black/60">
                                            No Image Found
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="name font-semibold leading-snug px-3 py-3 text-white">
                                <Link href={`/movie/${recommendation.id}`}>
                                    <a className="block title leading-tight text-sm md:text-base font-bold hover:text-cyan-500 transition-all">{recommendation.title || recommendation.name}</a>
                                </Link>
                                <div className="date-release text-xs font-semibold text-white/60 mt-1">
                                    {
                                        moment(recommendation.release_date || recommendation.first_air_date).format('LL') 
                                    }
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    </InfoContainer>
    )
}

export default Show