import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../api';
import { Lock, User, Mail, Eye, EyeOff, UserPlus } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setIsLoading(true);
    try {
      await ApiService.register(username, email, password);
      navigate('/login');
    } catch (error) {
      setError('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none'
    },
    floatingOrb1: {
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '200px',
      height: '200px',
      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'float 6s ease-in-out infinite'
    },
    floatingOrb2: {
      position: 'absolute',
      top: '60%',
      right: '15%',
      width: '150px',
      height: '150px',
      background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent)',
      borderRadius: '50%',
      filter: 'blur(50px)',
      animation: 'float 8s ease-in-out infinite reverse'
    },
    floatingOrb3: {
      position: 'absolute',
      bottom: '20%',
      left: '20%',
      width: '100px',
      height: '100px',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
      borderRadius: '50%',
      filter: 'blur(40px)',
      animation: 'float 10s ease-in-out infinite'
    },
    formWrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: '400px'
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '32px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.5s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    formContainerHover: {
      background: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 35px 60px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transform: 'scale(1.02)'
    },
    glowEffect: {
      position: 'absolute',
      inset: 0,
      borderRadius: '24px',
      background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
      filter: 'blur(20px)',
      zIndex: -1,
      transition: 'opacity 0.5s ease'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logoContainer: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    logoContainerHover: {
      transform: 'scale(1.1) rotate(12deg)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      margin: 0,
      transition: 'all 0.3s ease',
      cursor: 'default'
    },
    titleHover: {
      background: 'linear-gradient(135deg, #e0e7ff, #fce7f3)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text'
    },
    subtitle: {
      color: '#e0e7ff',
      marginTop: '8px',
      margin: 0,
      transition: 'color 0.3s ease',
      cursor: 'default'
    },
    subtitleHover: {
      color: '#ffffff'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      position: 'relative'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#e0e7ff',
      marginBottom: '8px',
      transition: 'color 0.3s ease'
    },
    labelHover: {
      color: '#ffffff'
    },
    inputWrapper: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#e0e7ff',
      transition: 'all 0.3s ease',
      zIndex: 2
    },
    inputIconHover: {
      color: '#ffffff',
      transform: 'translateY(-50%) scale(1.1)'
    },
    input: {
      width: '100%',
      padding: '12px 12px 12px 48px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputHover: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      transform: 'scale(1.02)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    },
    inputOverlay: {
      position: 'absolute',
      inset: 0,
      borderRadius: '12px',
      background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none'
    },
    inputOverlayHover: {
      opacity: 1
    },
    eyeButton: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#e0e7ff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 2
    },
    eyeButtonHover: {
      color: '#ffffff',
      transform: 'translateY(-50%) scale(1.25) rotate(12deg)'
    },
    errorContainer: {
      background: 'rgba(239, 68, 68, 0.2)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    },
    errorDot: {
      width: '8px',
      height: '8px',
      background: '#f87171',
      borderRadius: '50%',
      animation: 'ping 1s ease-in-out infinite'
    },
    errorText: {
      color: '#fecaca',
      fontSize: '14px',
      margin: 0
    },
    submitButton: {
      position: 'relative',
      width: '100%',
      background: 'linear-gradient(45deg, #8b5cf6, #ec4899, #8b5cf6)',
      color: '#ffffff',
      fontWeight: '600',
      padding: '16px 24px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      backgroundSize: '200% 100%'
    },
    submitButtonHover: {
      background: 'linear-gradient(45deg, #7c3aed, #db2777, #7c3aed)',
      transform: 'scale(1.05)',
      boxShadow: '0 25px 50px rgba(139, 92, 246, 0.5)',
      backgroundPosition: '100% 0'
    },
    submitButtonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'none'
    },
    buttonContent: {
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  const [hoverStates, setHoverStates] = useState({
    container: false,
    logo: false,
    title: false,
    subtitle: false,
    usernameGroup: false,
    emailGroup: false,
    passwordGroup: false,
    confirmPasswordGroup: false,
    submitButton: false,
    eyeButton1: false,
    eyeButton2: false
  });

  const handleMouseEnter = (element) => {
    setHoverStates(prev => ({ ...prev, [element]: true }));
  };

  const handleMouseLeave = (element) => {
    setHoverStates(prev => ({ ...prev, [element]: false }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundElements}>
        <div style={styles.floatingOrb1}></div>
        <div style={styles.floatingOrb2}></div>
        <div style={styles.floatingOrb3}></div>
      </div>

      <div style={styles.formWrapper}>
        <div 
          style={{
            ...styles.formContainer,
            ...(hoverStates.container ? styles.formContainerHover : {})
          }}
          onMouseEnter={() => handleMouseEnter('container')}
          onMouseLeave={() => handleMouseLeave('container')}
        >
          <div 
            style={{
              ...styles.glowEffect,
              opacity: hoverStates.container ? 1 : 0
            }}
          ></div>

          <div style={styles.header}>
            <div 
              style={{
                ...styles.logoContainer,
                ...(hoverStates.logo ? styles.logoContainerHover : {})
              }}
              onMouseEnter={() => handleMouseEnter('logo')}
              onMouseLeave={() => handleMouseLeave('logo')}
            >
              <UserPlus size={32} color="white" />
            </div>
            <h1 
              style={{
                ...styles.title,
                ...(hoverStates.title ? styles.titleHover : {})
              }}
              onMouseEnter={() => handleMouseEnter('title')}
              onMouseLeave={() => handleMouseLeave('title')}
            >
              Create Account
            </h1>
            <p 
              style={{
                ...styles.subtitle,
                ...(hoverStates.subtitle ? styles.subtitleHover : {})
              }}
              onMouseEnter={() => handleMouseEnter('subtitle')}
              onMouseLeave={() => handleMouseLeave('subtitle')}
            >
              Join us today
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div 
              style={styles.inputGroup}
              onMouseEnter={() => handleMouseEnter('usernameGroup')}
              onMouseLeave={() => handleMouseLeave('usernameGroup')}
            >
              <label 
                htmlFor="username" 
                style={{
                  ...styles.label,
                  ...(hoverStates.usernameGroup ? styles.labelHover : {})
                }}
              >
                Username
              </label>
              <div style={styles.inputWrapper}>
                <User 
                  size={20} 
                  style={{
                    ...styles.inputIcon,
                    ...(hoverStates.usernameGroup ? styles.inputIconHover : {})
                  }}
                />
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(hoverStates.usernameGroup ? styles.inputHover : {})
                  }}
                  placeholder="Enter your username"
                  autoComplete="username"
                  autoFocus
                />
                <div 
                  style={{
                    ...styles.inputOverlay,
                    ...(hoverStates.usernameGroup ? styles.inputOverlayHover : {})
                  }}
                ></div>
              </div>
            </div>

            <div 
              style={styles.inputGroup}
              onMouseEnter={() => handleMouseEnter('emailGroup')}
              onMouseLeave={() => handleMouseLeave('emailGroup')}
            >
              <label 
                htmlFor="email" 
                style={{
                  ...styles.label,
                  ...(hoverStates.emailGroup ? styles.labelHover : {})
                }}
              >
                Email
              </label>
              <div style={styles.inputWrapper}>
                <Mail 
                  size={20} 
                  style={{
                    ...styles.inputIcon,
                    ...(hoverStates.emailGroup ? styles.inputIconHover : {})
                  }}
                />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(hoverStates.emailGroup ? styles.inputHover : {})
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                <div 
                  style={{
                    ...styles.inputOverlay,
                    ...(hoverStates.emailGroup ? styles.inputOverlayHover : {})
                  }}
                ></div>
              </div>
            </div>

            <div 
              style={styles.inputGroup}
              onMouseEnter={() => handleMouseEnter('passwordGroup')}
              onMouseLeave={() => handleMouseLeave('passwordGroup')}
            >
              <label 
                htmlFor="password" 
                style={{
                  ...styles.label,
                  ...(hoverStates.passwordGroup ? styles.labelHover : {})
                }}
              >
                Password
              </label>
              <div style={styles.inputWrapper}>
                <Lock 
                  size={20} 
                  style={{
                    ...styles.inputIcon,
                    ...(hoverStates.passwordGroup ? styles.inputIconHover : {})
                  }}
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    ...styles.input,
                    paddingRight: '48px',
                    ...(hoverStates.passwordGroup ? styles.inputHover : {})
                  }}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    ...styles.eyeButton,
                    ...(hoverStates.eyeButton1 ? styles.eyeButtonHover : {})
                  }}
                  onMouseEnter={() => handleMouseEnter('eyeButton1')}
                  onMouseLeave={() => handleMouseLeave('eyeButton1')}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <div 
                  style={{
                    ...styles.inputOverlay,
                    ...(hoverStates.passwordGroup ? styles.inputOverlayHover : {})
                  }}
                ></div>
              </div>
            </div>

            <div 
              style={styles.inputGroup}
              onMouseEnter={() => handleMouseEnter('confirmPasswordGroup')}
              onMouseLeave={() => handleMouseLeave('confirmPasswordGroup')}
            >
              <label 
                htmlFor="confirmPassword" 
                style={{
                  ...styles.label,
                  ...(hoverStates.confirmPasswordGroup ? styles.labelHover : {})
                }}
              >
                Confirm Password
              </label>
              <div style={styles.inputWrapper}>
                <Lock 
                  size={20} 
                  style={{
                    ...styles.inputIcon,
                    ...(hoverStates.confirmPasswordGroup ? styles.inputIconHover : {})
                  }}
                />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    ...styles.input,
                    paddingRight: '48px',
                    ...(hoverStates.confirmPasswordGroup ? styles.inputHover : {})
                  }}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    ...styles.eyeButton,
                    ...(hoverStates.eyeButton2 ? styles.eyeButtonHover : {})
                  }}
                  onMouseEnter={() => handleMouseEnter('eyeButton2')}
                  onMouseLeave={() => handleMouseLeave('eyeButton2')}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <div 
                  style={{
                    ...styles.inputOverlay,
                    ...(hoverStates.confirmPasswordGroup ? styles.inputOverlayHover : {})
                  }}
                ></div>
              </div>
            </div>

            {error && (
              <div style={styles.errorContainer}>
                <div style={styles.errorDot}></div>
                <p style={styles.errorText}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                ...(hoverStates.submitButton ? styles.submitButtonHover : {}),
                ...(isLoading ? styles.submitButtonDisabled : {})
              }}
              onMouseEnter={() => handleMouseEnter('submitButton')}
              onMouseLeave={() => handleMouseLeave('submitButton')}
            >
              <div style={styles.buttonContent}>
                {isLoading ? (
                  <>
                    <div style={styles.spinner}></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    <span>Create Account</span>
                  </>
                )}
              </div>
            </button>
          </form>

          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{
              color: '#e0e7ff',
              fontSize: '14px',
              margin: 0
            }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fce7f3',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#fce7f3';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Register;