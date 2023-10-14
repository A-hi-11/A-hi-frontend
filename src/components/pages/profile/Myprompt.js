//전체 리스트 페이지에서 재활용해도 될 듯함

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Myprompt.css";

function Myprompt({ title, id, date, description }) {
  return (
    <div className="myprompt">
      <Link
        to={{
          pathname: "/movie-detail",
          state: { id, date, description },
        }}
      >
        <div className="myPrompts__data">
          <h2>{id}</h2>
          <h2>{title}</h2>
          <h3 className="myPrompt__">{description}</h3>
          <h5 className="myPrompt__date">{date}</h5>
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
};

export default Myprompt;
