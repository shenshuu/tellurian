
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database'; 



const firebaseConfig = {
    apiKey: 'AIzaSyBZ43Ieeh74rcDo2wdXYaegOWBbBmI03QE',
    authDomain: 'tellurian-55d54.firebaseapp.com',
    databaseURL: 'https://tellurian-55d54-default-rtdb.firebaseio.com/',
    projectId: 'project-t-6f743',
    storageBucket: 'project-t-6f743.appspot.com',
    messagingSenderId: '909478904512',
    appId: '1:909478904512:web:4271f7fc01afb68c312325',
    measurementId: 'G-V0WK3F2ZFB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;
export const auth = getAuth(app);
export const database = getDatabase(app);