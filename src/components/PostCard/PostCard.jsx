import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostCard.css"

export default function PostCard({
  title,
  description,
  image,
  name,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/post-details/${id}`);
  };

  const formattedTime = new Date(time).toLocaleDateString();

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/post/delete-post/${id}`);
      if (data.success) {
        alert("Post Deleted");
        //updating the view to actually remove the post from rendering
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        width:"40%",
        margin: "auto",
        mt: 9,
        padding: 1,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar
          aria-label="recipe" src="https://prateekvjoshi.files.wordpress.com/2013/10/part-1.jpg">
          sx={{ width: 56, height: 56 }}
          </Avatar>
        }
        title={name}
        subheader={formattedTime}
      />
        <Typography variant="h5" color="text.secondary" marginBottom={3} marginTop={2}> {title}</Typography>
      <CardMedia component="img" height="200" image={image} alt="A Beautiful Picture" sx={{ objectFit: "contain" }}/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
    </Card>
  );
}