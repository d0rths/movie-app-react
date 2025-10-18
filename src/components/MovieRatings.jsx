import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import IMDB from "@/assets/images/imdb.svg";
import RottenTomatoes from "@/assets/images/rotten_tomatoes.svg";
import Metacritic from "@/assets/images/Metacritic.png";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
};

const MovieRatings = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState(null);
  const [ratings, setRatings] = useState(null);

  const fetchMovieInfo = async () => {
    try {
      // Fetch movie details
      const movieRes = await fetch(
        `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
        API_OPTIONS
      );
      const movieData = await movieRes.json();
      setMovie(movieData);
    } catch (error) {
      console.error(`Error fetching movie info: ${error}`);
    }
  }

  const fetchImdbRating = async () => {
    const imdbId = movie.imdb_id;

    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`
    );
    const data = await response.json();
    setRatings(data);
  }

  useEffect(() => {
    fetchMovieInfo();
  }, [id])

  useEffect(() => {
    if(movie) {
      fetchImdbRating();
    }
  }, [movie])


  return (
    <div className="flex flex-row items-center gap-3 text-white mt-3">
      <div className="movie-rating">
        <div className="px-1 py-0.5 font-bold bg-[#012648] text-[#19d3fb] rounded-sm text-sm">
          TMDB
        </div> {movie?.vote_average.toFixed(1)}
      </div>
      {ratings && ratings.Ratings && ratings.Ratings.length > 0 && (
        <div className="flex flex-row gap-3">
          {ratings.Ratings[0] && (
            <div className="movie-rating">
              <div>
                <img src={IMDB} alt={ratings.Ratings[0].Source} className="w-11" />
              </div> {ratings.Ratings[0].Value}
            </div>
          )}
          {ratings.Ratings[1] && (
            <div className="movie-rating">
              <div>
                <img src={RottenTomatoes} alt={ratings.Ratings[1].Source} className="w-7" />
              </div> {ratings.Ratings[1].Value}
            </div>
          )}
          {ratings.Ratings[2] && (
            <div className="movie-rating">
              <div>
                <img src={Metacritic} alt={ratings.Ratings[2].Source} className="w-7" />
              </div> {ratings.Ratings[2].Value}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieRatings;