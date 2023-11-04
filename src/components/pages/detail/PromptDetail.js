/** @format */

import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import Navigation from '../../Navigation';
import './PromptDetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PromptDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [user, setUser] = useState([]);
  const messageEndRef = useRef();
  const [Input, setInput] = useState('');

  console.log(id);

  useEffect(() => {
    getMyPrompts().then(getUser());
  }, []);

  const getMyPrompts = async () => {
    await axios
      .get(`http://localhost:3001/MyPrompts/${id}`)
      .then((res) => setDetail(res.data));
  };

  const getUser = async () => {
    // const userId = detail.user_id;
    // await axios
    //   .get(`http://localhost:3001/User/${userId}`)
    //   .then((res) => setUser(res.data));
    setUser({ name: 'Unknown' });
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function onSendMsg(event) {
    event.preventDefault();
    const ul = document.getElementById('msgList');
    const li = document.createElement('li');
    //li.className = 'quest';
    li.innerText = Input;
    ul.appendChild(li);
    scrollToBottom(messageEndRef);
  }
  return (
    <div className='detailMain' style={{ display: 'flex' }}>
      <Navigation />
      <div style={{ justifyContent: 'center', display: 'inline-flex' }}>
        <div
          style={{ width: '500px', marginTop: '30px', paddingLeft: '10rem' }}
        >
          <h1>{detail.title}</h1>
          <p>2023.10.25</p>
          <h3>프롬프트 설명</h3>
          <p>{detail.description}</p>
          <div style={{ backgroundColor: 'grey', padding: '20px' }}>
            <h1>생성 모델 사용 공간</h1>
          </div>
          <h3>프롬프트 내용</h3>
          <div className='promptContent'>
            <p>
              안녕하세요, 당신은 이제부터 영한 번역 서비스를 위한
              번역로봇입니다. 사용자가 입력하는 영문에 대해 문장마다 끊어 영문을
              출력하고 한 줄을 띄고 한글로 번역해주세요. 또한 영문은 굵음 처리를
              하여 출력하고 한글은 소괄호 안에 넣어 출력해주세요.
            </p>
          </div>
        </div>
      </div>
      <span className='innerInfo'>
        <img className='profilePic' src='img/profile_exm.png' width='100px' />
        <span className='nameEmail'>
          <h2>name</h2>
          <h4>mail@gmail.com</h4>
        </span>
      </span>
    </div>
  );
};

export default PromptDetail;
