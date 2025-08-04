import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import styles from '/home/user/fitforge/src/styles/Home.module.css';

function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Your Fitness App!
        </Typography>
        <Typography variant="body1">
          This is your personalized dashboard. Here you can track your activities, log workouts, and see your progress.
        </Typography>
        <Box sx={{ mt: 4 }}>
          {/* Placeholder for dashboard content */}
          <Typography variant="h5" gutterBottom>
            Upcoming Features:
          </Typography>
          <Typography variant="body2">
            - Activity Tracking
            <br />
            - Workout Logging
            <br />
            - Progress Visualization
            <br />
            - Goal Setting
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;