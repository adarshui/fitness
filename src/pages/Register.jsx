import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import styles from '/src/styles/Forms.module.css'; // Import the CSS module
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '/src/firebase'; // Import the auth instance

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // Get the navigate function
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Registration button clicked!');
    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User registered:', userCredential.user);
        navigate('/'); // Redirect to home page on successful registration
      })
      .catch((error) => {
        console.error('Error registering user:', error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={styles.formContainer}> {/* Apply formContainer style */}
      <Box
 className={styles.formBox} // Apply formBox style
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate className={styles.form} > {/* Apply form style */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained" // Use Material-UI button styles
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;