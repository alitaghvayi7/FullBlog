const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require("dotenv").config();
const multer = require("multer");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/category");
const application = express();

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true, 
})
.then(console.log("MongoDB Connected...!!!"))
.catch(err => console.log(err));

const storage = multer.diskStorage({
    destination : (req,file,callBack) => {
        callBack(null , "images");
    },
    filename : (req,file,callBack) => {
        callBack(null,req.body.fileName)
    }
});

const upload = multer({storage:storage});

application.use("/images",express.static(path.join(__dirname,"/images")));
application.use(express.json());
application.use(cors());
application.use(helmet());
application.use(morgan("common"));

application.use("/api/v1/auth",authRoute);
application.use("/api/v1/users",userRoute);
application.use("/api/v1/posts",postRoute);
application.use("/api/v1/categories",categoryRoute);

application.post("/api/v1/upload",upload.single("file"),(req,res)=>{
    try{
        res.status(200).json("file uploaded");
    }
    catch(err){
        res.status(500).json(err);
    }
});

application.listen(5000 , () =>{
    console.log("API Server is Runnig");
});