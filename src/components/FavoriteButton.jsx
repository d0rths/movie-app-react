import { cn } from "@/lib/utils.js";
import { useFavoritesStore } from "@/stores/favoritesStore.js";

const FavoriteButton = ({ movie }) => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };
  return (
    <button onClick={handleFavorite} className={cn(
      'favorite-button',
      isFavorite ? "bg-[#012648]" : ""
    )}>
      {isFavorite ? "❤️" : "Add to favorites 🤍"}
    </button>
  );
};

export default FavoriteButton;