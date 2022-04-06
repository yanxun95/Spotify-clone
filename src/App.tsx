import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Components/login/Login";
import Main from "./Components/main/Main";

function App() {
  useEffect(() => {
    document.title = "Spotify";
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Main />} />
    </Routes>
  );
}

export default App;
