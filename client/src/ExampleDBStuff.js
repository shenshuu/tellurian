import React from 'react'
import { useAuth } from '../Contexts/authContext'
import { database } from '../firebase'
import { ref, set, child, get  } from "firebase/database";


export function setUserData(userId, name, imageUrl)
{
    const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    profile_picture : imageUrl
  }).catch( (error) => {
      console.log(error);
    });
}
export function setData(userId, articleUrl)
{
    const db = getDatabase();
  set(ref(db, 'users/' + userId + '/savedArticles'), {
    articleSaved: articleUrl
  }).catch( (error) => {
      console.log(error);
    });
}

export function readData()
{
    const db = getDatabase();
    const articlesRef = ref(db, 'users/' + userId + '/savedArticles');
    onValue(articlesRef, (snapshot) => {
    const data = snapshot.val();
    updateArticles(data);
});
}

export function getData()
{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}