import { TextField, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      localStorage.setItem('userId', user._id); //storage user id on local storage
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
        <Box maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={5}
          borderRadius={5}
          sx={{ bgcolor: '#fdc57b' }}>
          <Typography variant="h3" padding={3} textAlign="center" fontFamily={'Khula'}> Login </Typography>
          <TextField
            label="Email"
            value={credentials.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type={"text"}
            required 
            sx={{ bgcolor: '#F2F3F4' }}/>
          <TextField
            label='Password'
            value={credentials.password}
            onChange={handleChange}
            name="password" 
            margin="normal" 
            type={"password"} 
            required 
            sx={{ bgcolor: '#F2F3F4' }}/>
          <Button type="submit" sx={{ borderRadius: 3, marginTop: 3, backgroundColor:'#F5B041'}} variant="contained" color="secondary">LOG IN</Button>
        </Box>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}