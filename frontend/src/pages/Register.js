import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Register() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setBusy(true);
    try {
      await register(email.trim(), password);
      nav('/'); // after register we go to home (logged in)
    } catch (err) {
      console.error('register error', err);
      const msg = err?.response?.data?.msg || err?.message || 'Registration failed';
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div style={{ background:'#fff', padding:24, borderRadius:12, boxShadow:'0 12px 30px rgba(16,24,40,0.06)' }}>
        <h2 style={{ marginTop:0 }}>Create account</h2>
        <p style={{ color:'#6b7280' }}>Quickly create an account to start adding items to cart.</p>

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
            placeholder="Create a password"
            type="password"
            required
            style={{ padding:10, borderRadius:8, border:'1px solid #e6e6e9' }}
          />

          <label style={{ fontSize:13, color:'#374151' }}>Confirm password</label>
          <input
            value={confirm}
            onChange={e=>setConfirm(e.target.value)}
            placeholder="Repeat password"
            type="password"
            required
            style={{ padding:10, borderRadius:8, border:'1px solid #e6e6e9' }}
          />

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6 }}>
            <div style={{ fontSize:13, color:'#6b7280' }}>
              Already have an account? <a href="/login">Login</a>
            </div>
            <button
              type="submit"
              className="btn"
              disabled={busy}
              style={{ opacity: busy ? 0.7 : 1 }}
            >
              {busy ? 'Creating…' : 'Create account'}
            </button>
          </div>
        </form>

        <div style={{ marginTop:12, color:'#9ca3af', fontSize:13 }}>
          Tip: use a valid email — you can also register with any email for demo purposes.
        </div>
      </div>
    </div>
  );
}
