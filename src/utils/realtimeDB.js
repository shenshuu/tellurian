import { ref, push, onValue, remove  } from "firebase/database";
import { database } from '../firebase';

export const isEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

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
  
export const deleteArticle = (article, userID) => {
    const databaseRef = ref(database, `${userID}`+ '/Articles')
    onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        for (let [key, value] of Object.entries(data)) {
            if (isEqual(value, article)) {
                const articleToDelete = ref(database, `${userID}/Articles/${key}`)
                remove(articleToDelete);
                console.log('article successfully deleted', article);
                break;
            }
        }
    })
}

export const articleExists = (article, userID) => {
    let exists = false;
    getArticles(userID)
      .then(data => {
        if (!data) return false;
        for (let [_, value] of Object.entries(data)) {
            if (isEqual(value, article)) {
                console.log("duplicate entry exists, cannot save");
                exists = true;
            }
        }
    })
      .catch(error => {
        return false;
    })
    return exists;
}

export const saveArticle = (article, userID) => {
    if (articleExists(article, userID)) {
      console.log('Article already saved:', article.articleId);
      return;
    }
  
    const postRef = ref(database, `${userID}/Articles`); // Construct the reference properly
    
    // saving to realtime database
    push(postRef, article)
      .then((newPostRef) => {
        console.log('Article successfully saved:', article);
      })
      .catch((error) => {
        console.error('Error saving article:', error);
      });
};
