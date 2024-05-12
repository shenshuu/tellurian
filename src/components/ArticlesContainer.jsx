import { useEffect, useState } from "react";
import { Article } from "./Article";
import "../styles/ArticlesContainer.css";
import { useContext } from "react";
import { UserContext } from "../App";
import { getArticles } from "../utils/realtimeDB";
import { fetchAll } from "../utils/fetchArticles";
import { SortArticles } from "./SortArticles";
import { SearchArticles } from "./SearchArticles";

export const ArticlesContainer = ({ articles, setArticles, userID }) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [uid, setUid] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);
  const [sortCriteria, setSortCriteria] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAll("united states")
      .then((articles) => {
        console.log("successfully fetched default articles");
        setArticles(articles);
      })
      .catch((error) => {
        console.log("unable to fetch default articles");
      });
  }, []);

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

  const sortArticles = (articles, criteria) => {
    return [...articles].sort((a, b) => {
      if (criteria === "title") {
        return a.title.localeCompare(b.title);
      } else if (criteria === "author") {
        return a.author.localeCompare(b.author);
      } else if (criteria === "date") {
        return new Date(b.pubDate) - new Date(a.pubDate);
      }
      return 0;
    });
  };

  const searchArticles = (articles, query) => {
    return articles.filter((article) => {
      const titleMatch = article.title && article.title.toLowerCase().includes(query.toLowerCase());
      const authorMatch = article.author && typeof article.author === 'string' && article.author.toLowerCase().includes(query.toLowerCase());
      const descriptionMatch = article.description && article.description.toLowerCase().includes(query.toLowerCase());
      return titleMatch || authorMatch || descriptionMatch;
    });
  };

  const displayedArticles = sortArticles(
    searchArticles(savedArticles, searchQuery),
    sortCriteria
  );


  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(savedArticles);

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
              <div id="articleOrder">
                <SortArticles
                  sortCriteria={sortCriteria}
                  setSortCriteria={setSortCriteria}
                />
                <SearchArticles
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
              {displayedArticles.map((article, i) => (
                <Article
                  key={i}
                  article={article}
                  userID={uid}
                  savedArticles={savedArticles}
                  setSavedArticles={setSavedArticles}
                  saved={true}
                />
              ))}
            </div>
          ) : loading ? (
            <div>loading...</div>
          ) : (
            <div>
              {articles.map((article, i) => (
                <Article
                  key={i}
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
