import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../assets/Strings";
const Home = () => {
    const navigate=useNavigate();
    const [boardList, setBoardList] = useState([]);

    const getBoardList = async () => {
        const contents = await (await axios.get(BASE_URL)); // 2) 게시글 목록 데이터에 할당  
        setBoardList(contents.output); // 3) boardList 변수에 할당
      }
    useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);
    const moveToWrite = () => {
        navigate('/write');
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
            <button onClick={moveToWrite}>글쓰기</button>
      </div>
    </div>
  );
};

export default Home;