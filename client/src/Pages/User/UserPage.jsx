import './userPage.css';
import Layout from "../../layout/Layout";
import SideBar from "../../Components/SideBar";
import { useState } from 'react';
import { useUserState,useUserDispatch } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserPage() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  const {user} = useUserState();
  const dispatch = useUserDispatch();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleProfileSubmit = async(e) =>{
    e.preventDefault();
    const updatedUser = {
      userId : user._id,
      username : username || user.username,
      email :  email || user.email,
      password : password
    };
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("fileName",fileName);
      data.append("file",file);
      updatedUser.profilePicture = fileName;
      await axios.post("/upload",data);
    }
    try{
      const response = await axios.put(`/users/${user._id}`,updatedUser);
      dispatch({type : "LOGIN_UPDATED",payload:response.data});
      history("/");
    }catch(err){
      console.log(err);
    }
  }

  return (
      <Layout>
        <div className="userPage">
            <div className="userPageMain">
              <div className="accountOption">
                <span className="updateAccount">Update Your Account</span>
                <span className="deleteAccount">Delete Your Account</span>
              </div>
              <form className='userPageForm' onSubmit={handleProfileSubmit}>
                <label className='profilePageTitle'>Profile Picture</label>
                <fieldset>
                    <img src={PF + user.profilePicture} alt="" className='profilePicture'/>
                    <label htmlFor="profilePictureButton" className='profilePictureButton'><i className="profilePictureIcon fa-solid fa-user-plus"></i></label>
                    <input onChange={(e)=>setFile(e.target.files[0])} type="file" id="profilePictureButton" style={{display:"none"}}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="profileUserUsername">UserName</label>
                    <input  required value={username? username : user.username} onChange={(e)=>setUsername(e.target.value)} type="text" id="profileUserUsername" className='profileUserUsername' placeholder='UserName...'/>
                </fieldset>
                <fieldset>
                    <label htmlFor="profileUserEmail">Email</label>
                    <input required value={email? email : user.email} onChange={(e)=>setEmail(e.target.value)} type="email" id="profileUserEmail" className='profileUserEmail' placeholder='Email...'/>
                </fieldset>
                <fieldset>
                    <label htmlFor="profileUserPassword">Password</label>
                    <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="profileUserPassword" className='profileUserPassword' placeholder='Password...'/>
                </fieldset>
                <button type='submit' className='profileUserSubmitButton'>Update</button>
              </form>
            </div>
            <SideBar />
        </div>
      </Layout>
  );
}
