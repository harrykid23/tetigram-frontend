import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../contexts/userContext";

const Signup = ()=>{
  const {signUp} = useContext(userContext);
  const [formSignup, setFormSignup] = useState({
    name : '',
    email: '',
    username: '',
    password: ''
  })
  const [selectedFile, setSelectedFile] = useState(null);
  const inputState = (name)=>{
    return {
      value : formSignup[name],
      onChange : (e)=>{
        console.log(formSignup)
        setFormSignup(
          {
            ...formSignup,
            [name]: e.target.value
          }
        )
      },
      className: "w-full my-3 rounded-xl border-2 border-gray-300 px-4 py-2 focus:outline-none text-lg"
    }
  }
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h1 className="font-questrial text-6xl mb-5">Signup</h1>
      <div className="flex items-center justify-center flex-row w-3/4">
        {/* <img className="h-80vh mr-10 w-auto object-contain" src="https://i.imgflip.com/5um93f.jpg" alt="meme" /> */}
        <div className="w-3/5 pr-5">
          <h1 className="font-russo text-3xl text-left">Tetigram</h1>
          <h1 className="font-roboto font-light text-3xl text-left max-w-xl">Tetigram helps you connect and share with the people in TETI.</h1>
        </div>
        <form onSubmit={(e)=>{e.preventDefault(); signUp(formSignup, selectedFile)}} className="rounded-3xl w-30vw py-12 px-16 border-2 bg-white border-gray-300 shadow-xl flex flex-col items-center">
          <input
            type="text"
            placeholder="Name"
            {...inputState('name')}
            required
          />
          <input
            type="email"
            placeholder="Email"
            {...inputState('email')}
            required
          />
          <input
            type="text"
            placeholder="Username"
            {...inputState('username')}
            required
          />
          <input
            type="password"
            placeholder="Password"
            {...inputState('password')}
            required
          />
          <div className="w-full flex flex-row items-center justify-start">
            <p className="w-auto">Profile picture</p>
            <input
              accept="image/*"
              onChange={(e)=>{
                console.log(e.target.files[0]);
                setSelectedFile(e.target.files[0]);
              }}
              className="w-auto my-3 rounded-xl border-2 border-gray-300 px-4 py-2 focus:outline-none text-lg" type="file" required/>
          </div>
          <button className="w-1/3 my-4 rounded-xl border-4 border-blue-600 px-4 py-1 focus:outline-none text-lg font-bold bg-blue-500 text-white">Signup</button>
          <p className="font-roboto font-medium text-left w-full mt-4">Already have an account? <Link to="/login" className="hover:underline" style={{color: '#0085D0'}}>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup;