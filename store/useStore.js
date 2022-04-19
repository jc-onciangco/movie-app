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

const useShowFilterState = create(set => ({
  isFilterShow: false,
  toggleFilterShow: () => set(state => ({ isFilterShow: !state.isFilterShow  })),
  setFalseFilterShow: () => set(state => ({ isFilterShow: false }))
}))

const useModalState = create(set => ({
  isModalShow: false,
  toggleModalShow: () => set(state => ({ isModalShow: !state.isModalShow  }))
}))

export {
    useFilterGenreState,
    useSortState,
    useShowFilterState,
    useModalState
}