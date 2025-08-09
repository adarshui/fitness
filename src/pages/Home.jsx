import React, { useState, useEffect } from 'react';
import Header from '../Header';
import ApiService from '../api';
import styles from '../styles/Home.module.css';

function Home() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.getDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingText}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorText}>{error}</div>
      </div>
    );
  }

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
              {dashboardData?.message || 'Welcome to Your Fitness App!'}
            </h1>
            <p className={styles.subtitle}>
              Track your progress and achieve your fitness goals
            </p>
          </div>
          
          {dashboardData?.stats && (
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{dashboardData.stats.total_workouts}</div>
                <div className={styles.statLabel}>Total Workouts</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{dashboardData.stats.calories_burned}</div>
                <div className={styles.statLabel}>Calories Burned</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{dashboardData.stats.active_days}</div>
                <div className={styles.statLabel}>Active Days</div>
              </div>
            </div>
          )}

          {dashboardData?.recent_activities && (
            <div className={styles.activitiesSection}>
              <h2 className={styles.sectionTitle}>Recent Activities</h2>
              {dashboardData.recent_activities.map((activity, index) => (
                <div key={index} className={styles.activityCard}>
                  <div className={styles.activityName}>{activity.name}</div>
                  <div className={styles.activityDetails}>
                    <span>{activity.date}</span>
                    <span>•</span>
                    <span>{activity.calories} calories</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;