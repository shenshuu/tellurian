import "../styles/Navbar.css";
import "../assets/glass.png";
import { SearchContainer } from "./SearchContainer";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div id="navbar">
        <p id="title">TELLURIAN</p>
        <SearchContainer />
        <Link to="/" id="home-link">Home</Link>
        <Link to="/meet-the-team" id="team-link">Meet the team</Link>
      </div>
    </>
  );
};
