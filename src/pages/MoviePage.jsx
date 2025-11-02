import BackButton from "@/components/BackButton.jsx";
import Credits from "@/components/Credits.jsx";
import FavoriteButton from "@/components/FavoriteButton.jsx";
import MovieRatings from "@/components/MovieRatings.jsx";
import SimilarCarousel from "@/components/SimilarCarousel.jsx";
import Spinner from "@/components/Spinner.jsx";
import WatchProviders from "@/components/WatchProviders.jsx";
import { tmdbApi } from "@/services/tmdbApi.js";
import { findUSCertifications, findYoutubeTrailer, formatReleaseDate, formatRuntime } from "@/utils/movieUtils.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NoMovie from "@/assets/images/no-movie.png";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [certification, setCertification] = useState(null);

  const [showTrailer, setShowTrailer] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const releaseDate = formatReleaseDate(movie?.releaseDate);
  const runtime = formatRuntime(movie?.runtime);

  const fetchMovieInfo = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const {movieData, videosData, certData} = await tmdbApi.getMovieInfo(id);

      setMovie(movieData);
      setTrailer(findYoutubeTrailer(videosData));
      setCertification(findUSCertifications(certData));
    } catch (error) {
      console.error(`Error fetching movie info: ${error}`);
      setErrorMessage("Error fetching movie info. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieInfo();
  }, [id]);

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
                <div className="min-w-[300px]">
                  <div
                    className={`relative group ${trailer ? "cursor-pointer" : ""}`}
                    onClick={() => trailer && setShowTrailer(true)}
                  >
                    <img
                      src={movie.poster_path ?
                        `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : NoMovie }
                      alt={movie.title}
                      className="w-full rounded-xl"
                    />
                    {trailer && (
                      <div className="trailer-hover">
                        <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <WatchProviders movieId={id} movie={movie} />
                  <FavoriteButton movie={movie} />
                </div>
                <div className="px-10">
                  <h1 className="text-left text-4xl leading-tight">{movie.title}
                    <span className="text-gray-100 font-normal"> ({movie.release_date?.split("-")[0]})</span>
                  </h1>

                  <div className="flex flex-row items-center gap-2 text-white font-light">
                    {certification && (
                      <div className="certification">{certification}</div>
                    )}
                    <p>
                      {releaseDate} • {movie.genres.map(genre => genre.name).join(", ")} • {runtime}
                    </p>
                  </div>

                  {/* Rating */}
                  <MovieRatings />
                  <hr className="text-gray-100/20 mt-3 mb-2" />

                  <div>
                    <p className="text-gray-100 text-base italic">{movie.tagline}</p>

                    <h3 className="text-white text-xl py-2">Overview</h3>
                    <p className="text-white text-base">{movie.overview}</p>
                  </div>

                  <Credits id={id} />
                </div>

              </div>
            )}

            <SimilarCarousel id={id} />

            {showTrailer && trailer && (
              <div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                onClick={() => setShowTrailer(false)}
              >
                <div
                  className="relative w-full max-w-5xl aspect-video"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShowTrailer(false)}
                    className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    ×
                  </button>
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                    title={trailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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