import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ p }) {
  const backendBase = process.env.REACT_APP_API_URL || 'http://localhost:5001';
  const imgSrc = p.image && p.image.startsWith('http') ? p.image : `${backendBase}${p.image}`;

  return (
    <div className="card">
      <img
        src={imgSrc}
        alt={p.name}
        className="product-card-img"
        onError={(e) => { e.target.onerror = null; e.target.src = backendBase + '/images/fallback.jpg'; }}
      />
      <div className="card-body">
        <h3>{p.name}</h3>
        <p>{p.description ? (p.description.length > 100 ? p.description.slice(0, 100) + '...' : p.description) : ''}</p>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700 }}>₹{p.price}</div>
          <Link to={`/product/${p._id}`} style={{ textDecoration:'none' }}>
            <button className="small-btn">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
