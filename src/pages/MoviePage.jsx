import BackButton from "@/components/BackButton.jsx";
import Credits from "@/components/Credits.jsx";
import MovieRatings from "@/components/MovieRatings.jsx";
import SimilarCarousel from "@/components/SimilarCarousel.jsx";
import Spinner from "@/components/Spinner.jsx";
import WatchProviders from "@/components/WatchProviders.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, API_KEY, API_OPTIONS } from "@/conf/index.js";

import NoMovie from "@/assets/images/no-movie.png";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [certification, setCertification] = useState(null);
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState("");

  const [showTrailer, setShowTrailer] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovieInfo = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Fetch movie details
      const movieRes = await fetch(
        `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
        API_OPTIONS
      );
      const movieData = await movieRes.json();
      setMovie(movieData);

      // Fetch movie videos (trailers)
      const videosRes = await fetch(
        `${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
        API_OPTIONS
      );
      const videosData = await videosRes.json();
      const youtubeTrailer = videosData.results.find(
        video => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailer(youtubeTrailer);

      // Fetch certifications
      const certRes = await fetch(
        `${API_BASE_URL}/movie/${id}/release_dates?api_key=${API_KEY}`,
        API_OPTIONS
      );
      const certData = await certRes.json();

      const usRelease = certData.results.find(r => r.iso_3166_1 === "US");
      if (usRelease && usRelease.release_dates[0]) {
        setCertification(usRelease.release_dates[0].certification);
      }
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

  useEffect(() => {
    if (movie) {
      setReleaseDate(`${movie.release_date?.split("-")[1]}/${movie.release_date?.split("-")[2]}/${movie.release_date?.split("-")[0]}`);

      let hours = Math.floor(movie.runtime / 60);
      let minutes = movie.runtime % 60;
      setRuntime(`${hours}h ${minutes}m`);
    }
  }, [movie]);

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