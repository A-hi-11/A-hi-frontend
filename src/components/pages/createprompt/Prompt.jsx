import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../assets/Strings";
const Prompt = () => {
    const navigate=useNavigate();
    const [boardList, setBoardList] = useState([]);

    /*const getBoardList = async () => {
        const contents = await (await axios.get(BASE_URL)); // 2) 게시글 목록 데이터에 할당  
        setBoardList(contents.output); // 3) boardList 변수에 할당
      }*/
    /*useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);*/
    const moveToWrite = () => {
        navigate('/write');
    };
    const moveToCreate = () => {
      navigate('/create');
  };
  return (
    <div>
        <ul>
        {boardList&&boardList.map((board) => (
          // 4) map 함수로 데이터 출력
          /*<li key={board.idx}>
            <Link to={`/detail/${board.idx}`}>{board.title}</Link>
        </li>*/
        <li key={board}>
            <Link to={`/detail/${board}`}>{board}</Link>
        </li>
        ))}
        </ul>
        <div>
            <button onClick={moveToCreate}>전체</button>
            <button onClick={moveToCreate}>업무용</button>
            <button onClick={moveToCreate}>생활</button>
            <button onClick={moveToCreate}>프로그래밍</button>
            <button onClick={moveToCreate}>창의</button>
            <button onClick={moveToCreate}>교육</button>
            <button onClick={moveToCreate}>기타</button>
      </div>
      <button onClick={moveToCreate}>새 프롬포트 만들기</button>
    </div>
  );
};

export default Prompt;