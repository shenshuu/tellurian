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


export const ArticleContext = createContext({});

function App() {
  const [articles, setArticles] = useState([]);

return (
  <Router>
    <div>
      <ArticleContext.Provider value={{ articles, setArticles }}>
        <Navbar />
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
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
