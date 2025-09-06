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
  const [videosPlan, setVideosPlan] = useState([]);
  const [userLevel, setUserLevel] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [planError, setPlanError] = useState(null);
  const [completionMessage, setCompletionMessage] = useState(null);

  const handleVideoSelect = (videoPath, category, subCategory, videos, index) => {
    console.log('Playing video:', videoPath);
    setSelectedVideo(videoPath);
    setCurrentCategory(category);
    setCurrentSubCategory(subCategory);
    setCategoryVideos(videos);
    setCurrentVideoIndex(index);
    setCompletionMessage(null); // Clear message on new video
  };

  const handleNextVideo = () => {
    if (categoryVideos.length > 0) {
      const nextIndex = (currentVideoIndex + 1) % categoryVideos.length;
      const nextVideo = categoryVideos[nextIndex];
      setSelectedVideo(`/src/fitness/${currentCategory}/${currentSubCategory}/${nextVideo}`);
      setCompletionMessage(null);
      setCurrentVideoIndex(nextIndex);
    }
  };

  const handlePrevVideo = () => {
    if (categoryVideos.length > 0) {
      const prevIndex = (currentVideoIndex - 1 + categoryVideos.length) % categoryVideos.length;
      const prevVideo = categoryVideos[prevIndex];
      setSelectedVideo(`/src/fitness/${currentCategory}/${currentSubCategory}/${prevVideo}`);
      setCompletionMessage(null);
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

  // Helpers to map the selected exercise to backend video identifiers
  const getCurrentExerciseName = () => {
    const name = categoryVideos[currentVideoIndex] || '';
    return name.replace('.mp4', '');
  };

  const mapExerciseToBackendId = (name) => {
    const n = (name || '').toLowerCase();
    if (n.includes('warm')) return 'warmup';
    if (n.includes('jack')) return 'jjacks';
    if (n.includes('jump')) return 'jjacks';
    if (n.includes('squat')) return 'squats';
    if (n.includes('push')) return 'pushups';
    if (n.includes('plank')) return 'plank';
    return null;
  };

  const getSelectedPlan = () => {
    const name = getCurrentExerciseName();
    const id = mapExerciseToBackendId(name);
    if (id) {
      const byId = videosPlan.find(v => v.id === id);
      if (byId) return byId;
    }
    const byTitle = videosPlan.find(v => (v.title || '').toLowerCase() === (name || '').toLowerCase());
    if (byTitle) return byTitle;
    // Fallback: compute plan locally if backend doesn't have it
    return computeFallbackPlan(name);
  };

  const normalizeLevel = (lvl) => {
    const s = String(lvl || '').toLowerCase();
    if (s === '1' || s === 'beginner') return 'beginner';
    if (s === '2' || s === 'intermediate') return 'intermediate';
    if (s === '3' || s === 'advanced') return 'advanced';
    return 'beginner';
  };

  const computeFallbackPlan = (rawName) => {
    const name = (rawName || '').toLowerCase();
    const lvl = normalizeLevel(userLevel);

    // Helper to pick value by level
    const pick = (obj) => obj[lvl] ?? obj['beginner'];

    // Keyword-driven templates (estimates based on typical programming for time/rep schemes)
    const templates = [
      // Full-body / cardio intensive
      { keys: ['burpee'], sets: { beginner: 3, intermediate: 4, advanced: 5 }, cal: { beginner: 50, intermediate: 70, advanced: 90 } },
      { keys: ['mountain climb', 'mountain-climb', 'mountain'], sets: { beginner: 3, intermediate: 4, advanced: 5 }, cal: { beginner: 40, intermediate: 55, advanced: 70 } },
      { keys: ['jumping jack', 'jumping-jack', 'jumping'], sets: { beginner: 3, intermediate: 4, advanced: 5 }, cal: { beginner: 30, intermediate: 40, advanced: 55 } },

      // Chest / pushing
      { keys: ['push-ups', 'push ups', 'push-up', 'pushup', 'push'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 25, intermediate: 35, advanced: 50 } },
      { keys: ['bench press'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 40, intermediate: 55, advanced: 75 } },
      { keys: ['chest dip', 'dips'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 30, intermediate: 40, advanced: 55 } },
      { keys: ['cable crossover', 'chest fly', 'fly'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 20, intermediate: 30, advanced: 40 } },

      // Back / pulling
      { keys: ['pull-up', 'pull up', 'pull-ups'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 35, intermediate: 45, advanced: 60 } },
      { keys: ['row', 'inverted row', 'inverted rows', 'lat pulldown'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 30, intermediate: 40, advanced: 55 } },
      { keys: ['deadlift'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 45, intermediate: 60, advanced: 80 } },

      // Shoulders
      { keys: ['lateral raise', 'front raise', 'upright row', 'rear delt', 'overhead press', 'handstand push'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 20, intermediate: 28, advanced: 40 } },

      // Biceps
      { keys: ['bicep', 'curl', 'chin up', 'chin-up'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 15, intermediate: 25, advanced: 35 } },

      // Triceps
      { keys: ['tricep', 'skull crusher', 'kickback', 'pushdown', 'overhead extension'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 20, intermediate: 28, advanced: 40 } },

      // Lower body
      { keys: ['squat'], sets: { beginner: 2, intermediate: 3, advanced: 5 }, cal: { beginner: 35, intermediate: 45, advanced: 60 } },
      { keys: ['lunge'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 30, intermediate: 40, advanced: 55 } },
      { keys: ['glute bridge'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 20, intermediate: 28, advanced: 35 } },
      { keys: ['kettlebell swing', 'kettlebell'], sets: { beginner: 3, intermediate: 4, advanced: 5 }, cal: { beginner: 40, intermediate: 55, advanced: 75 } },
      { keys: ['calves', 'calf'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 12, intermediate: 18, advanced: 25 } },
      { keys: ['hamstring', 'romanian deadlift'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 35, intermediate: 45, advanced: 60 } },

      // Core
      { keys: ['plank', 'side plank'], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 15, intermediate: 20, advanced: 28 } },
      { keys: ['russian twist', 'toe touches', 'v-ups', 'sit-ups', 'reverse crunch', 'leg raise', 'hanging leg', 'bicycle crunch', 'flutter kick', 'mountain climber'], sets: { beginner: 3, intermediate: 4, advanced: 5 }, cal: { beginner: 20, intermediate: 28, advanced: 35 } },

      // Generic fallback
      { keys: [''], sets: { beginner: 2, intermediate: 3, advanced: 4 }, cal: { beginner: 20, intermediate: 30, advanced: 40 } }
    ];

    const template = templates.find(t => t.keys.some(k => name.includes(k)));
    const sets = pick(template.sets);
    const calories_per_set = pick(template.cal);
    return {
      id: null,
      title: rawName,
      level: lvl,
      sets,
      calories_per_set,
      total_calories: sets * calories_per_set
    };
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

  const handleCompleteWorkout = async () => {
    if (!selectedVideo) return;

    const plan = getSelectedPlan();
    if (!plan || !plan.total_calories) {
      setCompletionMessage({
        type: 'error',
        text: 'Could not find calorie information for this workout.'
      });
      setTimeout(() => setCompletionMessage(null), 5000);
      return;
    }

    try {
      const response = await ApiService.request('/api/complete-workout/', {
        method: 'POST',
        body: JSON.stringify({
          calories_burned: plan.total_calories,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setCompletionMessage({ type: 'success', text: response.message || 'Workout completed successfully!' });
      setTimeout(() => setCompletionMessage(null), 5000);
    } catch (error) {
      console.error('Failed to complete workout:', error);
      setCompletionMessage({ type: 'error', text: 'Failed to save workout. Please try again.' });
      setTimeout(() => setCompletionMessage(null), 5000);
    }
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

  // Load level-based videos plan from backend
  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoadingPlan(true);
      setPlanError(null);
      try {
        const res = await ApiService.request('/api/videos/'); // expects { videos: [...] }
        if (isMounted && res && Array.isArray(res.videos)) {
          setVideosPlan(res.videos);
          setUserLevel(res.videos[0]?.level || null);
        }
      } catch (e) {
        if (isMounted) setPlanError('Failed to load workout plan');
      } finally {
        if (isMounted) setLoadingPlan(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  // Also fetch user profile to get level if not provided by videos endpoint
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        if (!userLevel) {
          const profile = await ApiService.getUserProfile();
          if (isMounted && profile && profile.level) {
            setUserLevel(profile.level);
          }
        }
      } catch (_) {
        // ignore, fallback will use beginner
      }
    })();
    return () => { isMounted = false; };
  }, [userLevel]);

  // Removed video tracking and navigation functions

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#000000',
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
      background: 'rgba(30, 30, 30, 0.75)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
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
      background: '#f44336',
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
      color: '#cccccc',
      fontSize: '18px',
      fontWeight: '500'
    },
    statsContainer: {
      background: 'rgba(30, 30, 30, 0.75)',
      backdropFilter: 'blur(15px)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
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
      color: '#cccccc'
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
      background: '#f44336',
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
      color: '#cccccc',
      fontSize: '1.4rem',
      fontWeight: '500',
      marginBottom: '15px',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    },
    timer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'rgba(0, 0, 0, 0.2)',
      padding: '10px 20px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
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
      color: '#cccccc',
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
                {/* Level-based plan info */}
                <div style={styles.statsContainer}>
                  {loadingPlan ? (
                    <div style={{ color: '#ffffff' }}>Loading plan...</div>
                  ) : planError ? (
                    <div style={{ color: '#ffdddd' }}>{planError}</div>
                  ) : (() => {
                    const plan = getSelectedPlan();
                    return (
                      <>
                        <div style={styles.statItem}>
                          <div style={styles.statNumber}>{plan.sets}</div>
                          <div style={styles.statLabel}>Sets</div>
                        </div>
                        <div style={styles.statItem}>
                          <div style={styles.statNumber}>{plan.calories_per_set}</div>
                          <div style={styles.statLabel}>Calories / Set</div>
                        </div>
                        <div style={styles.statItem}>
                          <div style={styles.statNumber}>{plan.total_calories}</div>
                          <div style={styles.statLabel}>Total Calories</div>
                        </div>
                        <div style={styles.statItem}>
                          <div style={styles.statNumber}>{userLevel || plan.level}</div>
                          <div style={styles.statLabel}>Your Level</div>
                        </div>
                      </>
                    );
                  })()}
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
                        style={{...styles.timerButton, background: '#f44336'}}
                        onClick={startTimer}
                      >
                        Start Timer
                      </button>
                    ) : (
                      <button
                        style={{...styles.timerButton, background: '#d32f2f'}}
                        onClick={stopTimer}
                      >
                        Stop Timer
                      </button>
                    )}
                    <button
                      style={{...styles.timerButton, background: '#616161'}}
                      onClick={resetTimer}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button
                    style={{...styles.button, padding: '12px 28px', fontSize: '18px', background: '#4CAF50' }}
                    onClick={handleCompleteWorkout}
                  >
                    ✓ Complete Workout
                  </button>
                </div>
                {completionMessage && (
                  <div style={{ 
                    textAlign: 'center',
                    marginTop: '15px', 
                    padding: '10px', 
                    borderRadius: '8px',
                    color: '#ffffff',
                    background: completionMessage.type === 'success' ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)',
                    border: `1px solid ${completionMessage.type === 'success' ? 'rgba(76, 175, 80, 1)' : 'rgba(244, 67, 54, 1)'}`
                  }}>
                    {completionMessage.text}
                  </div>
                )}
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