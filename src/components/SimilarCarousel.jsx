import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { tmdbApi } from "@/services/tmdbApi.js";

import { useEffect, useState } from "react";

import NoMovie from "@/assets/images/no-movie.png";
import Star from "@/assets/images/star.svg";
import { Link } from "react-router-dom";

const SimilarCarousel = ({ id }) => {
  const [similar, setSimilar] = useState(null);

  const fetchSimilarMovies = async () => {
    try {
      const similarData = await tmdbApi.getSimilarMovies(id);

      setSimilar(similarData.results);
    } catch (error) {
      console.error(`Error fetching similar movie info: ${error}`);
    }
  }

  useEffect(() => {
    fetchSimilarMovies();
  }, [id]);

  return (
    <div>
      {similar?.length > 0 && (
        <section className="mt-4">
          <h2 className="mb-2">Similar Movies</h2>

          <Carousel opts={{slidesToScroll: 5}}>
            <CarouselContent className="-ml-2">
              {similar.map((movie) => (
                <CarouselItem key={movie.id} className="basis-1/5 pl-2">
                  <Link to={`../movie/${movie.id}`} className="bg-[#012648] p-1 rounded-lg min-h-[460px] flex flex-col gap-1">
                    <img
                      src={movie.poster_path ?
                      `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : NoMovie }
                      alt={movie.title}
                      className="rounded-[6px] h-[338px]"
                    />
                    <div className="px-1 py-0.5 font-bold bg-[#012648] text-white rounded-sm text-sm flex flex-row gap-1">
                      <img src={Star} alt="Star Icon" />
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <p className="text-white">{movie.title}</p>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      )}
    </div>
  );
};

export default SimilarCarousel;