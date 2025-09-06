import React, { useState, useEffect } from 'react';
import Header from '../Header';
import styles from '../styles/Home.module.css';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/fitness image.jpg';
import ApiService from '../api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeightTrackerModal = ({ isOpen, onClose, onSave, weight, setWeight, saving }) => {
  if (!isOpen) return null;

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1050,
    },
    content: {
      background: '#1e1e1e',
      padding: '30px',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '400px',
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    },
    title: {
      marginTop: 0,
      marginBottom: '20px',
      fontSize: '24px'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      background: 'rgba(0,0,0,0.3)',
      color: '#fff',
      fontSize: '16px',
      marginBottom: '20px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px'
    },
    button: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '14px',
    },
    saveButton: {
      background: '#f44336',
      color: '#fff',
    },
    cancelButton: {
      background: '#444',
      color: '#fff',
    }
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
        <h2 style={modalStyles.title}>Track Today's Weight</h2>
        <input
          type="number"
          style={modalStyles.input}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight in kg"
        />
        <div style={modalStyles.buttonContainer}>
          <button style={{...modalStyles.button, ...modalStyles.cancelButton}} onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button style={{...modalStyles.button, ...modalStyles.saveButton}} onClick={onSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getDashboardData();
      setData(response);
      setWeightInput(response.summary_stats.current_weight || '');
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveWeight = async () => {
    if (!weightInput || isNaN(parseFloat(weightInput))) {
      alert('Please enter a valid weight.');
      return;
    }
    setIsSaving(true);
    try {
      await ApiService.saveUserProfile({ weight: parseFloat(weightInput) });
      setModalOpen(false);
      await fetchData(); // Refetch data to update charts
    } catch (error) {
      alert('Failed to save weight. Please try again.');
      console.error('Failed to save weight:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const chartCardStyle = {
    background: 'rgba(30, 30, 30, 0.75)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '30px',
  };

  const chartTitleStyle = {
    color: '#ffffff',
    marginBottom: '20px',
    fontSize: '20px',
    fontWeight: 600,
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading Dashboard...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <WeightTrackerModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveWeight}
        weight={weightInput}
        setWeight={setWeightInput}
        saving={isSaving}
      />
      <div 
        className={styles.container}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}>
        <div className={styles.backgroundElements}>
          <div className={styles.floatingOrb1}></div>
          <div className={styles.floatingOrb2}></div>
          <div className={styles.floatingOrb3}></div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.welcomeTitle}>
              Your Fitness Dashboard
            </h1>
            <p className={styles.subtitle}>
              {data?.message}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '20px' }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid #f44336',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '16px',
                background: 'rgba(244, 67, 54, 0.8)',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              Track Today's Weight
            </button>
            <button
              onClick={() => navigate('/videos')}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '16px',
                background: '#f44336',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              Start Workout
            </button>
          </div>

          <div style={chartCardStyle}>
            <h3 style={chartTitleStyle}>Daily Calories Burned (Last 30 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.chart_data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip 
                  contentStyle={{ background: '#333', border: '1px solid #555', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#fff' }} />
                <Bar dataKey="calories_burned" fill="#f44336" name="Calories Burned" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={chartCardStyle}>
            <h3 style={chartTitleStyle}>Weight Trend (Last 30 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.chart_data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#ccc" />
                <YAxis stroke="#ccc" domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ background: '#333', border: '1px solid #555', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#fff' }} />
                <Line connectNulls type="monotone" dataKey="weight" stroke="#f44336" strokeWidth={2} name="Weight (kg)" dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;