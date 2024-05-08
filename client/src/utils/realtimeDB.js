import { ref, set, push, onValue, remove  } from "firebase/database";
import { database } from '../firebase';

export const getArticles = (userID) => {
    return new Promise((resolve, reject) => {
        const databaseRef = ref(database, `${userID}/Articles`);
        onValue(databaseRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            console.error('Error fetching articles:', error);
            reject(error);
        });
    });
}
  
// reading from realtime database
export const deleteArticle = (articleID, userID) => {
    const databaseRef = ref(database, `${userID}`+ '/Articles')
    onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        for (let [key, value] of Object.entries(data)) {
            if (value.articleId === articleID) {
                const articleToDelete = ref(database, `${userID}/Articles/${key}`)
                remove(articleToDelete);
                console.log('article successfully deleted');
                break;
            }
        }
    })
}

export const articleExists = (articleID, userID) => {
    getArticles(userID)
      .then(data => {
        if (!data) return false;
        for (let [_, value] of Object.entries(data)) {
            if (value.articleId === articleID) {
                console.log("duplicate entry exists, cannot save");
                return true;
            }
        }
    })
      .catch(error => {
        return false;
    })
}

export const saveArticle = (article, userID) => {
    if (articleExists(article.articleId, userID)) {
      console.log('Article already saved:', article.articleId);
      return;
    }
  
    const postRef = ref(database, `${userID}/Articles`); // Construct the reference properly
    
    // saving to realtime database
    push(postRef, article)
      .then((newPostRef) => {
        console.log('Article successfully saved:', article.articleId);
      })
      .catch((error) => {
        console.error('Error saving article:', error);
      });
};
