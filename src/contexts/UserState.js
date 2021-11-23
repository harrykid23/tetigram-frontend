import React, { useReducer } from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';

import userContext from './userContext';
import userReducer from './userReducer';
import {
  USER_CREATED,
  USER_LOGIN,
  USER_LOADED,
  USER_LOGOUT,
  POST_SUCCESS,
  POST_LOADED,
  USER_LIST_LOADED,
  COMMENT_LOADED,
  COMMENT_SUCCESS
} from './types';

const UserState = ({children})=>{
  const host = 'http://3.139.233.119:5000';
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(userReducer, 
    {
      host: 'http://3.139.233.119:5000',
      isAuthenticated : false,
      user : {},
      isLoading : true,
      postList : [],
      userList : [],
      commentList : []
    })
  
  const loadUser = async ()=>{
    const config = {
      headers: {
        Authorization : `Bearer ${localStorage.accessToken}`
      }
    }
    try{
      const res = await axios.get(`${host}/accounts/self`, config);

      dispatch({type: USER_LOADED, payload: res.data});
    }catch(err){
      console.log(err.response)
      dispatch({type: USER_LOGOUT});
      setTimeout(()=>navigate('/login'), 0);
    }
  }

  const signUp = async (formSignup, profilePic)=>{
    const formData = new FormData();
    Object.keys(formSignup).forEach(item=>{
      formData.append(item, formSignup[item]);
    })
    formData.append('profile_pic', profilePic);
    formData.append('bio', '');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    try{
      const res = await axios.post(
        `${host}/accounts`,
        formData,
        config
      )
      dispatch({type: USER_CREATED, payload: res.data})
      swal('', 'Account created successfully', 'success', {
        timer: 3000
      });
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }catch(err){
      const errMsg = err.response.data
      // console.log(errMsg)
      if(errMsg.includes('E11000') && errMsg.includes('username')){
        swal('', 'Username has been used', 'error', {
          timer: 3000
        });
      }
      if(errMsg.includes('E11000') && errMsg.includes('email')){
        swal('', 'Email has been used', 'error', {
          timer: 3000
        });
      }
    }
  }

  const login = async (formLogin)=>{
    try{
      const res = await axios.post(
        `${host}/accounts/login`,
        formLogin
      )

      dispatch({type: USER_LOGIN, payload: res.data})
      swal('', 'Login success', 'success', {
        timer: 3000
      });
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }catch(err){
      const errMsg = err.response.data
      console.log(errMsg)
      swal('', 'Failed to login', 'error', {
        timer: 3000
      });
    }
  }

  const postPhoto = async (data)=>{
    const formData = new FormData();
    Object.keys(data).forEach(item=>{
      formData.append(item, data[item]);
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    try{
      const res = await axios.post(
        `${host}/post`,
        formData,
        config
      )
      dispatch({type: POST_SUCCESS, payload: res.data})
      swal('', 'Posted successfully', 'success', {
        timer: 3000
      });
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }catch(err){
      // const errMsg = err.response.data
      // console.log(errMsg)
      swal('', 'Post failed', 'error', {
        timer: 3000
      });
    }
  }

  const getAllPost = async ()=>{
    try{
      const res = await axios.get(`${host}/post`);

      dispatch({type: POST_LOADED, payload: res.data});
    }catch(err){
      console.log(err.response);
    }
  }
  
  const getAllUser = async ()=>{
    try{
      const res = await axios.get(`${host}/accounts`);

      dispatch({type: USER_LIST_LOADED, payload: res.data});
    }catch(err){
      console.log(err.response);
    }
  }
  
  const getAllComment = async ()=>{
    try{
      const res = await axios.get(`${host}/comments`);

      dispatch({type: COMMENT_LOADED, payload: res.data});
    }catch(err){
      console.log(err.response);
    }
  }

  const postComment = async (data)=>{
    try{
      const res = await axios.post(
        `${host}/comments`,
        data
      )
      const customData = {
        ...data,
        time: new Date().toISOString()
      }
      dispatch({type: COMMENT_SUCCESS, payload: res.data, customData: customData})
      return true
    }catch(err){
      console.log(err.response.data)
      return false
    }
  }

  const logout = ()=>{
    dispatch({type: USER_LOGOUT});
    navigate('/login')
  }

  return (
    <userContext.Provider value={{
      ...state,
      loadUser,
      signUp,
      login,
      postPhoto,
      getAllPost,
      getAllUser,
      getAllComment,
      postComment,
      logout
    }}>
      {children}
    </userContext.Provider>
  )
}

export default UserState;