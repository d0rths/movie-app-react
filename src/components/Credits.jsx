import { tmdbApi } from "@/services/tmdbApi.js";
import { getCrewMembers } from "@/utils/credits.js";
import { useEffect, useState } from "react";

const Credits = ({ id }) => {
  const [credits, setCredits] = useState(null);
  const [crew, setCrew] = useState([]);

  const fetchCredits = async () => {
    try {
      const creditsData = await tmdbApi.getCredits(id);
      setCredits(creditsData);

      const filteredCrew = getCrewMembers(creditsData);
      setCrew(filteredCrew);
    } catch (error) {
      console.error("Error fetching credits ", error);
    }
  };
  
  useEffect(() => {
    fetchCredits();
  }, [id])

  return (
    <div className="w-full flex flex-row mt-4 gap-20">
      {crew.map((group, index) => (
        <div key={index} className="text-white flex flex-col items-center">
          <p className="font-light text-gray-100">{group.job}</p>
          <h3 className="font-medium whitespace-pre-line text-center">{group.names.replace(/, /g, '\n')}</h3>
        </div>
      ))}
    </div>
  );
};

export default Credits;