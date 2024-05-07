import "../styles/Navbar.css";
import "../assets/glass.png";
import { SearchContainer } from "./SearchContainer";
import LoginIcon from '@mui/icons-material/Login';
import { Avatar } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { color } from "d3";
import {View} from 'react-native';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { database } from '../firebase'

import { ref, set, child, get, push, onChildAdded, onValue, remove  } from "firebase/database";
import { doSignOut } from "../auth";
import { Article } from "./Article";

const auth = getAuth();

var userEmailChar = "L";

const results = {
  "Articles": {
      "-NxFzvAuV_zriFh_944E": {
          "articleId": 85
      },
      "-NxFzvB5FLrHoYYGcv1Z": {
          "articleId": 46
      },
      "-NxG01iTeyvL7h_JOLQy": {
          "articleId": 70
      },
      "-NxG01icLKahDsnWJmbs": {
          "articleId": 1
      },
      "-NxG0AVuViinWeAsBB4B": {
          "articleId": 34
      },
      "-NxG0AWUSbpHLPfnZ0nG": {
          "articleId": 99
      },
      "-NxG0BH8tx-DjPVQw3Wh": {
          "articleId": 75
      },
      "-NxG0BHKnIjv3PYo0bhs": {
          "articleId": 84
      },
      "-NxG0E5vn9wzGzaQieS5": {
          "articleId": 26
      },
      "-NxG0E98QPTjmri8D9ly": {
          "articleId": 21
      },
      "-NxG0G_Fv3rpkk6ucf40": {
          "articleId": 44
      },
      "-NxG0G_PuuhO6pxFhQqB": {
          "articleId": 49
      },
      "-NxG0n4uUAm2KVN-7ssJ": {
          "articleId": 45
      },
      "-NxG0n4yf2pcISFyAxgO": {
          "articleId": 80
      },
      "-NxG1h7wilub_KesBPqa": {
          "articleId": 2
      },
      "-NxG1h7zKxbS48hwUVLJ": {
          "articleId": 23
      },
      "-NxG25k0oCkZaKEoyvgn": {
          "articleId": 48
      },
      "-NxG25k8uKkjOKx4eJxi": {
          "articleId": 2
      }
  }
}


export const Navbar = () => {
  const [userChar, setUserChar] = useState("L")
  const [isLogin, setIsLogin] = useState(false)
  // const [userId, setUser]


  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }
  
  function stringAvatar(name) {
    console.log(name.charAt(0))
    return {
      children: `${name.charAt(0)}`,
    };
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userEmailChar = user.email.charAt(0);
      setUserChar(user.email.charAt(0).toUpperCase());
      setIsLogin(true);

      var userID = 123456457;

      const data = {
          articleId: Math.floor(Math.random() * 100) 
      }
      
      const postRef = ref(database, `${userID}` + '/Articles' + '/349tasdjhgp9er');
      const newPostRef = push(postRef);

      // saving to realtime database
    //   set(newPostRef, data).then( () => {
    //     // Success.
    //  } ).catch( (error) => {
    //    console.log(error);
    //  });
    //  let articleToDelete = database.ref("`${userID}` + '/Articles'/-NxFzvAuV_zriFh_944E");

    //   articleToDelete.remove();
      // onChildAdded(postRef, (data) => {
      //   console.log(data.val())
      // })
      
      // reading from realtime database
      const databaseRef = ref(database, `${userID}`)
      onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      })
      
      const deleteFromDB = (articleID) => {
         // reading from realtime database
        const databaseRef = ref(database, `${userID}`+ '/Articles')
        onValue(databaseRef, (snapshot) => {
          const data = snapshot.val();
          
          // Object.values(data.Articles).filter(datum => datum.)
          for (let [key, value] of Object.entries(data.Articles)) {
            if (value.articleID === articleID) {
              //  const articleToDelete = database.ref("`${userID}` + '/Articles'/-NxFzvAuV_zriFh_944E")
            }
          }
          console.log(data);
        })
      
      }
    
      console.log(userEmailChar)
    } else {
      console.log("User not logged in")
    }
  })

  const SignOut = () => {
    setIsLogin(false)
    doSignOut()
  }

  return (
    <>
    
      <View id="navbar" style={{
        
        flexDirection: 'row',
        alignContent: 'space-between'
      }}>
        <p id="title" style={{    
        alignSelf: 'space-between'
      }}>TELLURIAN</p>
        <SearchContainer style={{    
        flex: 2
      }}/>
        <Link to="/" id="home-link" >Home</Link>
        <Link to="/meet-the-team" id="team-link">Meet the team</Link>
        {isLogin ? 
    <> <Tooltip title="Sign out">
      <>
      <Avatar sx={{ bgcolor: stringToColor(userChar)}} {...stringAvatar(userChar)} onClick={() => SignOut()} /> </></Tooltip>
    </>
    : 
      <>
      <Tooltip title="Sign In">
      <>
       <Link to="/Login"> <Avatar sx={{ bgcolor: "black"}} > < LoginIcon/> </Avatar></Link> </></Tooltip>
       </>
    }
        
      </View>
    </>
  );
};


