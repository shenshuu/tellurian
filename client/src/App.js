import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./components/MainPage";
import MeetTheTeam from "./components/MeetTheTeam";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const ArticleContext = createContext({});
export const UserContext = createContext({});
const auth = getAuth();

export function  App() {
  const [articles, setArticles] = useState([]);
  const [userID, setUserID] = useState("");
  onAuthStateChanged(auth, (user) => {
    if(user)
      setUserID(user.uid)
  })

  return (
    <Router>
      <div>
        <UserContext.Provider value={{userID, setUserID}}>
          <ArticleContext.Provider value={{ articles, setArticles }}>
            <Navbar />
            <Routes>
              <Route path="/" element={userID ? <MainPage /> : <LoginPage/>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/main" element={<MainPage userID = {userID}/>} />
              <Route path="/meet-the-team" element={<MeetTheTeam />} />
            </Routes>
          </ArticleContext.Provider>
        </UserContext.Provider>
        <Footer />
      </div>
    </Router>
  );
}
