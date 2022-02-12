import "./homePage.css";
import Layout from "../../layout/Layout";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import Main from "../../Components/Main";
import axios from "axios";
import {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCounnt] = useState(6);
  const {search} = useLocation();

  useEffect(() => {
    let url = !search ? axios.get(`/posts?count=${postCount}`) : axios.get(`/posts${search}`);
    url.then(response => setPosts(response.data));
  
  }, [postCount,search]);
  
  return (
    <Layout>
      <Header />
      <div className="mainContainer">
        <Main posts={posts} postCount={postCount} setPostCounnt={setPostCounnt} search={search}/>
        <Sidebar />
      </div>
    </Layout>
  );
}
