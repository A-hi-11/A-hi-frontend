import './App.css';
import { Routes, Route, Router } from "react-router-dom";
import Home from "./components/pages/main/Home";
import Detail from "./components/pages/detail/Detail";
import BoardWrite from "./components/pages/boards/BoardWrite";
import BoardUpdate from "./components/pages/boards/BoardUpdate";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/detail/:idx" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<BoardWrite />} /> 
        <Route path="*" element={<Home />} />
        <Route path="/update/:idx" element={<BoardUpdate />} />
      </Routes>
    </div>
  );
}

export default App;