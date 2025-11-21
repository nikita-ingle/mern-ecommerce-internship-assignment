import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email.trim(), password);
      // successful login -> go to home
      nav('/');
    } catch (err) {
      console.error('login error', err);
      // try to extract server message
      const msg = err?.response?.data?.msg || err?.message || 'Login failed';
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div style={{ background:'#fff', padding:24, borderRadius:12, boxShadow:'0 12px 30px rgba(16,24,40,0.06)' }}>
        <h2 style={{ marginTop:0 }}>Welcome back</h2>
        <p style={{ color:'#6b7280' }}>Login to continue to MERN E-Shop</p>

        {error && <div style={{ background:'#fee2e2', color:'#b91c1c', padding:10, borderRadius:8, marginBottom:12 }}>{error}</div>}

        <form onSubmit={submit} style={{ display:'grid', gap:12 }}>
          <label style={{ fontSize:13, color:'#374151' }}>Email</label>
          <input
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            required
            style={{ padding:10, borderRadius:8, border:'1px solid #e6e6e9' }}
          />

          <label style={{ fontSize:13, color:'#374151' }}>Password</label>
          <input
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Your password"
            type="password"
            required
            style={{ padding:10, borderRadius:8, border:'1px solid #e6e6e9' }}
          />

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6 }}>
            <div style={{ fontSize:13, color:'#6b7280' }}>
              New here? <a href="/register">Register</a>
            </div>
            <button
              type="submit"
              className="btn"
              disabled={busy}
              style={{ opacity: busy ? 0.7 : 1 }}
            >
              {busy ? 'Logging in…' : 'Login'}
            </button>
          </div>
        </form>

        <div style={{ marginTop:12, color:'#9ca3af', fontSize:13 }}>
          Tip: use any email & password (we are seeding users) or register a new account.
        </div>
      </div>
    </div>
  );
}
