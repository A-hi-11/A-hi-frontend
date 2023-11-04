/** @format */

// 전체 리스트 페이지에서 재활용해도 될 듯함

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Myprompt.css';

function Myprompt({ title, id, date, description, userName }) {
  return (
    <div className='myprompt'>
      <Link
        style={{ textDecoration: 'none', color: 'inherit' }}
        to={{
          pathname: `/promptdetail/${id}`,
        }}
      >
        <div className='myPrompts__data'>
          <h2>{title}</h2>
          {description !== '' && (
            <p className='myPrompts_des'>{description.slice(0, 97)}...</p>
          )}
          <h5 className='myPrompt__date'>{date}</h5>
          <p style={{ textAlign: 'right' }}>등록 : {userName}</p>
        </div>
      </Link>
    </div>
  );
}

Myprompt.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userName: PropTypes.number.isRequired,
};

export default Myprompt;
