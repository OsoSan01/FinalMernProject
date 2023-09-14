import React, {useState, useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

export default function PostDetails() {
   const [post, setPost] = useState({});
   const [inputs, setInputs] = useState({});
   const [loading, setLoading] = useState(true); // Add loading state

   const id = useParams().id;
   const navigate = useNavigate();
 
   const getPostDetails = async () => {
     try {
       const { data } = await axios.get(`/api/post/get-post/${id}`);
       if (data.success) {
         setPost(data.post);
         setInputs({
           title: data.post.title,
           description: data.post.description,
           image: data.post.image,
         });
       }
     } catch (error) {
       console.log(error);
     } finally {
       setLoading(false); // Set loading to false after data is fetched
     }
   };
 
   useEffect(() => {
     getPostDetails();
   }, [id]);
 
   const handleChange = (e) => {
     setInputs((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value,
     }));
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const { data } = await axios.put(`/api/post/update-post/${id}`, {
         title: inputs.title,
         description: inputs.description,
         image: inputs.image,
         user: id,
       });
       if (data?.success) {
         toast.success("Post Updated!");
         navigate("/my-posts");
       }
     } catch (error) {
       console.log(error);
     }
   };
 
   if (loading) {
     return <p>Loading...</p>; // Add loading indicator
   }

   return (
     <v>
       <form onSubmit={handleSubmit}>
         <Box
           width={"50%"}
           border={3}
           borderRadius={10}
           padding={3}
           margin="auto"
           boxShadow={"10px 10px 20px #ccc"}
           display="flex"
           flexDirection={"column"}
           marginTop="30px"
         >
           <Typography
             variant="h2"
             textAlign={"center"}
             fontWeight="bold"
             padding={3}
             color="gray"
           >
             Update A Pots!
           </Typography>
           <InputLabel
             sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
           >
             Title
           </InputLabel>
           <TextField
             name="title"
             value={inputs.title}
             onChange={handleChange}
             margin="normal"
             variant="outlined"
             required
           />
           <InputLabel
             sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
           >
             Description
           </InputLabel>
           <TextField
             name="description"
             value={inputs.description}
             onChange={handleChange}
             margin="normal"
             variant="outlined"
             required
           />
           <InputLabel
             sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
           >
             Image URL
           </InputLabel>
           <TextField
             name="image"
             value={inputs.image}
             onChange={handleChange}
             margin="normal"
             variant="outlined"
             required
           />
           <Button type="submit" color="warning" variant="contained">
             UPDATE
           </Button>
         </Box>
       </form>
     </v>
   );
 };