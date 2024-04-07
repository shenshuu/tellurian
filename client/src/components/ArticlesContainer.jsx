import { useEffect, useState } from "react";
import { Article } from "./Article";
import "../styles/ArticlesContainer.css";
import { index } from "d3";

export const ArticlesContainer = ({ articles }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const changeTab = (index) => {
    setTabIndex(index);
    console.log(index);
  };
  return (
    articles && (
      <>
        <div id="articles-container">
          <div className="tab-container">
            <button
              className={tabIndex === 0 ? "tabs active" : "tabs"}
              onClick={() => changeTab(0)}
            >
              article results
            </button>
            <button
              className={tabIndex === 1 ? "tabs active" : "tabs"}
              onClick={() => changeTab(1)}
            >
              saved articles
            </button>
          </div>
          {tabIndex ? (
            <div>no saved articles</div>
          ) : (
            <div>
              {articles.map((article) => (
                <Article key={article.articleId} article={article} />
              ))}
            </div>
          )}
        </div>
      </>
    )
  );
};

/*<div id="articles-container-title">
                <h1>Top stories in US</h1>
              </div> */
