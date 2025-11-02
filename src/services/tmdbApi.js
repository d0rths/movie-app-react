export const API_BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
};

export const tmdbApi = {
  // Fetch movie details
  getMovieDetails: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
      API_OPTIONS
    );

    if (!response.ok) throw new Error('Failed to fetch movie details');

    return response.json();
  },

  // Fetch movie trailer
  getMovieVideos: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
      API_OPTIONS
    );

    if (!response.ok) throw new Error('Failed to fetch movie videos');

    return response.json();
  },

  // Fetch certifications
  getMovieCertifications: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}/release_dates?api_key=${API_KEY}`,
      API_OPTIONS
    );

    if (!response.ok) throw new Error('Failed to fetch certifications');

    return response.json();
  },

  // Fetch credits
  getCredits: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}/credits?language=en-US`,
      API_OPTIONS
    )

    if (!response.ok) throw new Error('Failed to fetch credits');

    return response.json();
  },

  //Fetch similar movies
  getSimilarMovies: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}/similar?language=en-US`,
      API_OPTIONS
    );

    if (!response.ok) throw new Error('Failed to fetch similar');

    return response.json();
  },

  // Fetch watch providers
  getMovieProviders: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/movie/${id}/watch/providers`,
      API_OPTIONS
    )

    if (!response.ok) throw new Error('Failed to fetch movie providers');

    return response.json();
  },

  // Combined request
  getMovieInfo: async (id) => {
    const [movieData, videosData, certData] = await Promise.all([
      tmdbApi.getMovieDetails(id),
      tmdbApi.getMovieVideos(id),
      tmdbApi.getMovieCertifications(id),
    ])

    return { movieData, videosData, certData };
  }
}