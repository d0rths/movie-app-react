import { API_BASE_URL, API_OPTIONS } from "@/conf/index.js";
import { getCrewMembers } from "@/utils/credits.js";
import { useEffect, useState } from "react";

const Credits = ({ id }) => {
  const [credits, setCredits] = useState(null);
  const [crew, setCrew] = useState([]);

  const fetchCredits = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/movie/${id}/credits?language=en-US`,
        API_OPTIONS
      );
      const data = await res.json();
      setCredits(data);

      console.log("credits", data);

      const filteredCrew = getCrewMembers(data);
      setCrew(filteredCrew);

      console.log("crew", crew);

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