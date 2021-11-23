import React, { useContext, useEffect, useState, useRef } from "react";
import userContext from "../contexts/userContext";

const NewPost = ({Navbar})=>{
  const { loadUser, user, postPhoto } = useContext(userContext);
  useEffect(()=>{
    loadUser();
  }, []);

  const [selectedImage, setSelectedImage] = useState({})
  const [caption, setCaption] = useState('')
  const inputImage = useRef(null);

  const submitForm = (e)=>{
    e.preventDefault();
    const data = {
      caption: caption,
      account_id: user._id,
      image: selectedImage
    }
    postPhoto(data);
  }

  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="flex items-center justify-center flex-col py-10 px-20 h-full">
        <h2 className="font-segoe text-4xl" style={{fontWeight: '700'}}>Post a Photo</h2>
        <div className="w-4/5 h-60vh bg-white mt-10 flex justify-center items-center rounded-xl">
          <form onSubmit={submitForm} className="w-11/12 h-5/6 flex flex-col items-end justify-center">
            <div
              onClick={()=>{inputImage.current.click()}}
              className="h-2/3 w-full border-dashed border-4 rounded-2xl cursor-pointer flex flex-col items-center justify-center"
              style={{backgroundColor: '#0195E810', borderColor: '#0195E8'}}
            >
              <input type="file" accept="image/*" className="hidden" ref={inputImage} onChange={(e)=>{setSelectedImage(e.target.files[0])}} required/>
              <p className="font-segoe text-2xl mb-10" style={{fontWeight: '400'}}>{selectedImage.name || "Upload here"}</p>
              <i className="fas fa-upload text-6xl"></i>
            </div>
            <input
              placeholder="Write caption..."
              type="text"
              value={caption}
              onChange={(e)=>setCaption(e.target.value)}
              className="w-full my-3 rounded-xl border-2 border-gray-300 px-4 py-2 focus:outline-none text-lg"
              style={{backgroundColor: "#EFEFEF"}}
            />
            <button
              className="my-4 rounded-xl border-2 border-blue-600 px-20 py-1 hover:bg-gray-100 transition-all duration-500 text-lg font-bold bg-white text-black"
            >Post</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPost;