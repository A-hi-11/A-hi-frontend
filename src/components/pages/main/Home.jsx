import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../assets/Strings";
import Navigation from "../../Navigation";
import Data from "../../../assets/data";
import "./Home.css";
const Home = () => {
    const navigate=useNavigate();
    const [boardList, setBoardList] = useState([]);

    /*const getBoardList = async () => {
        const contents = await (await axios.get(BASE_URL)); // 2) 게시글 목록 데이터에 할당  
        setBoardList(contents.output); // 3) boardList 변수에 할당
      }
    useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);*/
    const moveToCreate = () => {
      navigate('/prompt');
    
  };
  console.log(Data);
  return (
    <div >
      <Navigation />
        <ul className="contContainer">
        {Data&&Data.promPt.map((board) => (
        <div key={board.date} className="contContent">
            <Link to={`/detail/${board}`}>
              <div className="contTitle">{board.title}</div>
              <div className="contExplain">{board.explain}</div>
              <div className="contDate">{board.date}</div>
            </Link>
        </div>
        ))}
        </ul>
        <div>
            
      </div>
    </div>
  );
};

export default Home;