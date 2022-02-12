const router = require("express").Router();
const Post = require("../models/Post");


//create post
router.post("/", async(req, res) => {
    try {
        const newPost = await new Post(req.body);
        await newPost.save();
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update post
router.put("/:id", async(req, res) => {
    const post = await Post.findById(req.params.id);

    if (req.body.username === post.username) {
        try {
            await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("posts has updated");

        } catch (err) {
            res.status(500).json(err);
        }

    } else {
        res.status(403).json("tou can update ypur posts")
    }

});

//delete post

router.delete("/:id", async(req, res) => {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
        try {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json('posts deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can delete only your posts");
    }
});

//get post
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all posts
router.get("/", async(req, res) => {
    try {
        const username = req.query.username;
        const category = req.query.category;
        const count = req.query.count || 6;
        let posts;
        if (username) {
            posts = await Post.find({ username: username }).sort([['createdAt', 'descending']]);
            res.status(200).json(posts);
        } else if (category) {
            posts = await Post.find({
                category: {
                    $in: [category]
                }
            }).sort([['createdAt', 'descending']]);
            res.status(200).json(posts);
        } else {
            posts = await Post.find().limit(count).sort([['createdAt', 'descending']]);
            res.status(200).json(posts);
        }
    } catch (err) {
        res.status(500).json('cant get posts');
    }
});

module.exports = router;