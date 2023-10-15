//전체 리스트 페이지에서 재활용해도 될 듯함

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Myprompt.css";

function Myprompt({ title, id, date, description, userName }) {
  console.log(userName);
  return (
    <div className="myprompt">
      <Link
        style={{ textDecoration: "none" }}
        to={{
          pathname: "/movie-detail",
          state: { id, date, description },
        }}
      >
        <div className="myPrompts__data">
          <h2>{title}</h2>
          {description !== "" && (
            <p className="myPrompts_des">{description.slice(0, 97)}...</p>
          )}
          <h5 className="myPrompt__date">{date}</h5>
          <p style={{ textAlign: "right" }}>등록 : {userName}</p>
        </div>
      </Link>
    </div>
  );
}

Myprompt.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  userName: PropTypes.number,
};

export default Myprompt;
