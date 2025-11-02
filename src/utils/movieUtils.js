// Find youtube trailer
export const findYoutubeTrailer = (videos) => {
  if (!videos || !videos.results) return null;

  return videos.results.find(
    video => video.type === "Trailer" && video.site === "YouTube"
  );
};

// Find US certifications
export const findUSCertifications = (certData) => {
  if (!certData || !certData.results) return null;

  const usRelease = certData.results.find(r => r.iso_3166_1 === "US");
  return usRelease?.release_dates?.[0]?.certification || null;
}

// Format release date
export const formatReleaseDate = (dateString) => {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('-');
  return `${month}/${day}/${year}`;
}

// Format runtime
export const formatRuntime = (minutes) => {
  if (!minutes) return '';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}