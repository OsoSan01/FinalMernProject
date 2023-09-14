import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);

  //get user posts
  const UserPosts = async () => {
    try {
      const id = localStorage.getItem("userId");
      
      const { data } = await axios.get(`/api/post/user-posts/${id}`);
      
      if (data.success) {
        setPosts(data.userPost.post);
      }
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UserPosts();
  }, []);
  
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            id={post._id}
            isUser={true}
            title={post.title}
            description={post.description}
            image={post.image}
            username={post.user.username}
            time={post.createdAt}
          />
        ))
      ) : (
        <Button  LinkComponent={ Link } to="/create-post"> Start Sharing!</Button>
      )}
    </div>
  );
};

export default UserPosts;