import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from '../styles/Forms.module.css'; // Import the CSS Module
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import the auth instance

function Login() {
  const navigate = useNavigate(); // Get the navigate function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully!');
      navigate('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={styles.formContainer}> {/* Apply formContainer class */}
      <Box className={styles.formBox} sx={{ // Apply formBox class and keep some Material-UI sx for flexibility
          alignItems: 'center',
        }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {error && (
            <Typography color="error" variant="body2">{error}</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Login;