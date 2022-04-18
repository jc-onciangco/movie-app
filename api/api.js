const BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const getShowsApi = async (page , genres , currentSort , type) => {
    const res = await fetch(`${BASE_URL}discover/${type}?api_key=${API_KEY}&page=${page}&with_genres=${genres}&sort_by=${currentSort}`)
    return res.json()
}

const getGenresApi = async (type) => {
    const res = await fetch(`${BASE_URL}genre/${type}/list?api_key=${API_KEY}`)
    return res.json()
}

const getSearchShowsApi = async (query, type, page) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${query}&page=${page}`)
    return res.json()
}

export {
    getShowsApi,
    getGenresApi,
    getSearchShowsApi
}