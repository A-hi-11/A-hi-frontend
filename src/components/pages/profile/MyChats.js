/** @format */

import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navigation from '../../Navigation';
import Pagination from 'react-js-pagination';

import './Myprompt.css';

function Myprompt({ title, date }) {
  return (
    <div className='myprompt'>
      <Link
        style={{ textDecoration: 'none' }}
        to={{
          pathname: '/movie-detail',
          state: { title, date },
        }}
      >
        <div className='myPrompts__data'>
          <h2>{title}</h2>

          <h5 className='myPrompt__date'>{date}</h5>
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
