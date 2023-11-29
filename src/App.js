/** @format */

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/main/Home";
import BoardWrite from "./components/pages/boards/BoardWrite";
import BoardUpdate from "./components/pages/boards/BoardUpdate";
import Create from "./components/pages/createprompt/Create";
import Chat from "./components/pages/chat/Chat";
import Profile from "./components/pages/profile/Profile";
import Login from "./components/pages/login/Login";
import Signup from "./components/pages/login/Signup";
import PromptDetail from "./components/pages/detail/PromptDetail";
import ScrollToTop from "./components/ScrollToTop";
import ChatHistory from "./components/pages/profile/ChatHistory";
import Generative from "./components/pages/generative/Generative";
import Signupform from "./components/pages/login/Signupform";
function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/write' element={<BoardWrite />} />
        <Route path='*' element={<Home />} />
        <Route path='/update/:idx' element={<BoardUpdate />} />
        <Route path='/chatgpt' element={<Chat />} />
        <Route path='/generative' element={<Generative />} />
        <Route path='/create' element={<Create />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signupform/:email' element={<Signupform />} />
        <Route path='/promptdetail/:prompt_id' element={<PromptDetail />} />
        <Route path='/chathistory/:id' element={<ChatHistory />} />
      </Routes>
    </div>
  );
}

export default App;
