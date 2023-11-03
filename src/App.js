import './App.css';
import { Routes, Route, Router } from "react-router-dom";
import Home from "./components/pages/main/Home";
import Detail from "./components/pages/detail/Detail";
import BoardWrite from "./components/pages/boards/BoardWrite";
import BoardUpdate from "./components/pages/boards/BoardUpdate";
import Prompt from "./components/pages/createprompt/Prompt";
import Create from "./components/pages/createprompt/Create";
import Chat from "./components/pages/chat/Chat";
import Profile from "./components/pages/profile/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/detail/:idx" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<BoardWrite />} /> 
        <Route path="*" element={<Home />} />
        <Route path="/update/:idx" element={<BoardUpdate />} />
        <Route path="/chatgpt" element={<Chat />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;