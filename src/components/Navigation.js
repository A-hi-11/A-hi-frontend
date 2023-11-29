/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <div className='navContainer'>
      <div>
        <Link to='/'>홈</Link>
      </div>
      <div>
        <Link to='/generative'>생성형AI</Link>
      </div>
      <div>
        <Link to='/create'>프롬프트 생성</Link>
      </div>
      <div>
        <Link to='/profile'>마이 페이지</Link>
      </div>
      <div>
        <Link to='/login'>로그인</Link>
      </div>
    </div>
  );
};

export default Navigation;
