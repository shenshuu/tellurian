import '../styles/Article.css'
import { useState } from 'react'
import { ref, set, child, get, push, onChildAdded, onValue, remove  } from "firebase/database";
import { database } from '../firebase';

// reading from realtime database
const getArticleIds = (userID) => {
    const databaseRef = ref(database, `${userID}`)
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      return data;
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

const articleExists = (articleID, userID) => {
    const result = getArticleIds(userID).Articles;
    for (let [_, value] of Object.entries(result)) {
        if (value.articleID === articleID) {
            console.log("duplicate entry exists, cannot save");
            return true;
        }
    }
    return false;
}

const saveToDB = (articleID, userID) => {
  const data = { articleId: articleID}
  
  const postRef = ref(database, `${userID}` + '/Articles');
  const newPostRef = push(postRef);

  if (articleExists(articleID, userID)) {
    console.log('article already saved', articleID);
    return;
  }
  
  // saving to realtime database
  set(newPostRef, data).then( () => {
    console.log('article successfully saved');
    // Success.
  } ).catch( (error) => {
    console.log(error);
  });
}

export const Article = ({ article, userID }) => {
    const [showDescription, setShowDescription] = useState(false)
    const handleClick = _ => {
        setShowDescription(!showDescription)
    }
    
    let title = '';
    for (const word of article.title.split(' ')) {
        if (title.length < 60) {
            title += word + ' '
        } else {
            title += '...'
            break
        }
    }

    return (
        <>
            <div className="article">
                {showDescription ?
                    <div className="article-tab" onClick={handleClick}>
                        &#9660;
                    </div>
                :
                    <div className="article-tab" onClick={handleClick}>
                        &#9650;
                    </div>
                }
                <div className="article-left">
                    <h4>{title}</h4>
                    <p className="article-author">{article.author + ', ' + article.pubDate}</p>
                </div>
                <div className="article-right">
                    <img className="article-img" src={article.imgUrl}/>
                    <div className="article-links">
                        <a href={article.link} target="_blank">&#x1f517;</a>
                        <a onClick={() => saveToDB(article.articleId, userID)}>&#x1F516;</a>
                    </div>
                </div>
            </div>
            {showDescription ? 
            <p className="article-description">
                {article.description}
            </p>
            :
            null
            }
        </>
    )
}