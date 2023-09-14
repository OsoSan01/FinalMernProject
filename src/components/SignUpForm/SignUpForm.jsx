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
        <div className="form-container">
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
          borderRadius={5}>
        <Typography variant="h3" padding={3} textAlign="center" fontFamily={'Khula'}> Register </Typography>
        <TextField
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required />
        <TextField
          placeholder="email"
          value={this.state.email}
          onChange={this.handleChange}
          name="email"
          margin="normal"
          type={"email"}
          required/>
          <TextField 
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
            name="password" 
            margin="normal" 
            type={"password"} 
            required />
          <TextField
            placeholder='Confirm Password'
            value={this.state.confirm}
            onChange={this.handleChange}
            name="confirmPassword"
            margin="normal"
            type="password"
            required/>    
            <Button type="submit" sx={{ borderRadius: 3, marginTop: 3}} variant="contained" color="secondary" disabled={disable}>SIGN UP</Button>
          </Box>
          </form>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}