import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Country } from "./components/Country";
import SignIn from "./components/SignIn";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./components/MainPage";
import MeetTheTeam from "./components/MeetTheTeam";
import { geoPath, select, geoOrthographic, geoGraticule, count } from "d3";
import { useState, useEffect, useCallback, createContext } from "react";
import { useData } from "./utils/useData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*
const initialPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const projection = geoOrthographic()
  .scale(300)
  .translate([300, 400])
  .rotate([10, 10, 10]);

const path = geoPath().projection(projection);
*/

export const ArticleContext = createContext({});

function App() {
  const [articles, setArticles] = useState([]);
  /*
  const [mousePosition, setMousePosition] = useState(initialPosition);
  const [mouseDown, setMouseDown] = useState(false);
  const data = useData();

  const handleMouseDown = useCallback((event) => {
    setMouseDown(true);
  }, []);

  const handleMouseUp = useCallback((event) => {
    setMouseDown(false);
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      if (mouseDown) {
        const dx = clientX - mousePosition.x;
        const dy = clientY - mousePosition.y;
        const sensitivity = 0.25; // Adjust sensitivity as needed
        const rotation = projection.rotate();
        projection.rotate([
          rotation[0] + dx * sensitivity,
          rotation[1] - dy * sensitivity,
          rotation[2],
        ]);
        setMousePosition({ x: clientX, y: clientY });
      }
    },
    [mousePosition, mouseDown]
  );

  const graticule = geoGraticule();
  useEffect(() => {
    if (data && data.countries) {
      select("#sphere-container")
        .append("path")
        .datum(graticule())
        .attr("d", path)
        .attr("class", "graticule")
        .style("fill", "none")
        .style("stroke", "#ccc")
        .style("stroke-width", 0.5);
    }
  }, [data, path]);
*/
return (
  <Router>
    <div>
      <ArticleContext.Provider value={{ articles, setArticles }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/meet-the-team" element={<MeetTheTeam />} />
        </Routes>
      </ArticleContext.Provider>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
