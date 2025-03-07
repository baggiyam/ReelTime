import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import '../Styles/Login.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter a valid email and password to Login ');
      return;
    }

    try {

      const response = await axios.post('http://localhost:5002/api/auth/login', { email, password });
      console.log(response.data);


      localStorage.setItem('authToken', response.data.token);

    } catch (error) {
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
            type="password"
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
