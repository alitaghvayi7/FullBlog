const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//Update
router.put("/:id", async(req, res) => {
    if (req.body.userId === req.params.id ) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const u = await User.findByIdAndUpdate(req.params.id, {$set: req.body,},{new:true});
            res.status(200).json(u);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can only update your account");
    }
});

//delete
router.delete("/:id", async(req, res) => {
    if (req.body.userId === req.params.id ) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user Deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can only delete your account");
    }
});

//get user
router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password , ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//get user by username

router.get("/",async(req,res)=>{
    const username = req.query.username;
    const email = req.query.email;
    try{
        const user = username? await User.findOne({username : username}) : await User.findOne({email : email});
        if(user){
            const {password,...others} = user._doc;
            res.status(200).json(others);
        }
        else{
            res.status(200).json(null);
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;