import './sidebar.css';
import axios from "axios";
import { useState,useEffect } from 'react';
import {Link} from "react-router-dom";

export default function Sidebar() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
      axios.get("/categories")
      .then(response => setCategories(response.data));
    }, [])
    

  return (<div className='sidebar'>
    <div className="sidebarItem">
        <span className='sidebarTitle'>about me</span>
        <img className='sidebarImagePerson' src={PF+"aboutme.jpg"} alt="" />
        <p className='sidebarTextInformation'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum esse natus laboriosam placeat ut possimus consequuntur, eius, dolorem modi quam, accusantium nisi. Eligendi, maxime voluptatem?</p>
    </div>
    <div className="sidebarItem">
        <span className='sidebarTitle'>categories</span>
        <ul className="sidebarCategory">
            {categories.map(category => {
               return <Link to={`/?category=${category.name}`} style={{color:"inherit"}}><li className="sidebarCategoryItem" key={category._id}>{category.name}</li></Link>
            })}
        </ul>
    </div>
    <div className="sidebarItem">
        <span className="sidebarTitle">follow us</span>
        <div className="sidebarSocial">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
    </div>
    
  </div>);
}
