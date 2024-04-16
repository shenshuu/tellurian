import { useState, useContext } from "react";
import React from "react";
import countryList from "../utils/countryList";
import { ArticleContext } from "../App";
import { codes } from "../utils/countryCodes.js";
import SearchIcon from '@mui/icons-material/Search';
import "../styles/Search.css";

export const SearchContainer = () => {
  const [input, setInput] = useState("");
  const article = useContext(ArticleContext);

  const searchCountry = (val) => {
    setInput(val);
    const country = val.toLowerCase();
    fetch(`http://localhost:3001/news/?country=${codes[country]}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const articles = data.results.map((a) => {
          return {
            articleId: a.article_id,
            title: a.title,
            imgUrl: a.image_url,
            pubDate: a.pubDate,
            author: a.creator ? a.creator[0] : "Unknown",
            description: a.description,
            link: a.link,
          };
        });
        article.setArticles(articles);
      })
      .catch((error) => console.log("news fetching failed"));
  };

  return (
    <div id="search-container">
      search
      <SearchIcon sx={{ fontSize: 12 }}  />
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
