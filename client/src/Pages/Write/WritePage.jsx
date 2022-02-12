import './write.css';
import Layout from "../../layout/Layout";
import { useState } from 'react';
import axios from "axios";
import { useUserState } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function WritePage() {

    const [title, setTitle] = useState("");
    const [describtion, setDescribtion] = useState("")
    const [file, setFile] = useState(null);
    const {user} = useUserState();
    const location = useNavigate();

    const handleWriteSubmit = async(e) => {
        e.preventDefault();
        const newPost ={
            username:user.username,
            title:title,
            describtion:describtion,
            image : null,
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("fileName",fileName);
            data.append("file",file);
            newPost.image = fileName;
            await axios.post("/upload",data);
        }
        try{
            await axios.post("/posts",newPost);
            location("/");
        }catch(err){
            console.log(err);
        }
    }

  return (
      <Layout>
        <div className="writeWrapper">
            {file && <img src={URL.createObjectURL(file)} alt="" className='writeFormImage'/>}
            
            <form className='writeForm' onSubmit={handleWriteSubmit}>
               <fieldset>
                <label htmlFor="writeInputFile">
                        <i className="writeFormIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="writeInputFile" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} accept=".jpg,.jpeg,.png"/>
                    <input autoFocus required value={title} type="text" id="title" className='writeInputTitle' placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <textarea required value={describtion} onChange={(e)=>setDescribtion(e.target.value)} id="writeInputText" className='writeInputText' placeholder='Text...'></textarea>
                </fieldset>  
                <button type='submit' className='writeInputButton'>Publish</button>
            </form>
        </div>
      </Layout>
  );
}
