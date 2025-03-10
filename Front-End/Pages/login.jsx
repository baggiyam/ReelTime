import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../Components/Authcontext"; // Import the AuthContext to manage login
import '../Styles/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailRegistered, setIsEmailRegistered] = useState(true);
  const navigate = useNavigate();

  // Access the login function from AuthContext
  const { login } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter a valid email and password to Login');
      return;
    }

    try {
      // Check if the email is registered
      const emailCheckResponse = await axios.post('http://localhost:5002/api/auth/check-email', { email });

      if (!emailCheckResponse.data.exists) {
        setErrorMessage('Email not found. Please sign up first.');
        setIsEmailRegistered(false); // When the email is not registered, disable the login flow
        return;
      }

      // Make the login request to get the token
      const response = await axios.post('http://localhost:5002/api/auth/login', { email, password });

      // Ensure the API returns a token before proceeding
      if (response.data.token) {
        // Store the token using the AuthContext login function
        login(response.data.token);

        // Navigate to the homepage or any other page after login
        navigate('/'); // Change this to any route you want to redirect after login
      } else {
        setErrorMessage('Login failed, please try again.');
      }

    } catch (error) {
      // Handle login error (e.g., invalid credentials)
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
            className="login-field" // CSS class to style the input fields
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password" // Change to 'password' to hide the input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-field" // CSS class for styling
          />

          {/* Display error message if there's one */}
          {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}

          {/* Button to submit the form */}
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
