'use client';

import Link from 'next/link';
import { useState } from 'react';
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>
        <input
          type="username"
          placeholder="Username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="/" style={styles.submitButton}>Login</Link>
      </form>
    </div>
  );
}

const styles = {
  submitButton: {
    textDecoration: 'none',
    background: 'var(--accent)',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
  },
} as const;
