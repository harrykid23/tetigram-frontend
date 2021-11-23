import { Link } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import userContext from "../contexts/userContext";

const Navbar = ()=>{
  const {user, logout} = useContext(userContext);
  return (
    <div className="bg-white h-20 w-full px-10 flex flex-row justify-between items-center">
      <Link to="/" className="font-russo text-3xl text-left">Tetigram</Link>
      <div className="flex flex-row items-center">
        <Link to="/new-post" className="mx-3">
          <i className="fas fa-plus-square text-3xl"></i>
        </Link>
        <Link to="/" className="mx-3">
          <i className="fas fa-home text-3xl"></i>
        </Link>
        <Link to={`/${user && user.username}`} className="mx-3">
          <img className="w-10 h-10 object-cover rounded-full" src={user && user.profile_pic} alt=""/>
        </Link>
        <div onClick={logout} className="mx-3 cursor-pointer">
          <i className="fas fa-sign-out-alt text-3xl"></i>
        </div>
      </div>
    </div>
  )
}
export default Navbar;