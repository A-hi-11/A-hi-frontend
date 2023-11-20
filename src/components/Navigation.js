/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <div className='navContainer'>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/generative'>Generative AI</Link>
      </div>
      <div>
        <Link to='/search'>Search</Link>
      </div>
      <div>
        <Link to='/profile'>Profile</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default Navigation;
