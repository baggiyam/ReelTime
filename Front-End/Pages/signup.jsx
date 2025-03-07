import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for navigation
import '../Styles/Signup.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/auth/signup', { username, email, password });
      console.log(response.data);

      // Redirect to Login page after successful signup
      navigate('/Home');
    } catch (error) {
      setErrorMessage('Error signing up. Please try again!');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className="signup-container">
        <Typography className="signup-heading">Sign Up to Movie App</Typography>
        <form onSubmit={handleSignup} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-field"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-field"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-field"
          />
          {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="signup-button"
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
