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
  const [retrieved, setRetrieved] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    setUid(user.userID)
    if (uid) {
      getArticles(uid)
          .then(articleData => { 
              setSavedArticles(Object.values(articleData))
              setRetrieved(true)
          })
          .catch(error => console.log('Error:', error));
    }
  }, [uid, retrieved]);

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
              {savedArticles.map((article, i) => (
                <Article key={article.articleId + i} article={article} userID={uid} setRetrieved={setRetrieved}
                savedArticles={savedArticles} setSavedArticles={setSavedArticles} saved={true}/>
              ))}
            </div>
          ) : (
            <div>
              {articles.map((article, i) => (
                <Article key={article.articleId + i} article={article} userID={userID} setRetrieved={setRetrieved}
                savedArticles={savedArticles} setSavedArticles={setSavedArticles} saved={false}/>
              ))}
            </div>
          )}
        </div>
      </>
    )
  );
};