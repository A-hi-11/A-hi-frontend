/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const loginStatus = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const onClickLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className='navContainer'>
      <div>
        <Link to='/'>홈</Link>
      </div>
      <div>
        <Link to='/generative'>생성형 AI</Link>
      </div>
      <div>{loginStatus ? <Link to='/create'>프롬프트 생성</Link> : null}</div>
      <div>
        {loginStatus ? (
          <Link to='/profile'>마이 페이지</Link>
        ) : (
          <Link to='/login'>로그인</Link>
        )}
      </div>
      <div>
        {loginStatus ? (
          <button className='logoutBtn' onClick={onClickLogout}>
            로그아웃
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Navigation;
