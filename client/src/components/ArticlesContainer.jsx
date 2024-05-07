import { useEffect, useState } from "react";
import { Article } from "./Article";
import "../styles/ArticlesContainer.css";
import { useContext } from "react";
import { UserContext } from "../App";
import { getArticleIds } from "../utils/realtimeDB";

export const ArticlesContainer = ({ articles, userID }) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [uid, setUid] = useState(undefined);
  const user = useContext(UserContext);

  useEffect(() => {
    setUid(user.userID)
  }, []);

  const retrieveSavedArticles = () => {
    getArticleIds(uid)
        .then(articleData => { // Rename variable to avoid conflict
            const articleIds = Object.values(articleData).map(obj => obj.articleId).join(',');
            console.log(articleIds);
        })
        .catch(error => console.log('Error:', error));
    setTabIndex(1);
};
  
  const changeTab = index => setTabIndex(index);
  console.log(savedArticles)

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
              onClick={retrieveSavedArticles}
            >
              saved articles
            </button>
          </div>
          {tabIndex ? (
            <div>{"no saved articles"}</div>
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