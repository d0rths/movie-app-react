import MovieCard from "@/components/MovieCard.jsx";
import { useFavoritesStore } from "@/stores/favoritesStore.js";

const FavoriteMovies = () => {
  const favorites = useFavoritesStore(state => state.favorites);
  return (
    <div>
      <div className="pattern"></div>

      <div className="wrapper">
        <section className="all-movies">
          <h2>Favorite</h2>

          <ul>
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default FavoriteMovies;