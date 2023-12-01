/** @format */

// 전체 리스트 페이지에서 재활용해도 될 듯함
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import "./Myprompt.css";
import formatDateTime from "../../FormatDateTime";

function Myprompt(data, key) {
  const prompt_id = data.data.prompt_id;
  const nickname = data.data.nickname;
  const title = data.data.title;
  const description = data.data.description;
  const mediaType = data.data.mediaType;
  const category = data.data.category;
  const create_time = data.data.create_time;
  const update_time = data.data.update_time;
  const likes = data.data.likes;
  const comments = data.data.comments;

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
          <h5 className='myPrompt__date' style={{ marginBottom: "0" }}>
            등록: {nickname}
          </h5>
          <p
            className='myPrompt__date'
            style={{ marginBottom: "0", fontSize: "13px" }}
          >
            등록일: {formatDateTime(create_time)}
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
  title: PropTypes.string.isRequired,
  create_time: PropTypes.string.isRequired,
  update_time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
};

export default Myprompt;
