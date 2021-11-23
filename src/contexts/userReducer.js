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

const userReducer = (state, action)=>{
  const host = 'http://3.139.233.119:5000';
  switch(action.type){
    case USER_CREATED :
      return state
    case USER_LOGIN :
      localStorage.accessToken = action.payload.accessToken;
      return ({
        ...state,
        isAuthenticated : true
      })
    case USER_LOADED :
      let newUrl = host+action.payload.data.profile_pic
      return ({
        ...state,
        user : {
          ...action.payload.data,
          profile_pic: newUrl
        },
        isAuthenticated : true
      })
    case USER_LOGOUT :
      delete localStorage.accessToken;
      return ({
        ...state,
        user : {},
        isAuthenticated : false
      })
    case POST_SUCCESS :
      return ({
        ...state,
        isLoading: false
      })
    case POST_LOADED :
      let result = action.payload.data
      result = result.sort((a, b)=>b.time.localeCompare(a.time))
      return ({
        ...state,
        postList: result
      })
    case USER_LIST_LOADED :
      return ({
        ...state,
        userList: action.payload.data
      })
    case COMMENT_LOADED :
      return ({
        ...state,
        commentList: action.payload.data
      })
    case COMMENT_SUCCESS :
      const newCommentList = [...state.commentList];
      newCommentList.push(action.customData)
      return ({
        ...state,
        isLoading: false,
        commentList: newCommentList
      })
    default :
      return state
  }
}

export default userReducer;