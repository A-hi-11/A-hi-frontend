/** @format */

import React from 'react';

const PassCheck = ({ password }) => {
  const onPassCheck = (e) => {
    if (e.value === password) {
      console.log('옳은 비밀번호 입니다.');
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
  };

  return (
    <div className='editInfo'>
      <span className='content'>
        <p>비밀번호를 입력하세요</p>
        <form>
          <input
            onSubmit={onPassCheck}
            onChange={onChange}
            placeholder='비밀번호를 입력하세요'
            autoFocus
            className='formInput'
            required
          />
          <input type='submit' value='확인' className='formBtn' />
        </form>
      </span>
    </div>
  );
};

export default PassCheck;
