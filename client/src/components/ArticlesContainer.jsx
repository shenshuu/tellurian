import { useEffect, useState } from "react";
import { Article } from "./Article";
import "../styles/ArticlesContainer.css";
import { index } from "d3";
import { ref, set, child, get, push, onChildAdded, onValue, remove  } from "firebase/database";
import { database } from '../firebase';
import { useContext } from "react";
import { UserContext } from "../App";


// reading from realtime database
const getArticleIds = (userID) => {
  const databaseRef = ref(database, `${userID}`)
  onValue(databaseRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  })
}

// reading from realtime database
const deleteFromDB = (articleID, userID) => {
  const databaseRef = ref(database, `${userID}`+ '/Articles')
  onValue(databaseRef, (snapshot) => {
    const data = snapshot.val();
    
    for (let [key, value] of Object.entries(data.Articles)) {
      if (value.articleID === articleID) {
        const articleToDelete = database.ref(`${userID}/Articles/${key}`)
        articleToDelete.remove();
        break;
      }
    }
  })
}

export const ArticlesContainer = ({ articles, userID }) => {
  const [tabIndex, setTabIndex] = useState(0);
  console.log('from containers ', userID);
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
                <Article key={article.articleId} article={article} userID={userID}/>
              ))}
            </div>
          )}
        </div>
      </>
    )
  );
};