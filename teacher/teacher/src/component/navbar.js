/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
// import { Container } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { logout } from '../redux/userSlice';
import Upload from './upload';

import Cookies from 'js-cookie';


const Container = styled.div`
position: sticky;
top: 0;
background-color: ${({ theme }) => theme.background};
height: 56px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 20px;
  position: relative;
`

const Search  = styled.div`
width: 40%;
position: absolute;
left: 0px;
right: 0px;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px;

`

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.backgroundLighter};

`


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

  const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
  `


  const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.backgroundLighter};
  
  `



const navbar = () => {

  const { current } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
const dispatch = useDispatch();

const navigate = useNavigate();


const handlelogout = async (e) => {
  e.preventDefault();
    dispatch(logout());
    dispatch( {type: "video/fetchSuccess", payload: null})
    localStorage.removeItem("user");
    Cookies.remove('access_token');
    navigate("/"); // Redirect to the home page after logou
}
const [open,setopen] = useState(false)


const [q, setQuery] = useState("")





  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search' onChange={(e)=>setQuery(e.target.value)} /> 
          <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)}/>
        </Search>

        {current ? (
          <User>
            <VideoCallOutlinedIcon onClick={()=>setopen(true)}/>
            <Avatar src={current.img} onClick={handlelogout}/>
            {current.name}
          </User>
       ) : (<Link to="signin" style={{ textDecoration: "none" }}>
        <Button><AccountCircleOutlinedIcon/>SIGN IN</Button>
        </Link>)}
      </Wrapper>
    </Container>
    {open && <Upload setopen={setopen} />}
    </>
  )
}

export default navbar