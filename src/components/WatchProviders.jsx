import { useEffect, useState } from "react";

import RightArrow from "@/assets/images/right-arrow.svg"

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
};

const WatchProviders = ({ movieId }) => {
  const [providers, setProviders] = useState(null);
  const fetchProviders = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${movieId}/watch/providers`,
        API_OPTIONS
      );
      const data = await response.json();
      setProviders(data.results.US);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [movieId]);

  return (
    <div className="w-full mt-2">
      <a href={providers?.link} target="_blank" className="flex justify-center items-center bg-[#012648] py-3 px-10 w-full rounded-full text-white text-xl mt-4 mb-2 hover:opacity-80">
        Watch
        <img src={RightArrow} alt="right arrow" className="w-6" />
      </a>

      {providers?.rent && providers.rent.length > 0 && (
        <div>
          <h3 className="text-white">Available to Rent</h3>
          <div className="flex flex-row gap-2 my-2">
            {providers.rent.map((provider) => (
              <div key={provider.provider_id} className="w-12">
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-12"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {providers?.flatrate && providers.flatrate.length > 0 && (
        <div>
          <h3 className="text-white">Available to Flatrate</h3>
          <div className="flex flex-row gap-2 my-2">
            {providers.flatrate.map((provider) => (
              <div key={provider.provider_id} className="w-12">
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-12"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {providers?.buy && providers.buy.length > 0 && (
        <div>
          <h3 className="text-white">Available to Buy</h3>
          <div className="flex flex-row gap-2 my-2">
            {providers.buy.map((provider) => (
              <div key={provider.provider_id} className="w-12">
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-12"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchProviders;