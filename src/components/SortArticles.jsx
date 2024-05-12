import { useState } from "react";
import "../styles/ArticlesContainer.css";

export const SortArticles = ({ sortCriteria, setSortCriteria }) => {
  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  return (
    <div>
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        value={sortCriteria}
        onChange={handleSortChange}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
};