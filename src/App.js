/** @format */

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/main/Home";
import Create from "./components/pages/createprompt/Create";
import Chat from "./components/pages/chat/Chat";
import Profile from "./components/pages/profile/Profile";
import Login from "./components/pages/login/Login";
import Signup from "./components/pages/login/Signup";
import PromptDetail from "./components/pages/detail/PromptDetail";
import Generative from "./components/pages/generative/Generative";
import Signupform from "./components/pages/login/Signupform";
import PromptEdit from "./components/pages/detail/PromptEdit";
import ChatDetail from "./components/pages/profile/ChatDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route path='/chatgpt' element={<Chat />} />
        <Route path='/generative' element={<Generative />} />
        <Route path='/create' element={<Create />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signupform/:email' element={<Signupform />} />
        <Route path='/promptdetail/:prompt_id' element={<PromptDetail />} />
        <Route path='/chat_history/:chat_room_id' element={<ChatDetail />} />
        <Route path='/prompt_edit/' element={<PromptEdit />} />
      </Routes>
    </div>
  );
}

export default App;
