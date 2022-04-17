import create from 'zustand'

const useFilterGenreState = create(set => ({
  genres: [],
  addGenre: (genre) => set(state => ({ genres: [...state.genres, genre]  })),
  removeGenre: (genre) => set(state => ({ genres: state.genres.filter(genreId => genreId !== genre)  })),
  resetFilter: () => set(state => ({ genres: []  })),
}))

const useSortState = create(set => ({
    currentSort: "popularity.desc",
    changeSort: (sortBy) => set(state => ({ currentSort: sortBy  })),
    resetSort: () => set(state => ({ currentSort: "popularity.desc"  })),
}))


export {
    useFilterGenreState,
    useSortState
}