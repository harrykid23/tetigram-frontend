import { Routes, Route } from 'react-router-dom';

import './App.css';
import UserState from './contexts/UserState';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import NewPost from './pages/NewPost.js';
import Profile from './pages/Profile.js';

import Navbar from './components/Navbar.js'

function App() {
  return (
    <UserState>
      <div className="App" style={{background: 'linear-gradient(112.76deg, rgba(67, 137, 215, 0.1) -0.81%, rgba(31, 60, 136, 0.9) 93.36%)'}}>
        <Routes>
          <Route path="/new-post" element={<NewPost Navbar={Navbar}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/:username" element={<Profile Navbar={Navbar}/>}/>
          <Route path="/" element={<Home Navbar={Navbar}/>}/>
        </Routes>
      </div>
    </UserState>
  );
}

export default App;
