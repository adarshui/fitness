import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Home, Activity, Play } from 'lucide-react';
import ApiService from './api';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    ApiService.logout();
    navigate('/login');
  };

  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(10, 10, 10, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '15px 30px',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#ffffff',
      fontSize: '1.5rem',
      fontWeight: '700',
      cursor: 'pointer'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: '#f44336',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    navButton: {
      background: 'none',
      border: 'none',
      color: '#ffffff',
      cursor: 'pointer',
      padding: '8px 16px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px'
    },
    logoutButton: {
      background: 'rgba(244, 67, 54, 0.8)',
      border: '1px solid rgba(244, 67, 54, 1)',
      color: '#ffffff',
      cursor: 'pointer',
      padding: '8px 16px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px'
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo} onClick={() => navigate('/')}>
        <div style={styles.logoIcon}>
          <Activity size={24} color="white" />
        </div>
        <span>FitTracker</span>
      </div>
      
      <nav style={styles.nav}>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#ffffff';
          }}
        >
          <Home size={16} />
          Home
        </button>
        
        <button 
          style={styles.navButton}
          onClick={() => navigate('/videos')}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#ffffff';
          }}
        >
          <Play size={16} />
          Videos
        </button>
        
        <button 
          style={styles.navButton}
          onClick={() => navigate('/profile')}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#ffffff';
          }}
        >
          <User size={16} />
          Profile
        </button>
        
        <button 
          style={styles.logoutButton}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(244, 67, 54, 1)';
            e.target.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(244, 67, 54, 0.8)';
            e.target.style.color = '#ffffff';
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;