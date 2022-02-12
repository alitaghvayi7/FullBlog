const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//register

router.post("/register", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        await newUser.save();
        res.status(200).json("UserCreated");
    } catch (err) {
        res.status(500).json(err);
    }
});

//login
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const validate = await bcrypt.compare(req.body.password, user.password);
            if (validate) {

                const { password, ...others } = user._doc;

                res.status(200).json(others);
            } else {
                res.status(200).json("User Not Found")
            }
        } else {
            res.status(200).json("User Not Found")
        }

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;