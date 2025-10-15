import NoMovie from "@/assets/images/no-movie.png";
import BackButton from "@/components/BackButton.jsx";
import Spinner from "@/components/Spinner.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
};

const MoviePage = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovieInfo = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Fetch movie details
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`, API_OPTIONS)
        .then(res => res.json())
        .then(data => setMovie(data));

      // Fetch movie videos (trailers)
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`, API_OPTIONS)
        .then(res => res.json())
        .then(data => {
          // Знаходимо офіційний трейлер на YouTube
          const youtubeTrailer = data.results.find(
            video => video.type === 'Trailer' && video.site === 'YouTube'
          );
          setTrailer(youtubeTrailer);
        });

    } catch (error) {
      console.error(`Error fetching movie info: ${error}`);
      setErrorMessage("Error fetching movie info. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovieInfo();
  }, [])

  return (
    <div>
      <div className="pattern"></div>

      <div className="wrapper">
        <BackButton />

        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <div>
            {movie && (
              <div className="flex flex-row gap-2 mt-5">
                <div className="max-w-[300px] w-full">
                  <img
                    src={movie.poster_path ?
                      `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : {NoMovie}}
                    alt={movie.title}
                    className="w-full rounded-xl"
                  />
                </div>
                <div className="px-10">
                  <h1 className="text-left text-4xl">{movie.title}
                    <span className="text-gray-100 font-normal"> ({movie.release_date?.split('-')[0]})</span>
                  </h1>
                  <p className="text-white text-xl">{movie.overview}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default MoviePage;