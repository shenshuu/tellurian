import { useState } from "react";
import "../styles/ArticlesContainer.css";

export const SearchArticles = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search-input">Search:</label>
      <input
        id="search-input"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Enter search query"
      />
    </div>
  );
};