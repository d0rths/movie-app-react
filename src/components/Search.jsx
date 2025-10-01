import React from "react";
import "@/index.css";

import SearchIcon from "@/assets/images/search.svg"

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src={SearchIcon} alt="Search" />

        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;