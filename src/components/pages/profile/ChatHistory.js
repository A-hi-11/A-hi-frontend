/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Myprompt.css';

function ChatHistory({ title, id, date, lastchat }) {
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
          {lastchat !== '' && (
            <p className='myPrompts_des'>{lastchat.slice(0, 97)}...</p>
          )}
          <h5 className='myPrompt__date' style={{ marginBottom: '0' }}>
            마지막 대화: {date}
          </h5>
        </div>
      </Link>
    </div>
  );
}

ChatHistory.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userName: PropTypes.number.isRequired,
};

export default ChatHistory;
