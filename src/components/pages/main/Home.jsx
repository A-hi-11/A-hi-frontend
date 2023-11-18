import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../assets/Strings";
import Navigation from "../../Navigation";
import Data from "../../../assets/data";
import ImageData from "../../../assets/imageData";

import "./Home.css";
const Home = () => {
    const navigate=useNavigate();
    const [category,setCategory] = useState(1);
    const [boardList, setBoardList] = useState([]);
    const [mainKind,setMainKind]=useState(1)

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
  return (
    <div>
      <Navigation />
      <ul className="mainKindForm">
            <div className={"mainKind"+(mainKind==1 ? "active" : "")} onClick={()=>{setMainKind(1);}}>chatGPT</div>
            <div className={"mainKind"+(mainKind==2 ? "active" : "")} onClick={()=>{setMainKind(2)}}>Image</div>
            </ul>
      <div className="contContainer">
      
        <div className="logo">logo 들어갈 자리</div>

      <input className="search" placeholder="원하는 프롬프트를 검색하세요." />
        <div>
          <ul className="mainCategory">
            <div className={"mainCategoryCont"+(category==1 ? "active" : "")} onClick={()=>{setCategory(1);}}>업무용</div>
            <div className={"mainCategoryCont"+(category==2 ? "active" : "")} onClick={()=>{setCategory(2)}}>생활</div>
            <div className={"mainCategoryCont"+(category==3 ? "active" : "")} onClick={()=>{setCategory(3)}}>프로그래밍</div>
            <div className={"mainCategoryCont"+(category==4 ? "active" : "")} onClick={()=>{setCategory(4)}}>창의</div>
            <div className={"mainCategoryCont"+(category==5 ? "active" : "")} onClick={()=>{setCategory(5)}}>교육</div>
            <div className={"mainCategoryCont"+(category==6 ? "active" : "")} onClick={()=>{setCategory(6)}}>기타</div>
          </ul>
          </div>
          <ul >
          <div className="contList">
          {mainKind==1 ? Data&&Data.promPt.map((board) => (
              <Link to={`/detail/${board}`}>
              <div key={board.date} className="contContent">
              <img className='mainProfilePic' src={"img/"+`${board.profile}`} width='1px' alt='my profile'/>
                <div className="contTitle">{board.title}</div>
                <div className="contExplain">{board.explain}</div>
                <div className="contBottom">
                <div className="contDate">{board.date}&nbsp;&nbsp;|</div>
                <div className="contDate">&nbsp;&nbsp;♡{board.like}&nbsp;&nbsp;|</div>
                <div className="contDate">&nbsp;&nbsp;댓글{board.comment}</div>
                </div>
                </div>
              </Link>
          
          )) : ImageData&&ImageData.promPt.map((board) => (
            <Link to={`/detail/${board}`}>
            <div key={board.date} className="imageContContent">
              <img className="contImage" src={"img/"+`${board.url}`+".JPG"} alt="image"></img>
              <div className="contTitle">{board.title}</div>
              <div className="contExplain">{board.explain}</div>
              <div className="contBottom">
              <div className="contDate">{board.date}&nbsp;&nbsp;|</div>
              <div className="contDate">&nbsp;&nbsp;♡{board.like}&nbsp;&nbsp;|</div>
              <div className="contDate">&nbsp;&nbsp;댓글{board.comment}</div>
              </div>
              </div>
            </Link>
            ))}
            </div>
        </ul>
      </div>
    </div>
  );
};

export default Home;