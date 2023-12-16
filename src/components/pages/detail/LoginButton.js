/** @format */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 41%;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const LoginButton = () => {
  return (
    <Link to='/login'>
      <StyledButton>로그인</StyledButton>
    </Link>
  );
};

export default LoginButton;
