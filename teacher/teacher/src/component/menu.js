/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import  Styled, { styled }  from 'styled-components'
// import  Image from '../images/logo.png'
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const Conatin = Styled.div`
flex:1.5;
width:240px;
background-color:white;
height:100vh;
font-size:14px;
overflow-y:auto;
position:sticky;
// top:12;
// color:orange;
`

const Wrapper = Styled.div`
padding:18px 26px;

`

const Logo = Styled.div`
display:flex;
align-items:center;
gap:5px
font-weight:bold;
margin-bottom:25px;

`

const Img = Styled.img`
height:20px;
margin-right:5px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 8px 0;

&:hover {
  background-color: black;
  color: blue;
  border-radius: 4px;
  padding-left: 10px;
  transition: all 0.3s ease-out;
}

`
const Hr = Styled.hr`
margin: 15px 0;
border: 1px solid :black;

`


const Login = styled.div``
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #333;
  color: blue;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  `


  const Title = styled.h2`
  font-size: 14px
  font-weight: 500;
  color: #606060;
  margin-bottom: 10px;
  `


const Menu = ({darkmode,setDarkmode ,clickin, setClick}) => {

  const [current, setCurrent] = useState(false);

  const navigate = useNavigate();

  // const { user } = useSelector((state) => state.AuthReducer);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <>
    {isHomePage ? null : (
    <Conatin >
      <Wrapper>
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Logo>
          {/* <Img src={Image} alt="logo" /> */}
          <span>FLeck</span>
        </Logo>
        </Link>
        <Item>
          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            <LibraryMusicOutlinedIcon /> Home
          </Link>
        </Item>
        <Hr />
        <Item>
          <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
            <LibraryMusicOutlinedIcon /> Register Course
          </Link>
        </Item>

        <Hr />
        {/* {!current &&  */}
          <Login>
          Sign in to Like videos, comment, and subscribe.
          <Link to="signin" style={{ textDecoration: "none" }}>
          <Button><AccountCircleOutlinedIcon/> Sign In</Button>
          </Link>
        </Login>
        <Hr />
        <Title>Best of FLeck</Title>
        <Item>
          <Link to="/marks" style={{ textDecoration: "none", color: "inherit" }}>
            <LibraryMusicOutlinedIcon /> Marks
          </Link>
        </Item>
        <Item>
          <Link to="/Attendence" style={{ textDecoration: "none", color: "inherit" }}>
            <LibraryMusicOutlinedIcon /> Attendence
          </Link>
        </Item>
        {/* <Item><MovieOutlinedIcon /></Item>
        <Item><LiveTvOutlinedIcon />News</Item>
        <Item><LiveTvOutlinedIcon />Live</Item> */}
        <Hr />
        <Item><SettingsBrightnessOutlinedIcon />Setting</Item>
        <Item><AccountCircleOutlinedIcon />Report</Item>
        <Item><HelpOutlineOutlinedIcon />Help</Item>
        <Item onClick={()=>setDarkmode(!darkmode)}><FlagOutlinedIcon />{darkmode ? "Dark" : "Light"} Mode</Item>
      </Wrapper>
    </Conatin>
    )}
    </>
  )
}

export default Menu
