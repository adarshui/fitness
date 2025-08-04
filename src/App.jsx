import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from '/src/pages/Register';
import Login from '/src/pages/Login';
import Home from '/src/pages/Home';
import './App.css'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '/src/firebase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!user && (<div>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </div>)}
    </BrowserRouter>
  )
}

export default App
