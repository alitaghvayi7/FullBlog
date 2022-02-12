import "./main.css";
import Post from "../Post";
import Button from "../Button";

export default function Main({posts,postCount,setPostCounnt,search}) {

  const postsData = posts.map(post => {
    return  <Post key={post._id} post={post}/>
  });
  
  return (
    <div className="postsContainer">
      {postsData}
      <div className="buttonContainer">
        {!search && <Button postCount={postCount} setPostCounnt={setPostCounnt}/>}
      </div>
    </div>
  );
}
