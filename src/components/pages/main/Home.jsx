import React,{useEffect, useState} from 'react';
import {Link, useNavigate,useLocation} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../assets/Strings";
import Navigation from "../../Navigation";
import "./Home.css";
import cookie from 'react-cookies';
import moment from 'moment';
import formatDateTime from '../../FormatDateTime';

const Home = () => {
  const [refresh, setRefresh] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

    const [category,setCategory] = useState("task");
    const [boardList, setBoardList] = useState([]);
    const [mainKind,setMainKind]=useState("text")
    const [sortKind,setSortKind]=useState("time")
    const [data,setData]=useState()
    const [imgData,setImgData]=useState()
  const storedJwtToken = localStorage.getItem("jwtToken")
    const [search,setSearch]=useState("")

    /*const getBoardList = async () => {
        const contents = await (await axios.get(BASE_URL)); // 2) 게시글 목록 데이터에 할당  
        setBoardList(contents.output); // 3) boardList 변수에 할당
      }
    useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);*/
    const handleOnKeyPress = (e) => {
      if (e.key === "Enter") {
        reloadList();
      }
    };
    const reloadList = async () => {
      try {
        const res = await (axios.post("https://a-hi-prompt.com/prompt/view",{
          "sort": sortKind,
          "category": category, //수정필요
          "search": search,
          "mediaType": mainKind
        }))
        setData(res.data)
      }
    catch(error) {
      console.log(error);
    }};
  useEffect( ()=>{
    const getList = async () => {
      try {
        const res = await (axios.post("https://a-hi-prompt.com/prompt/view",{
          "sort": sortKind,
          "category": category, //수정필요
          "search": search,
          "mediaType": mainKind
        }))
        setData(res.data)

      }
    catch(error) {
      console.log(error);
    }};
  getList()
  }
  
  ,[mainKind,category,sortKind])


    useEffect(() => {
      // 현재 페이지의 쿼리 스트링을 가져옴
      const queryString = window.location.search;
  
      if (queryString !== '') {


        const urlParams = new URLSearchParams(window.location.search);
        const memberId = urlParams.get("member_id");
        const nickname = urlParams.get("nickname");
        const profileImage = urlParams.get("profile_image");
        const jwtToken = urlParams.get("jwt");
        const isOAuth = urlParams.get("isOAuth")
  
        // 추출한 값들을 localStorage에 저장
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("profileImage", profileImage);
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("isOAuth", isOAuth);
    setRefresh((refresh) => refresh * -1);

  
      }
    }, []);



  return (
    <div>
      <Navigation />
      <ul className="mainKindForm">
            <div className={"mainKind"+(mainKind=="text" ? "active" : "")} onClick={()=>{setCategory("task");setMainKind("text");}}>chatGPT</div>
            <div className={"mainKind"+(mainKind=="image" ? "active" : "")} onClick={()=>{setCategory("human");setMainKind("image")}}>Image</div>
            </ul>
      <div className="contContainer">

        <div className="logo" style={{cursor:"pointer"}} onClick={()=>{setSortKind("time");setCategory("task");setSearch("");setMainKind("text");}}>
          
      <img src='logo.png' width={"80px"} style={{margin:"0px"}}/>
          <h2>안녕 AI</h2>
          <h3>에이-하이</h3>
      </div>
      <input className="search" onChange={e=>{setSearch(e.target.value)}} onKeyDown={handleOnKeyPress} placeholder="원하는 프롬프트를 검색하세요." />
        <div>
          <ul className="mainCategory">
            
            <div className={"mainCategoryCont"+(category=="task"||category=="human" ? "active" : "")} onClick={()=>{mainKind=="text"?setCategory("task"):setCategory("human")}}>{mainKind=="text"?"업무용":"인물"}</div>
            <div className={"mainCategoryCont"+(category=="life"||category=="animal" ? "active" : "")} onClick={()=>{mainKind=="text"?setCategory("life"):setCategory("animal")}}>{mainKind=="text"?"생활":"동물"}</div>
            <div className={"mainCategoryCont"+(category=="programming"||category=="sight" ? "active" : "")} onClick={()=>{mainKind=="text"?setCategory("programming"):setCategory("sight")}}>{mainKind=="text"?"프로그래밍":"풍경"}</div>
            <div className={"mainCategoryCont"+(category=="creative"||category=="obj" ? "active" : "")} onClick={()=>{mainKind=="text"?setCategory("creative"):setCategory("obj")}}>{mainKind=="text"?"창의":"사물"}</div>
            <div className={"mainCategoryCont"+(category=="edu"||category=="character" ? "active" : "")} onClick={()=>{mainKind=="text"?setCategory("edu"):setCategory("character")}}>{mainKind=="text"?"교육":"캐릭터"}</div>
            <div className={"mainCategoryCont"+(category=="etc" ? "active" : "")} onClick={()=>{setCategory("etc")}}>기타</div>

          </ul>
          </div>
          <div>
            <ul className="sortKind">
              <div className={"sortKindCont"+(sortKind=="time" ? "active" : "")} onClick={()=>{setSortKind("time")}}>최신순</div>
              <div className={"sortKindCont"+(sortKind=="likes" ? "active" : "")} onClick={()=>{setSortKind("likes")}}>인기순</div>
            </ul>
          </div>
          <ul className="contList" >
          
          {mainKind=="text" ? data&&data.map((board) => (
              
              <Link to={`/promptdetail/${board.prompt_id}`}>
              <div key={board.create_time} className="contContent">
              {/*<img className='mainProfilePic' src={"img/"+`${board.profile}`} width='1px' alt='my profile'/>}*/}
                <div className="contTitle">{board.title}</div>
                <div className="contExplain">{board.description}</div>
                <div className="contBottom">
                <div className="contDate">{formatDateTime(board.create_time)}&nbsp;&nbsp;|</div>
                <div className="contDate">&nbsp;&nbsp;♡{board.likes}&nbsp;&nbsp;|</div>
                <div className="contDate">&nbsp;&nbsp;댓글{board.comments}</div>
                </div>
                </div>
              </Link>
          
          )) : data&&data.map((board) => (
            <Link to={`/promptdetail/${board.prompt_id}`}>
            <div key={board.create_time} className="imageContContent">
              <img className="contImage" src={board.image} alt="image"></img>
              <div className="contTitle">{board.title}</div>
              <div className="contExplain">{board.description}</div>
              <div className="contBottom">
              <div className="contDate">{formatDateTime(board.create_time)}&nbsp;&nbsp;|</div>
              <div className="contDate">&nbsp;&nbsp;♡{board.likes}&nbsp;&nbsp;|</div>
              <div className="contDate">&nbsp;&nbsp;댓글{board.comments}</div>
              </div>
              </div>
            </Link>
            ))}
            
        </ul>
      </div>
    </div>
  );
};

export default Home;