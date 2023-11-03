import { Helmet } from "react-helmet";
import { useState } from "react";
import styles from "./Chat.module.css";
import { BiSolidConversation } from "react-icons/bi";
import { useRef } from "react";
import Sidebar from "./ChatSidebar";
import Navigation from "../../Navigation";

export default function Chat() {
  const [colorInput, setColorInput] = useState("");
  const [result, setResult] = useState();

  const messageEndRef = useRef();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function onSendMsg(event) {
    event.preventDefault();
    const ul = document.getElementById("msgList");
    const li = document.createElement("li");
    li.className = styles.quest;
    li.innerText = colorInput;
    ul.appendChild(li);
    scrollToBottom(messageEndRef);
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: colorInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setColorInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.main}>
        <div className={styles.result}>
          <ul id="msgList">
            <li className={styles.response}>안녕하세요 ChatGPT 입니다.</li>
            <li className={styles.quest}>
              응 그래 잘지내? 난 잘지내.응 그래 잘지내? 난 잘지내.응 그래
              잘지내? 난 잘지내.응 그래 잘지내? 난 잘지내.응 그래 잘지내? 난
              잘지내.
            </li>
          </ul>
          <div ref={messageEndRef}></div>
        </div>

        <div className={styles.under} margin-top="200px">
          <form onSubmit={onSendMsg}>
            <textarea
              type="text"
              name="color"
              placeholder="에이 하이에게 무엇이든 물어보세요"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
            <input type="submit" value="전송" />
          </form>
        </div>
      </div>
    </div>
  );
}