import "../styles/Navbar.css";
import "../assets/glass.png";
import { SearchContainer } from "./SearchContainer";
export const Navbar = () => {
  return (
    <>
      <div id="navbar">
        <p id="title">TELLURIAN</p>
        <SearchContainer />
        <p id="team-link">Meet the team</p>
      </div>
    </>
  );
};
