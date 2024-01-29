/** @format */

import { useState } from "react";
import Navigation from "../../Navigation";
import Chat from "../chat/Chat";
import Stablediffusion from "../../stablediffusion/Stablediffusion";
import styles from "../chat/Chat.module.css";

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
        className={styles.aiSelect}
        onClick={toggleMenu}
        style={{
          padding: "10px 20px",
          fontSize: "12px",
          position: "absolute",
          color: "black",
          border: "solid #04364A",
          borderRadius: "13px",
          cursor: "pointer",
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
