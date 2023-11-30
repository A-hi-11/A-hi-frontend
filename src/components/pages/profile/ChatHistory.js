/** @format */

import { React, useParams } from "react";
import PropTypes from "prop-types";
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
          <h2>{data.chat_room_name}</h2>
          {data.last_message !== undefined && (
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
