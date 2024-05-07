import { ref, set, push, onValue, remove  } from "firebase/database";
import { database } from '../firebase';

export const getArticleIds = (userID) => {
    return new Promise((resolve, reject) => {
        const databaseRef = ref(database, `${userID}/Articles`);
        onValue(databaseRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            console.error('Error fetching article IDs:', error);
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
            if (value.articleID === articleID) {
                const articleToDelete = database.ref(`${userID}/Articles/${key}`)
                articleToDelete.remove();
                break;
            }
        }
    })
}

export const articleExists = (articleID, userID) => {
    getArticleIds(userID)
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

export const saveArticle = (articleID, userID) => {
    if (articleExists(articleID, userID)) {
      console.log('Article already saved:', articleID);
      return;
    }
  
    const data = { articleId: articleID };
    const postRef = ref(database, `${userID}/Articles`); // Construct the reference properly
    
    // saving to realtime database
    push(postRef, data)
      .then((newPostRef) => {
        console.log('Article successfully saved:', articleID);
      })
      .catch((error) => {
        console.error('Error saving article:', error);
      });
};
