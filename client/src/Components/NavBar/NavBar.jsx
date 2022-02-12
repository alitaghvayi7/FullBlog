import "./navbar.css";
import { Link } from "react-router-dom";
import {useUserState,useUserDispatch} from "../../Context/AuthContext";
export default function NavBar() {

  const {user} = useUserState();
  const dispatch = useUserDispatch();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <nav className="navbar">
      <div className="leftNavbar">
        <i className="navbarIcon fab fa-facebook-square"></i>
        <i className="navbarIcon fab fa-twitter-square"></i>
        <i className="navbarIcon fab fa-pinterest-square"></i>
        <i className="navbarIcon fab fa-instagram-square"></i>
      </div>
      <div className="centerNavbar">
        <ul className="menuNavbar">
          <li className="menuNavbarItem">
            <Link style={{ color: "inherit" }} to="/">
              home
            </Link>
          </li>
          <li className="menuNavbarItem">about</li>
          <li className="menuNavbarItem">contact</li>
          <li className="menuNavbarItem">
            <Link style={{ color: "inherit" }} to="/write">
              write
            </Link>
          </li>
          {user && <li className="menuNavbarItem" onClick={(e)=>dispatch({type:"LOG_OUT"})}>logout</li>}
        </ul>
      </div>
      <div className="rightNavbar">
        {user ? (
          <Link to={`/user/${user._id}`}><img className="navbarProfileImg" src={PF+user.profilePicture} alt="" /></Link>
        ) : (
          <ul className="menuNavbar">
            <li className="menuNavbarItem">
              <Link style={{ color: "inherit" }} to="/login">
                login
              </Link>
            </li>
            <li className="menuNavbarItem">
              <Link style={{ color: "inherit" }} to="/signup">
                signup
              </Link>
            </li>
          </ul>
        )}
        <i className="navbarSearchIcon fas fa-search"></i>
      </div>
    </nav>
  );
}
