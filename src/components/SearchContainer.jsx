import { useState, useContext } from "react";
import React from "react";
import countryList from "../utils/countryList";
import { ArticleContext } from "../App";
import { codes } from "../utils/countryCodes.js";
import SearchIcon from '@mui/icons-material/Search';
import { fetchAll } from "../utils/fetchArticles.js";
import "../styles/Search.css";

export const SearchContainer = () => {
  const [input, setInput] = useState("");
  const article = useContext(ArticleContext);

  const searchCountry = (val) => {
    setInput(val);
    const country = val.toLowerCase();
    fetchAll(country)
      .then((articles) => {
        article.setArticles(articles);
      })
      .catch((error) => console.log("news fetching failed"));
  };

  return (
    <div id="search-container">
      <div id="search-logo">
        <SearchIcon sx={{ fontSize: 15 }}  />
      </div>
      <div className="searchBar">
        <input
          placeholder="country..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchCountry(e.target.value);
            }
          }}
        />
        <div className="dropdown">
          {countryList
            .filter((country) => {
              const searchInput = input.toLowerCase();
              return (
                searchInput &&
                country.toLowerCase().startsWith(searchInput) &&
                country.toLowerCase() != searchInput
              );
            })
            .map((country) => (
              <div
                className="dropItem"
                key={country}
                onClick={() => {
                  searchCountry(country);
                }}
              >
                {country}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
