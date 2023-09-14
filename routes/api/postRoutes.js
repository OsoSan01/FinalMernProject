const express = require("express");
const {  
    getAllPosts, 
    createPost, 
    updatePost, 
    getPostId, 
    deletePost,
    userPosts,
    } = require("../../controllers/api/postController");

//note to myself. lay down all routes first, kind of a layout of all the urls I'm planning on use/have
//then the name of the controllers, to keep track of then.
//then move on to the controllers file and logic

//router object
const router = express.Router();

//routes

//GET request, see all posts
router.get("/all-posts", getAllPosts);

//POST create a new post
router.post("/create-post", createPost);

//PUT request, edit an existing post (found by id)
router.put("/update-post/:id", updatePost)

//GET request, see one single post (found by id)
router.get("/get-post/:id", getPostId)

//DELETE request, delete a post
router.delete("/delete-post/:id", deletePost)

//GET request for the post of a certain user
router.get('/user-posts/:id', userPosts);


module.exports = router;


//note to myself 2. Always import routes on server.js after creating them. That's the way to connect the API