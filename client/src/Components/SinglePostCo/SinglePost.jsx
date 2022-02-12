import "./singlePost.css";
import { Link } from "react-router-dom";

export default function SinglePost({ user,post,handleDeletePost,title,setTitle,describtion,setDescribtion,updateMode,setUpdateMode,handleUpdatePost }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="singlePostMain">
      <div className="singlePostWrapper">
        <img className="singlePostImage" src={PF + post.image} alt="" />
        <div className="singlePostExtra">
          {updateMode ? (
            <input
              required
              className="editPostInput"
              type="text"
              id="editPostInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">{post.title}</h1>
          )}
          {post.username === user?.username && (
            <div className="singlePostOption">
              {!updateMode && (
                <>
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={(e) => setUpdateMode(!updateMode)}
                  ></i>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={handleDeletePost}
                  ></i>
                </>
              )}
            </div>
          )}
        </div>
        <div className="singlePostInformation">
          <Link to={`/?username=${post.username}`} style={{ color: "inherit" }}>
            <span className="singlePostAuthor">Author : {post.username}</span>
          </Link>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            required
            value={describtion}
            onChange={(e) => setDescribtion(e.target.value)}
            id="postEditInput"
            className="postEditInput"
          ></textarea>
        ) : (
          <p className="singlePostDescribtion">{post.describtion}</p>
        )}
        {updateMode &&  <button className='editPostInputButton' onClick={handleUpdatePost}>Update</button>}
      </div>
    </div>
  );
}
