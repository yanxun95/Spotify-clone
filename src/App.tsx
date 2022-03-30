import Homepage from "./Components/Homepage/Homepage";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./app.scss";

function App() {
  useEffect(() => {
    document.title = "Spotify";
  }, []);

  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
