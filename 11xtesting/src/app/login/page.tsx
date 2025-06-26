'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import './login.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      login();
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarContainer}>
          <Link href="/" style={styles.logo}>
            Web3 Dev Blog
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        <div className="login-container" style={styles.loginContainer}>
          <form
            className="login-form"
            onSubmit={handleLogin}
            style={{ maxWidth: 600, width: '100%' }} // Wider max width + responsive
          >
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>{error}</p>
            )}
            <button type="submit">Login</button>
          </form>
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#111827',
    color: '#fff',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 1000,
  },
  sidebarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  logo: {
    fontSize: '1.75rem',
    marginBottom: '1.5rem',
    textDecoration: 'none',
    color: '#fff',
    display: 'inline-block',
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    marginLeft: '250px',
    display: 'flex',
    alignItems: 'center',      // vertical center
    justifyContent: 'center',  // horizontal center
    padding: '2rem',
    minHeight: '100vh',        // full viewport height
    boxSizing: 'border-box',
  },
  loginContainer: {
    width: '100%',
    maxWidth: 550,             // max width container for better layout
    padding: '1rem',
    boxSizing: 'border-box',
  },
} as const;
