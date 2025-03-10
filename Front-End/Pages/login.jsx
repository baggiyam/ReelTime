import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../Styles/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter a valid email and password to Login');
      return;
    }

    try {
      // Make the API request to login
      const response = await axios.post('http://localhost:5002/api/auth/login', { email, password });
      console.log(response.data);  // Log the response for debugging

      // Store the token in localStorage
      localStorage.setItem('authToken', response.data.token);

      // Navigate to the homepage after login
      navigate('/');  // Redirect to homepage (or wherever you want)

    } catch (error) {
      // Handle login error
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className="login-container">
        <Typography className="login-heading">Login to Movie App</Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-field" // Using the CSS class
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"  // Change type to 'password' for security reasons
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-field" // Using the CSS class
          />
          {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
          >
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
