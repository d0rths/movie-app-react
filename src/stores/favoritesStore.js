import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(persist((set) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie]
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(movie => movie.id !== id)
        }))
    }),
    { name: "favorites-storage" }
  )
);