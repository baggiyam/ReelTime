import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Signup.css';
import { useAuthContext } from '../Components/Authcontext';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();  // Extract login function from AuthContext

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      // Call the signup API
      const response = await axios.post('http://localhost:5002/api/auth/signup', { username, email, password });
      console.log(response.data);

      // Assuming the response contains the token in response.data.token
      const { token } = response.data;  // Destructure the token from the response

      // Store the token in localStorage
      localStorage.setItem('authToken', token);

      // Update the auth state using the login function from AuthContext
      login(token);  // Assuming login updates the AuthContext state

      // Show success message
      setSignupSuccess(true);
      setErrorMessage('');  // Clear any previous error messages

      // Optionally, redirect to the homepage after signup
      setTimeout(() => navigate('/'), 3000);  // Redirect after 3 seconds

    } catch (error) {
      setErrorMessage('Error signing up. Please try again!');
      setSignupSuccess(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className="signup-container">
        <Typography className="signup-heading">Sign Up to Movie App</Typography>

        {/* Show Success Message after signup */}
        {signupSuccess ? (
          <Typography variant="h6" color="primary" align="center" className="success-message">
            Signup successful! Please check your email to verify your account. <br />
            If you don’t see the email, please check your spam folder.
          </Typography>
        ) : (
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
        )}
      </Box>
    </Container>
  );
};

export default SignupPage;
