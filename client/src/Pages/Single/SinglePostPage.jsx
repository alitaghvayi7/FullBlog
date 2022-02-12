import './singlePostPage.css';
import Layout from "../../layout/Layout";
import SideBar from "../../Components/SideBar";
import SinglePost from '../../Components/SinglePostCo';
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from "axios";
import { useUserState } from "../../Context/AuthContext";

export default function SinglePostPage() {

  const location = useLocation();
  const pathName = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const history = useNavigate();
  const {user} = useUserState();
  const [title, setTitle] = useState('');
  const [describtion, setDescribtion] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    axios.get(`/posts/${pathName}`)
    .then(response => {
      setPost(response.data);
      setTitle(response.data.title);
      setDescribtion(response.data.describtion);
    });
  }, [pathName]);
  
  const handleDeletePost = async (e) => {
    await axios.delete(`/posts/${post._id}`, {
      data: { username: user.username },
    });
    history("/");
  };
  const handleUpdatePost = async(e) => {
    const updatedPost = {
      username : user.username,
      title : title,
      describtion : describtion
    }
    await axios.put(`/posts/${post._id}`,updatedPost);
    setUpdateMode(false);
    history("/");
  }

  return (
      <Layout>
        <div className="singlePostContainer">
            <SinglePost user={user} post={post} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost} title={title} setTitle={setTitle} describtion={describtion} setDescribtion={setDescribtion} updateMode={updateMode} setUpdateMode={setUpdateMode}/>
            <SideBar />
        </div>
      </Layout>
  );
}
