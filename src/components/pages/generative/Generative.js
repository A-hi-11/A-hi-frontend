/** @format */

import { useState } from "react";
import { BiSolidConversation } from "react-icons/bi";
import Navigation from "../../Navigation";
import Chat from "../chat/Chat";
import styles from "../chat/Chat.module.css";
import Stablediffusion from "../../stablediffusion/Stablediffusion";

export default function Generative(props) {
  const [isChat, setIsChat] = useState(true);
  const [btnName, setBtnName] = useState("Stable Diffusion");

  const toggleMenu = () => {
    setIsChat((isChat) => !isChat);
    if (btnName === "Chat GPT") {
      setBtnName("Stable Diffusion");
    } else {
      setBtnName("Chat GPT");
    }
  };
  return (
    <div className={styles.chatContainer}>
      <Navigation />
      <button
        onClick={toggleMenu}
        style={{
          position: "absolute",
          top: "40px",
          left: "200px",
          margin: "0",
        }}
      >
        {btnName}
      </button>
      <div className={styles.main}>
        {isChat ? <Chat /> : <Stablediffusion />}
      </div>
    </div>
  );
}
