import { useEffect, useState } from "react";
import { Article } from "./Article";
import "../styles/ArticlesContainer.css";
import { useContext } from "react";
import { UserContext } from "../App";
import { getArticles } from "../utils/realtimeDB";

export const ArticlesContainer = ({ articles, userID }) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [uid, setUid] = useState(undefined);
  const user = useContext(UserContext);

  useEffect(() => {
    setUid(user.userID)
    if (uid) {
      getArticles(uid)
          .then(articleData => { // Rename variable to avoid conflict
              setSavedArticles(Object.values(articleData))
          })
          .catch(error => console.log('Error:', error));
    }
  }, [uid]);

  console.log(savedArticles)

  return (
    articles && (
      <>
        <div id="articles-container">
          <div className="tab-container">
            <button
              className={tabIndex === 0 ? "tabs active" : "tabs"}
              onClick={() => setTabIndex(0)}
            >
              article results
            </button>
            <button
              className={tabIndex === 1 ? "tabs active" : "tabs"}
              onClick={() => setTabIndex(1)}
            >
              saved articles
            </button>
          </div>
          {tabIndex ? (
            <div>
              {savedArticles.map(article => (
                <Article key={article.articleId} article={article} userID={uid} />
              ))}
            </div>
          ) : (
            <div>
              {articles.map((article) => (
                <Article key={article.articleId} article={article} userID={userID}/>
              ))}
            </div>
          )}
        </div>
      </>
    )
  );
};