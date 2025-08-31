import React from 'react';
import Header from '../Header';
import styles from '../styles/Home.module.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.backgroundElements}>
          <div className={styles.floatingOrb1}></div>
          <div className={styles.floatingOrb2}></div>
          <div className={styles.floatingOrb3}></div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.welcomeTitle}>
              Welcome to World of the Fitness
            </h1>
            <p className={styles.subtitle}>
              Let's begin with fit
            </p>
            <div>
              <button
                onClick={() => navigate('/videos')}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '16px',
                  background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                Start Workout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;