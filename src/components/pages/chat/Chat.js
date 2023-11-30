/** @format */

import { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { BiSolidConversation } from "react-icons/bi";
import { useRef } from "react";
import axios from "axios";
import Loading from "../../Loading";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messageEndRef = useRef();

  const [options, setOptions] = useState({
    mode: "text-davinci-002",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    stop_sequences: "",
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (result != undefined) {
      const li = document.createElement("li");
      li.className = styles.response;
      li.innerText = result;
      document.getElementById("msgList").appendChild(li);
      scrollToBottom(messageEndRef);
      setMsg("");
    }
  }, [result]);

  const onSendMsg = async (event) => {
    event.preventDefault();
    try {
      const li = document.createElement("li");
      li.className = styles.quest;
      li.innerText = msg;
      document.getElementById("msgList").appendChild(li);
      scrollToBottom(messageEndRef);
      setIsLoading(true);
      await axios
        .post(
          "http://43.201.240.250:8080/gpt",
          {
            prompt: msg,
            options: options,
          },
          {
            headers: { "Content-Type": "application/json" },
          },
        )
        .then((res) => {
          setResult(res.data.answer);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onSendMsg(e);
    }
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };
  const toggleOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const getOptionsContainerStyle = () => {
    return showOptions
      ? styles.optionsContainerVisible
      : styles.optionsContainer;
  };
  if (isLoading) {
    return <Loading color='white' pos='0px' rightPos='0px' />;
  }

  return (
    <div
      className={styles.main}
      style={{ marginLeft: "0", height: "max-content" }}
    >
      <div className={styles.title}>
        <BiSolidConversation size='40px' color='#4997B0' />
        <h2>안녕 AI</h2>
        <h3>에이-하이</h3>
      </div>
      <div className={styles.gptMenu}>
        <button
          onClick={toggleOptions}
          className='editBtn'
          style={{ fontSize: "15px", color: "#04364A", borderColor: "#04364A" }}
        >
          옵션
        </button>

        <div
          className={`${styles.optionsContainer} ${getOptionsContainerStyle()}`}
        >
          <div className={styles.optionItem}>
            <label>
              Mode:
              <select
                name='mode'
                value={options.mode}
                onChange={handleOptionChange}
              >
                <option value='text-davinci-002'>Text Davinci 002</option>
                <option value='text-davinci'>Text Davinci</option>
              </select>
            </label>
          </div>
          <div className={styles.optionItem}>
            <label>
              Model:
              <select
                name='model'
                value={options.model}
                onChange={handleOptionChange}
              >
                <option value='gpt-3.5-turbo'>GPT-3.5 Turbo</option>
                <option value='gpt-4'>GPT-4</option>
              </select>
            </label>
          </div>
          <div className={styles.optionItem}>
            <label>
              Temperature:
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                name='temperature'
                value={options.temperature}
                onChange={handleOptionChange}
              />
              {options.temperature}
            </label>
          </div>
          <div className={styles.optionItem}>
            <label>
              Stop Sequences:
              <textarea
                name='stop_sequences'
                value={options.stop_sequences}
                onChange={handleOptionChange}
              />
            </label>
          </div>
          <div className={styles.optionItem}>
            <label>
              Top P:
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                name='top_p'
                value={options.top_p}
                onChange={handleOptionChange}
              />
              {options.top_p}
            </label>
            <label>
              Frequency Penalty:
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                name='frequency_penalty'
                value={options.frequency_penalty}
                onChange={handleOptionChange}
              />
              {options.frequency_penalty}
            </label>
            <label>
              Presence Penalty:
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                name='presence_penalty'
                value={options.presence_penalty}
                onChange={handleOptionChange}
              />
              {options.presence_penalty}
            </label>
          </div>
        </div>
      </div>
      <div className={styles.result}>
        <ul id='msgList'>
          <li className={styles.response}>안녕하세요 ChatGPT 입니다.</li>
        </ul>
        <div ref={messageEndRef}></div>
      </div>

      <div className={styles.under}>
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
