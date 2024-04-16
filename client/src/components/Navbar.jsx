import "../styles/Navbar.css";
import "../assets/glass.png";
import { SearchContainer } from "./SearchContainer";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import { Avatar } from "@mui/material";
import { color } from "d3";

export const Navbar = () => {
  return (
    <>
      <div id="navbar">
        <p id="title">TELLURIAN</p>
        <SearchContainer />
        <Link to="/" id="home-link">Home</Link>
        <Link to="/meet-the-team" id="team-link">Meet the team</Link>
        <NavLink to="/Login"> 

        <Avatar sx={{ bgcolor: "black"}}> <LoginIcon /> </Avatar>
        
        </NavLink>
      </div>
    </>
  );
};
