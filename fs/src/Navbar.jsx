import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMe, logoutUser } from './lib/api';

export default function Navbar() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data.results[0]);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser(); 

      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.navbar}>

      <nav style={styles.nav}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/products">Products</Link>

        {!user && (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <span style={styles.user}>
              Welcome, 👤 {user.name} - {user.role} -{user.email}
            </span>

            <button
              onClick={logout}
              style={styles.button}
            >
              Logout
            </button>
          </>
        )}
      </nav>

    </div>
  );
}

const styles = {
  navbar: {
    background: '#16a34a',
    padding: '12px 0',
    textAlign: 'center'
  },

  nav: {
    display: 'inline-flex',
    gap: '16px',
    alignItems: 'center'
  },

  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600'
  },

  user: {
    color: '#fff',
    fontWeight: 'bold'
  },

  button: {
    padding: '6px 10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  }
};