import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import { Box, TextField, Typography, Button } from '@mui/material';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
        <>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
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
          
        <Typography variant="h3" padding={3} textAlign="center" fontFamily={'Khula'}> Register </Typography>
        <TextField
            label="Name"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required 
            sx={{ bgcolor: '#F2F3F4' }}/>
        <TextField
          label="email"
          value={this.state.email}
          onChange={this.handleChange}
          name="email"
          margin="normal"
          type={"email"}
          required
          sx={{ bgcolor: '#F2F3F4' }}/>
          <TextField 
            label='Password'
            value={this.state.password}
            onChange={this.handleChange}
            name="password" 
            margin="normal" 
            type={"password"} 
            required 
            sx={{ bgcolor: '#F2F3F4' }}/>
          <TextField
            label='Confirm Password'
            value={this.state.confirm}
            onChange={this.handleChange}
            name="confirm"
            margin="normal"
            type="password"
            required
            sx={{ bgcolor: '#F2F3F4' }}/>
            <Button type="submit" sx={{ borderRadius: 3, marginTop: 3, backgroundColor:'#F5B041'}} variant="contained" disabled={disable}>SIGN UP</Button>
          </Box>
          </form>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </>
    );
  }
}