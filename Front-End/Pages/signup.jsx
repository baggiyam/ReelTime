import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for navigation
import '../Styles/Signup.css';  // Import the CSS file for styling

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);  // New state for success message
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

      // If signup is successful, show the success message
      setSignupSuccess(true);
      setErrorMessage('');  // Clear any previous error messages

      // Optional: Redirect to Login page after showing success message
      // setTimeout(() => navigate('/login'), 5000);  // You can redirect after 5 seconds (if needed)
    } catch (error) {
      setErrorMessage('Error signing up. Please try again!');
      setSignupSuccess(false);  // If error, make sure success message is not displayed
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
