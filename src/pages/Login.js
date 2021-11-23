import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import userContext from "../contexts/userContext";

const Login = ()=>{
  const {login} = useContext(userContext);
  const [formLogin, setFormLogin] = useState({
    username: '',
    password: ''
  })
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h1 className="font-questrial text-6xl mb-5">Login</h1>
      <div className="flex items-center justify-center flex-row w-3/4">
        {/* <img className="h-80vh mr-10 w-auto object-contain" src="https://i.imgflip.com/5um93f.jpg" alt="meme" /> */}
        <div className="w-3/5 pr-5">
          <h1 className="font-russo text-3xl text-left">Tetigram</h1>
          <h1 className="font-roboto font-light text-3xl text-left max-w-xl">Tetigram helps you connect and share with the people in TETI.</h1>
        </div>
        <form
          onSubmit={(e)=>{
            e.preventDefault();
            login(formLogin)
          }}
          className="rounded-3xl w-30vw py-12 px-16 border-2 bg-white border-gray-300 shadow-xl flex flex-col items-center"
        >
          <input
            className="w-full my-3 rounded-xl border-2 border-gray-300 px-4 py-2 focus:outline-none text-lg"
            type="text"
            placeholder="Email / username"
            value={formLogin.username}
            onChange={(e)=>setFormLogin({
              ...formLogin,
              username: e.target.value
            })}
          />
          <input
            className="w-full my-3 rounded-xl border-2 border-gray-300 px-4 py-2 focus:outline-none text-lg"
            type="password"
            placeholder="Password"
            value={formLogin.password}
            onChange={(e)=>setFormLogin({
              ...formLogin,
              password: e.target.value
            })}
          />
          <button className="w-1/3 my-4 rounded-xl border-4 border-blue-600 px-4 py-1 focus:outline-none text-lg font-bold bg-blue-500 text-white">Login</button>
          <p className="font-roboto font-medium text-left w-full mt-4">Don't have account? <Link to="/signup" className="hover:underline" style={{color: '#0085D0'}}>Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login;