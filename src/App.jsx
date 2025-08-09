import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from '/src/pages/Register';
import Login from '/src/pages/Login';
import Home from '/src/pages/Home';
import './App.css'
import { useEffect, useState } from 'react';
import { isAuthenticated } from '/src/firebase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    setUser(isAuthenticated());
  };

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={checkAuth} />} />
      </Routes>
     
    </BrowserRouter>
  )
}

export default App
