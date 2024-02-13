/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import formatDateTime from "../../FormatDateTime";
import "./Myprompt.css";

function Myprompt(
  {
    data: {
      prompt_id,
      nickname,
      title,
      description,
      mediaType,
      create_time,
      update_time,
      likes,
      comments,
    },
  },
  key,
) {
  return (
    <div className='myprompt'>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={{
          pathname: `/promptdetail/${prompt_id}`,
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
              {mediaType === "text" ? "ChatGPT" : "StableDiffusion"}
            </p>
          </div>
          <h2>{title}</h2>
          {description !== "" && (
            <p className='myPrompts_des'>
              {description.length > 40
                ? description.substring(0, 40) + "..."
                : description}
            </p>
          )}
          <h4 className='myPrompt__date' style={{ marginBottom: "0" }}>
            등록: {nickname}
          </h4>
          <p
            className='myPrompt__date'
            style={{ marginTop: "30px", fontSize: "12px", lineHeight: "8px" }}
          >
            등록일: {formatDateTime(create_time)}
          </p>
          <p
            className='myPrompt__date'
            style={{ fontSize: "12px", lineHeight: "8px" }}
          >
            수정일: {formatDateTime(update_time)}
          </p>

          <p style={{ marginLeft: "7px", marginRight: "7px" }}>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "#e63b7a", marginRight: "5px" }}
            />
            {likes}{" "}
            <FontAwesomeIcon
              icon={faComment}
              style={{ color: "#04364a", marginLeft: "5px" }}
            />{" "}
            {comments}
          </p>
        </div>
      </Link>
    </div>
  );
}

Myprompt.propTypes = {
  prompt_id: PropTypes.number,
  title: PropTypes.string,
  create_time: PropTypes.string,
  update_time: PropTypes.string,
  description: PropTypes.string,
};

export default Myprompt;
