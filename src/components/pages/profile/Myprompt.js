/** @format */

// 전체 리스트 페이지에서 재활용해도 될 듯함

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import './Myprompt.css';

function Myprompt({ title, id, date, description, likes, comments }) {
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
          <h5 className='myPrompt__date' style={{ marginBottom: '0' }}>
            등록: {date}
          </h5>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <FontAwesomeIcon icon={faHeart} style={{ color: '#e63b7a' }} />
            <p style={{ marginLeft: '7px', marginRight: '7px' }}>{likes}</p>
            <FontAwesomeIcon
              icon={faComment}
              style={{ color: '#04364a', marginLeft: '5px' }}
            />
            <p style={{ marginLeft: '7px', marginRight: '7px' }}>{comments}</p>
          </div>
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
