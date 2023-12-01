import React,{useEffect, useState} from 'react';
import {Link, useNavigate,useLocation} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../assets/Strings";
import Navigation from "../../Navigation";
import Data from "../../../assets/data";
import ImageData from "../../../assets/imageData";
import { BiSolidConversation } from "react-icons/bi";
import "./Home.css";
import cookie from 'react-cookies';


const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

    const [category,setCategory] = useState(1);
    const [boardList, setBoardList] = useState([]);
    const [mainKind,setMainKind]=useState(1)
    const [sortKind,setSortKind]=useState("date")
    const [data,setData]=useState()
    const [imgData,setImgData]=useState()
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
  useEffect( ()=>{
    const getList = async () => {
      try {
        const res = await (axios.get("https://a-hi-prompt.com/prompt/view?sort=category&search=",{
          params : {"sort" : "time"},
        }))
        setData(res.data)
        console.log(cookie.load("token"))
        
      }
    catch(error) {
      console.log(error);
    }};
  getList()
  }
  ,[])


    useEffect(() => {
      // 현재 페이지의 쿼리 스트링을 가져옴
      const queryString = window.location.search;
  
      // 쿼리 스트링이 비어있지 않으면 (기본 주소 뒤에 쿼리가 있다면)
      if (queryString !== '') {
        // 실행할 작업 수행
        console.log('기본 주소 뒤에 쿼리가 붙어 있습니다.');

        console.log("쿼리문이 있는 페이지입니다.");

        const urlParams = new URLSearchParams(window.location.search);
        const memberId = urlParams.get("member_id");
        const nickname = urlParams.get("nickname");
        const profileImage = urlParams.get("profile_image");
        const jwtToken = urlParams.get("jwt");
  
        // 추출한 값들을 localStorage에 저장
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("profileImage", profileImage);
        localStorage.setItem("jwtToken", jwtToken);
  
        // 예시: 다른 페이지로 리다이렉트
        // window.location.href = '/new-page';
      }
    }, []);



  return (
    <div>
      <Navigation />
      <ul className="mainKindForm">
            <div className={"mainKind"+(mainKind==1 ? "active" : "")} onClick={()=>{setMainKind(1);}}>chatGPT</div>
            <div className={"mainKind"+(mainKind==2 ? "active" : "")} onClick={()=>{setMainKind(2)}}>Image</div>
            </ul>
      <div className="contContainer">


        <div className="logo">
          <h2>안녕 AI</h2>
          <h3>에이-하이</h3>
      </div>
      <input className="search" placeholder="원하는 프롬프트를 검색하세요." />
        <div>
          <ul className="mainCategory">
            
            <div className={"mainCategoryCont"+(category==1 ? "active" : "")} onClick={()=>{setCategory(1)}}>{mainKind==1?"업무용":"인물"}</div>
            <div className={"mainCategoryCont"+(category==2 ? "active" : "")} onClick={()=>{setCategory(2)}}>{mainKind==1?"생활":"동물"}</div>
            <div className={"mainCategoryCont"+(category==3 ? "active" : "")} onClick={()=>{setCategory(3)}}>{mainKind==1?"프로그래밍":"풍경"}</div>
            <div className={"mainCategoryCont"+(category==4 ? "active" : "")} onClick={()=>{setCategory(4)}}>{mainKind==1?"창의":"사물"}</div>
            <div className={"mainCategoryCont"+(category==5 ? "active" : "")} onClick={()=>{setCategory(5)}}>{mainKind==1?"교육":"캐릭터"}</div>
            <div className={"mainCategoryCont"+(category==6 ? "active" : "")} onClick={()=>{setCategory(6)}}>기타</div>

          </ul>
          </div>
          <div>
            <ul className="sortKind">
              <div className={"sortKindCont"+(sortKind=="date" ? "active" : "")} onClick={()=>{setSortKind("date")}}>최신순</div>
              <div className={"sortKindCont"+(sortKind=="like" ? "active" : "")} onClick={()=>{setSortKind("like")}}>인기순</div>
            </ul>
          </div>
          <ul >
          <div className="contList">
          
          {mainKind==1 ? data&&data.map((board) => (
              
              <Link to={`/promptdetail/${board.prompt_id}`}>
              <div key={board.create_time} className="contContent">
              {/*<img className='mainProfilePic' src={"img/"+`${board.profile}`} width='1px' alt='my profile'/>}*/}
                <div className="contTitle">{board.title}</div>
                <div className="contExplain">{board.description}</div>
                <div className="contBottom">
                <div className="contDate">{board.create_time}&nbsp;&nbsp;|</div>
                <div className="contDate">&nbsp;&nbsp;♡{board.likes}&nbsp;&nbsp;|</div>
                <div className="contDate">&nbsp;&nbsp;댓글{board.comment}</div>
                </div>
                </div>
              </Link>
          
          )) : data&&data.map((board) => (
            <Link to={`/promptdetail/${board.prompt_id}`}>
            <div key={board.create_time} className="imageContContent">
              {/*<img className="contImage" src={"img/"+`${board.url}`+".JPG"} alt="image"></img>*/}
              <div className="contTitle">{board.title}</div>
              <div className="contExplain">{board.description}</div>
              <div className="contBottom">
              <div className="contDate">{board.create_time}&nbsp;&nbsp;|</div>
              <div className="contDate">&nbsp;&nbsp;♡{board.likes}&nbsp;&nbsp;|</div>
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