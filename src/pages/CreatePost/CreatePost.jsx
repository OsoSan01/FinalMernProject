import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

export default function CreatePost() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
      title: "",
      description: "",
      image: "",
    });
    // input change
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    //form
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const id = localStorage.getItem("userId"); 
        const { data } = await axios.post("/api/post/create-post", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: id,
    });
    if (data.success) {
      toast.success("Post Created");
      navigate("/my-posts");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"60%"}
          sx={{ bgcolor: '#fcfefe' }}
          border={3}
          borderRadius={10}
          padding={6}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="180px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Create the Post!
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Image URL"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" sx={{ bgcolor: '#fdc57b' }} variant="contained">
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};