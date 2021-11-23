import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import userContext from "../contexts/userContext";

const Home = ({Navbar})=>{
  const { host, loadUser, getAllPost, getAllUser, getAllComment, postComment, user, postList, userList, commentList } = useContext(userContext);
  useEffect(()=>{
    loadUser();
    getAllPost();
    getAllUser();
    getAllComment();
  }, []);

  const [oddPost, setOddPost] = useState([])
  const [evenPost, setEvenPost] = useState([])

  useEffect(()=>{
    if(postList){
      const newOddList = postList.filter((post, index)=>{
        return (index%2===0)
      })
      const newEvenList = postList.filter((post, index)=>{
        return (index%2===1)
      })
      setOddPost(newOddList);
      setEvenPost(newEvenList);
    }
  }, [postList])

  const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
  const getPersonById = (id)=>{
    return userList.find(single_person=>single_person._id===id)
  }

  const Post = ({item, index})=>{
    const person = getPersonById(item.account_id);

    const date = new Date(item.time)
    const dateString = date.getDate()+" "+ monthNames[date.getMonth()-1] + " " + date.getFullYear();

    const commentPost = commentList.filter(comment=>comment.post_id===item._id)

    return (
      <div key={index} className="bg-white rounded-xl w-full h-auto flex p-5">
        <div className="w-1/2 overflow-hidden flex items-center">
          <img src={host+item.image} alt="post" className="w-full rounded-xl"/>
        </div>
        <div className="w-1/2 pl-5 flex flex-col">
          <Link to={`/${person.username}`} className="flex flex-row">                
            <img src={host+person.profile_pic} alt="profile_pic" className="w-16 h-16 object-cover rounded-full"/>
            <h3 className="font-segoe font-normal text-xl ml-3 pt-2">{person.username}</h3>
          </Link>
          <p className="font-segoe font-light mt-4 text-left text-xl">{item.caption}</p>
          <p className="text-sm text-gray-400 text-left mt-2">{dateString}</p>
          <div className="flex flex-col gap-2 mt-2 max-h-60vh overflow-auto">
            {commentPost.map((comment, index2)=>{
              const person = getPersonById(comment.account_id)
              return (
                <div key={index2} className="mt-2">
                  <Link to={`/${person.username}`} className="flex flex-row items-center">                
                    <img src={host+person.profile_pic} alt="profile_pic" className="w-8 h-8 object-cover rounded-full"/>
                    <h3 className="font-segoe font-normal ml-3">{person.username}</h3>
                  </Link>
                  <p className="font-segoe font-light text-left mt-2">{comment.comment}</p>
                </div>
              )
            })}
          </div>
          <form
            className="flex flex-row gap-0"
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
              className="w-full my-2 rounded-l-xl border-0 border-gray-300 px-2 py-2 focus:outline-none"
              style={{backgroundColor: "#EFEFEF"}}
            />
            <input
              type="submit"
              value="Send"
              className="cursor-pointer font-segoe my-2 rounded-r-xl border-0 border-gray-300 px-2 py-1 focus:outline-none"
              style={{backgroundColor: "#EFEFEF", color: '#0085D0'}}
            />
          </form>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen pb-16">
      <Navbar/>
      <div className="w-full flex flex-row justify-evenly mt-16">
        <div className="w-11/24 flex flex-col gap-10 items-center">
          {userList.length && oddPost.map((item, index)=>
            <Post item={item} index={index} key={index}/>
          )}
          
        </div>
        <div className="w-11/24 flex flex-col gap-10 items-center">
          {userList.length && evenPost.map((item, index)=>
            <Post item={item} index={index} key={index}/>
          )}
        </div>
        
      </div>
    </div>
  )
}

export default Home;