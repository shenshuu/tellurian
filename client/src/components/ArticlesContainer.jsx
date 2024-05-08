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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    setUid(user.userID);
    if (uid) {
      setLoading(true);
      getArticles(uid)
        .then((articleData) => {
          setSavedArticles(Object.values(articleData));
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [uid, articles, setLoading]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

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
              Article Results
            </button>
            <button
              className={tabIndex === 1 ? "tabs active" : "tabs"}
              onClick={() => setTabIndex(1)}
            >
              Saved Articles
            </button>
          </div>
          {tabIndex ? (
            <div>
              {savedArticles.map((article, i) => (
                <Article
                  key={article.articleId + i}
                  article={article}
                  userID={uid}
                  savedArticles={savedArticles}
                  setSavedArticles={setSavedArticles}
                  saved={true}
                />
              ))}
            </div>
          ) : (
            <div>
              {articles.map((article, i) => (
                <Article
                  key={article.articleId + i}
                  article={article}
                  userID={userID}
                  savedArticles={savedArticles}
                  setSavedArticles={setSavedArticles}
                  saved={false}
                />
              ))}
            </div>
          )}
        </div>
      </>
    )
  );
};
