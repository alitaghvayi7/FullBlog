import "./post.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Post({post}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showMore, setShowMore] = useState(false);

  const handleShowClick = () => {
    setShowMore(!showMore);
  }

  return (
    <div className="post">
      <img className="postImage" src={PF + post.image} alt="" />
      <div className="postInformation">
        <div className="postCategory">
          {post.category.map(cat=>{
            return  <span key={cat._id} className="postLabel">{cat.name}</span>
          })}
        </div>
        <Link to={`/post/${post._id}`} style={{color:"inherit"}}><h2 className="postTitle">{post.title}</h2></Link>
        <div className="postDate">{new Date(post.createdAt).toDateString()}</div>
      </div>
      <p className="postDescribtion">
        {showMore ? post.describtion : post.describtion.substr(0,80) }
        <button onClick={handleShowClick}>{showMore ? 'show less' : 'show more'}</button>
      </p>
    </div>
  );
}
