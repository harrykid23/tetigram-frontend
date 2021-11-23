import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import userContext from "../contexts/userContext";

const Profile = ({Navbar})=>{
  const params = useParams();
  const { host, loadUser, getAllPost, getAllUser, getAllComment, postComment, user, postList, userList, commentList } = useContext(userContext);
  useEffect(()=>{
    loadUser();
    getAllPost();
    getAllUser();
    getAllComment();
  }, []);

  const [person, setPerson] = useState({})
  const [postPerson, setPostPerson] = useState([])
  useEffect(()=>{
    const tempPerson = userList.find(item=>item.username===params.username);
    if(tempPerson){
      setPerson(tempPerson)
    }
  }, [userList])

  useEffect(()=>{
    const tempPostPerson = postList.filter(post=>post.account_id===person._id)
    setPostPerson(tempPostPerson)
  }, [person, postList])
  
  const [postShown, setPostShown] = useState({})
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
  const getPersonById = (id)=>{
    return userList.find(single_person=>single_person._id===id)
  }

  const PostList = ()=>{
    return (
      postPerson.map((item, index)=>{
        return (
          <div key={index}
            onClick={()=>setPostShown(item)}
            className="rounded-xl overflow-hidden"
            style={{ aspectRatio: '1'}}
          >
            <img src={host+item.image} className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" alt=""/>
          </div>
        )
      })
    )
  }

  const Post = ({item})=>{
    const date = new Date(item.time)
    const dateString = date.getDate()+" "+ monthNames[date.getMonth()] + " " + date.getFullYear();

    const commentPost = commentList.filter(comment=>comment.post_id===item._id)

    return (
      <div className="bg-white rounded-xl w-full max-h-full h-full flex p-5">
        <div className="w-1/2 h-full overflow-hidden flex items-center">
          <img src={host+item.image} alt="post" className="w-full h-full rounded-xl object-contain"/>
        </div>
        <div className="w-1/2 pl-12 flex flex-col">
          <Link to={`/${person.username}`} className="flex flex-row items-center">                
            <img src={host+person.profile_pic} alt="profile_pic" className="w-24 h-24 object-cover rounded-full"/>
            <h3 className="font-segoe font-normal text-2xl ml-3 pt-2">{person.username}</h3>
          </Link>
          <p className="font-segoe font-light mt-4 text-left text-xl">{item.caption}</p>
          <p className="text-gray-400 text-left mt-2">{dateString}</p>
          <div className="flex flex-col gap-2 mt-2 max-h-60vh overflow-auto">
            {commentPost.map((comment, index2)=>{
              const person = getPersonById(comment.account_id)
              return (
                <div key={index2} className="mt-2">
                  <Link to={`/${person.username}`} className="flex flex-row items-center">                
                    <img src={host+person.profile_pic} alt="profile_pic" className="w-10 h-10 object-cover rounded-full"/>
                    <h3 className="font-segoe font-normal ml-3 text-xl">{person.username}</h3>
                  </Link>
                  <p className="font-segoe font-light text-left mt-2 text-xl">{comment.comment}</p>
                </div>
              )
            })}
          </div>
          <form
            className="flex flex-row gap-0 justify-self-end"
            onSubmit={async (e)=>{
              e.preventDefault();
              const data = {
                account_id : user._id,
                post_id : item._id,
                comment: e.target.comment.value
              }
              const res = await postComment(data)
              if(res){
                e.target.comment.value = ""
              }
            }}
          >
            <input
              placeholder="Add a comment..."
              name="comment"
              type="text"
              className="w-full mb-2 mt-7 text-xl rounded-l-xl border-0 border-gray-300 px-4 py-2 focus:outline-none"
              style={{backgroundColor: "#EFEFEF"}}
            />
            <input
              type="submit"
              value="Send"
              className="cursor-pointer font-segoe mb-2 mt-7 rounded-r-xl border-0 border-gray-300 pr-7 py-2 focus:outline-none"
              style={{backgroundColor: "#EFEFEF", color: '#0085D0'}}
            />
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      {
        (postShown.image) && 
        <div
          onClick={(e)=>{
            if(e.currentTarget===e.target){
              setPostShown({})
            }
          }}
          className="fixed flex flex-col justify-center items-center w-full h-full"
          style={{backgroundColor: "#55555520"}}
        >
          <div className="bg-white w-4/5 h-4/5 rounded-xl">
            <Post item={postShown}/>
          </div>
        </div>
      }
      <Navbar/>
      
      <div className="w-full flex flex-col items-center mt-16">
        <div className="w-2/3 flex flex-row items-center">
          <img src={host+person.profile_pic} alt="profile_pic" className="w-40 h-40 object-cover rounded-full"/>
          <div className="flex flex-col items-start ml-16">
            <h3 className="font-segoe font-bold text-3xl ml-3 pt-2">{person.username}</h3>
            <h3 className="font-segoe text-2xl ml-3 pt-2 text-left">{person.bio}</h3>
            <h3 className="font-segoe text-xl ml-3 pt-2 text-left">
              <b>
                {postPerson.length}
              </b> posts</h3>
          </div>
        </div>
        <div className="w-2/3 grid grid-cols-4 gap-5 p-5 bg-white rounded-xl mt-16">
          <PostList />
        </div>
        
      </div>
    </div>
  )
}

export default Profile;