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
  const storedJwtToken = localStorage.getItem("jwtToken");

  const [options, setOptions] = useState({
    model_name: "gpt-3.5-turbo",
    temperature: 0.7,
    maximum_length: 200,
    stop_sequence: "",
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(options);
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
    const li = document.createElement("li");
    li.className = styles.quest;
    li.innerText = msg;
    const ul = document.getElementById("msgList");
    ul.appendChild(li);
    scrollToBottom(messageEndRef);
    try {
      setIsLoading(true);
      await axios
        .post(
          "https://a-hi-prompt.com/gpt/24",
          {
            prompt: msg,
            gptConfigInfo: options,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + storedJwtToken,
            },
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
          id='optionBtn'
          style={{ fontSize: "15px", color: "#04364A", borderColor: "#04364A" }}
        >
          옵션
        </button>

        <div
          className={`${styles.optionsContainer} ${getOptionsContainerStyle()}`}
        >
          <div className={styles.optionItem} id='optionBox'>
            <label>
              Model:
              <select
                name='model_name'
                value={options.model_name}
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
              Maximum_Length:
              <input
                type='range'
                min='1'
                max='200'
                step='1'
                name='maximum_length'
                value={options.maximum_length}
                onChange={handleOptionChange}
              />
              {options.maximum_length}
            </label>
          </div>
          <div className={styles.optionItem}>
            <label>
              Stop Sequence:
              <textarea
                name='stop_sequence'
                value={options.stop_sequence}
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
        {isLoading ? <Loading color='white' pos='0px' rightPos='0px' /> : null}
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
