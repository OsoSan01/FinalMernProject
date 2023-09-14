import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard"

export default function Posts() {
  const [posts, setPosts] = useState([]);
  //get all posts
  const getAllposts = async () => {
    try {
      const { data } = await axios.get("/api/post/all-posts");
      if (data?.success) {
        setPosts(data?.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllposts();
  }, []);

  return (
    <div>
      {/* iterating over the posts */}
      {posts &&
        posts.map((post) => (
          <PostCard
            id={post?._id}
            isUser={localStorage.getItem("userId") === post?.user?._id}
            title={post?.title}
            description={post?.description}
            image={post?.image}
            name={post?.user?.name}
            time={post.createdAt}
          />
        ))}
    </div>
  );
};
