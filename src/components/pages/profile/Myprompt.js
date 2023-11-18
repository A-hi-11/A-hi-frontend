/** @format */

// 전체 리스트 페이지에서 재활용해도 될 듯함
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import "./Myprompt.css";

function Myprompt(data, key) {
  const prompt_id = data.data.prompt_id;
  const member_id = data.data.member_id;
  const title = data.data.title;
  const description = data.data.description;
  const mediaType = data.data.mediaType;
  const category = data.data.category;
  const create_time = data.data.create_time;
  const update_time = data.data.update_time;
  const likes = data.data.likes;
  const comments = data.data.comments.length;

  function formatDateTime(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;

    return formattedDate;
  }

  return (
    <div className='myprompt'>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={{
          pathname: `/promptdetail/${prompt_id}`,
        }}
      >
        <div className='myPrompts__data'>
          <h2>{title}</h2>
          {description !== "" && (
            <p className='myPrompts_des'>{description}...</p>
          )}
          <h5 className='myPrompt__date' style={{ marginBottom: "0" }}>
            등록: {member_id}
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
  prompt_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  created_time: PropTypes.string.isRequired,
  update_time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  member_id: PropTypes.string.isRequired,
};

export default Myprompt;
