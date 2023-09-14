import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LogInForm/LoginForm';
import { Button, Typography, Card, CardContent } from '@mui/material';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <Typography variant='h1' sx={{color: '#34495E'}} mb={2}> COFFEE CODING </Typography>
      <Button sx={{ bgcolor: '#fdc57b' }} margin={12} variant="contained" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</Button>
      <Card sx={{ minWidth: 275 }} mt={4}>
      <CardContent>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
      </CardContent>
      </Card>
    </main>
  );
}