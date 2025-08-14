import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import ApiService from '../api';
import Sidebar from '../components/Sidebar';

function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [categoryVideos, setCategoryVideos] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [exerciseTime, setExerciseTime] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const handleVideoSelect = (videoPath, category, subCategory, videos, index) => {
    console.log('Playing video:', videoPath);
    setSelectedVideo(videoPath);
    setCurrentCategory(category);
    setCurrentSubCategory(subCategory);
    setCategoryVideos(videos);
    setCurrentVideoIndex(index);
  };

  const handleNextVideo = () => {
    if (categoryVideos.length > 0) {
      const nextIndex = (currentVideoIndex + 1) % categoryVideos.length;
      const nextVideo = categoryVideos[nextIndex];
      setSelectedVideo(`/src/fitness/${currentCategory}/${currentSubCategory}/${nextVideo}`);
      setCurrentVideoIndex(nextIndex);
    }
  };

  const handlePrevVideo = () => {
    if (categoryVideos.length > 0) {
      const prevIndex = (currentVideoIndex - 1 + categoryVideos.length) % categoryVideos.length;
      const prevVideo = categoryVideos[prevIndex];
      setSelectedVideo(`/src/fitness/${currentCategory}/${currentSubCategory}/${prevVideo}`);
      setCurrentVideoIndex(prevIndex);
    }
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setExerciseTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setExerciseTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Video event handlers - independent from timer
  const handleVideoPlay = () => {
    videoRef.current?.play();
  };

  const handleVideoPause = () => {
    videoRef.current?.pause();
  };

  const handleVideoEnded = () => {
    videoRef.current?.pause();
  };

  // Keep timer running across component re-renders
  useEffect(() => {
    if (isTimerRunning && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setExerciseTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (!isTimerRunning && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerRunning]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // No initial loading needed

  // Removed video tracking and navigation functions

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paddingTop: '80px',
      display: 'flex',
      position: 'relative'
    },
    content: {
      flex: 1,
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: '40px',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    },
    videoContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '30px'
    },
    video: {
      width: '100%',
      height: '400px',
      borderRadius: '12px',
      backgroundColor: '#000'
    },
    controls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px'
    },
    button: {
      background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
      color: '#ffffff',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    videoInfo: {
      color: '#e0e7ff',
      fontSize: '18px',
      fontWeight: '500'
    },
    statsContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(15px)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-around',
      textAlign: 'center'
    },
    statItem: {
      color: '#ffffff'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#e0e7ff'
    },
    timerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      marginTop: '20px',
      padding: '10px'
    },
    timerControls: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px'
    },
    timerButton: {
      color: '#ffffff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    navigationContainer: {
      marginTop: '20px',
      marginBottom: '20px'
    },
    navigationControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '10px'
    },
    navigationButton: {
      background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
      color: '#ffffff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    },
    exerciseInfo: {
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: '500'
    },
    videoTitleContainer: {
      marginBottom: '20px',
      textAlign: 'center'
    },
    videoTitle: {
      color: '#ffffff',
      fontSize: '1.8rem',
      fontWeight: '600',
      marginBottom: '8px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    exerciseTitle: {
      color: '#e0e7ff',
      fontSize: '1.4rem',
      fontWeight: '500',
      marginBottom: '15px',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    },
    timer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'rgba(255, 255, 255, 0.15)',
      padding: '10px 20px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    timerIcon: {
      fontSize: '24px'
    },
    timerText: {
      color: '#ffffff',
      fontSize: '28px',
      fontWeight: 'bold',
      fontFamily: 'monospace'
    },
    timerLabel: {
      color: '#e0e7ff',
      fontSize: '14px',
      marginLeft: '10px'
    }
  };

  // Removed loading state

  return (
    <>
      <Header />
      <div style={styles.container}>
        <Sidebar onVideoSelect={handleVideoSelect} />
        <div style={styles.content}>

          
          <div style={styles.videoContainer}>
            {selectedVideo ? (
              <>
                <div style={styles.videoTitleContainer}>
                  <h2 style={styles.videoTitle}>
                    {currentCategory} - {currentSubCategory}
                  </h2>
                  <h3 style={styles.exerciseTitle}>
                    {categoryVideos[currentVideoIndex]?.replace('.mp4', '')}
                  </h3>
                </div>
                <video
                  ref={videoRef}
                  key={selectedVideo}
                  style={styles.video}
                  controls
                  autoPlay
                  src={selectedVideo}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onEnded={handleVideoEnded}
                >
                  Your browser does not support the video tag.
                </video>
                <div style={styles.navigationContainer}>
                  <div style={styles.navigationControls}>
                    <button
                      style={{...styles.navigationButton}}
                      onClick={handlePrevVideo}
                    >
                      ← Previous Exercise
                    </button>
                    <div style={styles.exerciseInfo}>
                      Exercise {currentVideoIndex + 1} of {categoryVideos.length}
                    </div>
                    <button
                      style={{...styles.navigationButton}}
                      onClick={handleNextVideo}
                    >
                      Next Exercise →
                    </button>
                  </div>
                </div>
                <div style={styles.timerContainer}>
                  <div style={styles.timer}>
                    <span style={styles.timerIcon}>⏱️</span>
                    <span style={styles.timerText}>{formatTime(exerciseTime)}</span>
                    <span style={styles.timerLabel}>Exercise Time</span>
                  </div>
                  <div style={styles.timerControls}>
                    {!isTimerRunning ? (
                      <button
                        style={{...styles.timerButton, background: 'linear-gradient(45deg, #10B981, #059669)'}}
                        onClick={startTimer}
                      >
                        Start Timer
                      </button>
                    ) : (
                      <button
                        style={{...styles.timerButton, background: 'linear-gradient(45deg, #EF4444, #DC2626)'}}
                        onClick={stopTimer}
                      >
                        Stop Timer
                      </button>
                    )}
                    <button
                      style={{...styles.timerButton, background: 'linear-gradient(45deg, #6B7280, #4B5563)'}}
                      onClick={resetTimer}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{
                ...styles.video,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '1.2rem'
              }}>
                Select an exercise from the sidebar to start watching
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Videos;