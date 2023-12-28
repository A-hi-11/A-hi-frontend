/** @format */

import { React } from "react";
import { Link } from "react-router-dom";
import "./Myprompt.css";
import "../../stablediffusion/PromptStableDiffusion.css";

import formatDateTime from "../../FormatDateTime";

function ChatHistory({ data, key }) {
  return (
    <div className='myprompt'>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={{
          pathname: `/chat_history/${data.chat_room_id}`,
          state: { chat_room_name: data.chat_room_name },
        }}
      >
        <div className='myPrompts__data'>
          <div
            className='promptbox'
            style={{
              margin: 0,
              height: "10px",
              width: "fit-content",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            <p style={{ margin: "0", fontSize: "10px" }}>
              {data.model_type === "image" ? "StableDiffusion" : "ChatGPT"}
            </p>
          </div>
          <h2>{data.chat_room_name}</h2>
          {data.last_message !== null && data.model_type != "image" && (
            <p className='myPrompts_des'>{data.last_message.slice(0, 97)}...</p>
          )}
          <h5 className='myPrompt__date' style={{ marginBottom: "0" }}>
            생성일: {formatDateTime(data.create_time)}
          </h5>
        </div>
      </Link>
    </div>
  );
}

export default ChatHistory;
