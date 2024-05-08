import { useState } from "react";
import { fetchAll } from "../utils/fetchArticles.js";
import { codes } from "../utils/countryCodes.js";

export const Country = ({ country, d, setArticles }) => {
  const [hovering, setHovering] = useState(false);

  const handleClick = (event) => {
    const country = event.properties.name.toLowerCase();
    fetchAll(country)
      .then(articles => {
        console.log(articles);
        setArticles(articles);
      })
      .catch(error => {
        console.log('cannot fetch results');
      });
  }

  return (
    <path
      style={{
        fill: hovering ? "red" : "orange",
        stroke: "black",
        strokeWidth: 0.2,
      }}
      d={d}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => handleClick(country)}
    ></path>
  );
};
