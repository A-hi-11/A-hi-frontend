/** @format */

import { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { useRef } from "react";
import axios from "axios";
import Loading from "../../Loading";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const storedJwtToken = localStorage.getItem("jwtToken");
  const loginStatus = localStorage.getItem("memberId");
  const [chatId, setChatId] = useState(-1);
  const messageEndRef = useRef();
  const [existLi, setExistLi] = useState(null);

  const [options, setOptions] = useState({
    model_name: "gpt-3.5-turbo",
    temperature: 0.7,
    maximum_length: 200,
    stop_sequence: "",
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  useEffect(() => {
    if (existLi != null) {
      existLi.innerText = result;
    }
  }, [result]);

  const onSendMsg = async (event) => {
    event.preventDefault();
    const li = document.createElement("li");
    li.className = styles.quest;
    li.innerText = msg;
    const ul = document.getElementById("msgList");
    ul.appendChild(li);

    await fetch(process.env.REACT_APP_API_URL + `/gpt/${chatId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + storedJwtToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: msg,
        gptConfigInfo: options,
      }),
    }).then(async (response) => {
      setMsg("");

      console.log("response body", response.body);

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      const li = document.createElement("li");
      li.className = styles.response;

      setExistLi(li);

      document.getElementById("msgList").appendChild(li);
      setMsg("");
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        let str = JSON.stringify(value);
        str = str.replace(/\n/gi, "\\r\\n");
        let json = JSON.parse(str);

        const cleanedStr = json.replace(/data:|\n/g, "").trim();

        let chatRoomId;
        const matchResult = cleanedStr.match(/\d+/);
        if (matchResult) {
          chatRoomId = matchResult[0];
        }

        let simpleText;
        simpleText = cleanedStr.replace(/\\r\\n/g, "").trim();
        const cleanedText = simpleText.replace(/chat_room_id:.*/, "");

        console.log("Chat Room ID:", chatRoomId);
        console.log("Simple Text:", cleanedText);

        setResult((prev) => prev + cleanedText);

        if (chatRoomId) {
          setChatId(chatRoomId);
          setIsLoading(false);
        }
      }
      setResult("");
      setExistLi(null);
    });
  };

  // const handleOnKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     onSendMsg(e);
  //   }
  // };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    if (value == "gpt-4" && !loginStatus) {
      alert("GPT-4는 회원만 이용할 수 있습니다.");
      setOptions((prevOptions) => ({
        ...prevOptions,
        model_name: "gpt-3.5 Turbo",
      }));
    }
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
        <img src='logo.png' width={"70px"} style={{ margin: "0px" }} />
        <div style={{ justifyContent: "center" }}>
          <h3>안녕 AI</h3>
          <h2>에이-하이</h2>
        </div>
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
          <div ref={messageEndRef}></div>
        </ul>
      </div>

      <div className={styles.under}>
        <form onSubmit={onSendMsg}>
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
};

export default Chat;
