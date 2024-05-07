import "../styles/Navbar.css";
import "../assets/glass.png";
import { SearchContainer } from "./SearchContainer";
import LoginIcon from '@mui/icons-material/Login';
import { Avatar } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import {View} from 'react-native';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { doSignOut } from "../auth";

const auth = getAuth();

export const Navbar = () => {
  const [userChar, setUserChar] = useState("L")
  const [isLogin, setIsLogin] = useState(false)


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
    return {
      children: `${name.charAt(0)}`,
    };
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserChar(user.email.charAt(0).toUpperCase());
      setIsLogin(true);
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


