import { useState } from "react";
import { codes } from "../utils/countryCodes.js";

export const Country = ({ country, d, setArticles }) => {
  const [hovering, setHovering] = useState(false);

  const handleClick = (event) => {
    const country = event.properties.name.toLowerCase();
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
        setArticles(articles);
      })
      .catch((error) => console.log("news fetching failed"));
  };

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
