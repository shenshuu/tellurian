import "../styles/Navbar.css";
import "../assets/glass.png";
import { SearchContainer } from "./SearchContainer";
import LoginIcon from "@mui/icons-material/Login";
import { Avatar , IconButton  } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { View } from "react-native";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { doSignOut } from "../auth";

const auth = getAuth();
var authFlag = false;

export const Navbar = () => {
  const [userChar, setUserChar] = useState("L");
  const [isLogin, setIsLogin] = useState(false);
  const [viewTeam, setViewTeam] = useState(false);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

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
      if (!authFlag) {
        setUserChar(user.email.charAt(0).toUpperCase());
        setIsLogin(true);
        authFlag = true;
      }
    } else {
      console.log("User not logged in");
      //setIsLogin(false);
    }
  });

  const SignOut = () => {
    setIsLogin(false);
    doSignOut();
    //navigate("/login");
  };

  return (
    <>
      <View
        id="navbar"
        style={{
          flexDirection: "row",
          alignContent: "space-between",
        }}
      >
        <Link 
        style={{'text-decoration': 'none', 'color': 'black'}} 
        onClick={() => setViewTeam(false)}
        to={isLogin ? "\main" : "\Login"}>
          <p id="title">TELLURIAN</p>
        </Link>
        {isLogin && !viewTeam ?
        <SearchContainer
          style={{
            flex: 2,
          }}
        />
        :
        null
        }
        <div className="link-box">
          
          <Link to="/meet-the-team" id="team-link" onClick={() => setViewTeam(true)}>
            Meet the team
          </Link>
          {isLogin ? (
            <>
              {" "}
              <Tooltip title="Sign out">
                <>
                <IconButton className="avatar-button" onClick={() => SignOut()}>
                  <Avatar sx={{ bgcolor: stringToColor(userChar) }}
                    {...stringAvatar(userChar)}
                  />  
                </IconButton>
                  {" "}
                </>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Sign In" onClick={() => setViewTeam(false)}>
                <>
                  <Link to="/Login">
                    {" "}
                    <Avatar sx={{ bgcolor: "black" }}>
                      {" "}
                      <LoginIcon />{" "}
                    </Avatar>
                  </Link>{" "}
                </>
              </Tooltip>
            </>
          )}
        </div>
      </View>
    </>
  );
};
