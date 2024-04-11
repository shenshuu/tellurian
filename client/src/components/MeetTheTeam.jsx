import React from "react";
import "../styles/MeetTheTeam.css";
import michaelImage from "../assets/avatar_michael.png";
import jackieImage from "../assets/avatar_jackie2.jpg";
import caraImage from "../assets/avatar_cara2.jpg";
import jeremyImage from "../assets/avatar_jeremy.png";

const MeetTheTeam = () => {
  return (
    <div className="meet-the-team-page">
      <div className="meet-the-team-header">
        <h1>Meet the Team behind Tellurian!</h1>
      </div>gi
      <div className="team-members-container">
        <div className="team-member">
          <img src={michaelImage} alt="Team Member 1" />
          <h2>Michael Shen</h2>
          <p>Full-stack Developer
          michaelshen85@gmail.com
          </p>
        </div>
        <div className="team-member">
          <img src={jackieImage} alt="Team Member 2" />
          <h2>Jacqueline Saad</h2>
          <p>Front-end Developer
          jacquelinesaad1@aol.com
          </p>
        </div>
        <div className="team-member">
          <img src={caraImage} alt="Team Member 3" />
          <h2>Cara Dong</h2>
          <p>Back-end Developer
          cara.dong1088@gmail.com
          </p>
        </div>
        <div className="team-member">
          <img src={jeremyImage} alt="Team Member 4" />
          <h2>Jeremy J Almonte</h2>
          <p>Full-stack Developer
            jeremya1029@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;
