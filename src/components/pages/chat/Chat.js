/** @format */

import { useState } from "react";
import styles from "./Chat.module.css";
import { BiSolidConversation } from "react-icons/bi";
import { useRef } from "react";

export default function Chat() {
  const [msg, setMsg] = useState("");
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
    li.innerText = msg;
    ul.appendChild(li);
    scrollToBottom(messageEndRef);
    setMsg("");
  }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onSendMsg(e); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: msg }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setMsg("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div
      className={styles.main}
      style={{ marginLeft: "0", height: "max-content" }}
    >
      <title>에이 하이</title>
      <link rel='icon' href='forum.png' />
      <div className={styles.title}>
        <BiSolidConversation size='40px' color='#4997B0' />
        <h2>안녕 AI</h2>
        <h3>에이-하이</h3>
      </div>
      <div className={styles.gptMenu}>
        <select className={styles.list}>
          <option>GPT-3.5</option>
          <option>GPT-4</option>
        </select>
      </div>
      <div className={styles.result}>
        <ul id='msgList'>
          <li className={styles.response}>안녕하세요 ChatGPT 입니다.</li>
          <li className={styles.quest}>
            응 그래 잘지내? 난 잘지내.응 그래 잘지내? 난 잘지내.응 그래 잘지내?
            난 잘지내.응 그래 잘지내? 난 잘지내.응 그래 잘지내? 난 잘지내.
          </li>
        </ul>
        <div ref={messageEndRef}></div>
      </div>

      <div className={styles.under} margin-top='200px'>
        <form onSubmit={onSendMsg} onKeyDown={handleOnKeyPress}>
          <textarea
            type='text'
            name='color'
            placeholder='에이 하이에게 무엇이든 물어보세요'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            required
          />
          <input type='submit' value='전송' />
        </form>
      </div>
    </div>
  );
}
