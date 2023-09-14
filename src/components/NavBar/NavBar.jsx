import { AppBar, Box, Toolbar, Tabs, Tab, Typography, createTheme, ThemeProvider } from '@mui/material';
import { lime, purple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import React from "react";


const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }


  return (
    <ThemeProvider theme={theme}>
    <AppBar color='primary' sx={{ flexDirection: 'column' }}>
      <Toolbar>
      <Typography variant='h4' fontFamily={'Khula'} color="#7AB7A8"> 
        <span id='user'>Welcome, {user.name}</span>
      </Typography>
        <Box Box display={'flex'} marginLeft='auto' marginRight={'auto'}>
          <Tabs textColor='inherit'> 
              <Tab label="Posts" LinkComponent={Link} to="/posts" />
              &nbsp; | &nbsp;
              <Tab label="My Posts" LinkComponent={Link} to="/my-posts" />
              &nbsp;&nbsp;
              <Tab label="Post Something!" LinkComponent={Link} to="/create-post" />      
              &nbsp;&nbsp
              <Tab label="Logout" LinkComponent={Link} to="" onClick={handleLogOut}/>              
          </Tabs>
        </Box>    
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}