import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Components/login/Login";
import Main from "./Components/main/Main";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    document.title = "Spotify";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<Main />} />
    </Routes>
  );
}

export default App;
