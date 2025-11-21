import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      // prompt login if not logged in
      nav('/login');
      return;
    }
    try {
      setBusy(true);
      await addToCart(product._id, qty);
      // small UX: navigate to cart or show a message — we'll navigate to cart for demo
      nav('/cart');
    } catch (err) {
      console.error('add to cart failed', err);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="container"><p>Loading product...</p></div>;
  if (!product) return <div className="container"><p>Product not found.</p></div>;

  return (
    <div className="container">
      <div className="product-detail">
        <div className="product-media">
          <img
  src={product.image && product.image.startsWith('http') ? product.image : `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}${product.image}`}
  alt={product.name}
  className="product-main-img"
  onError={(e)=>{ e.target.onerror=null; e.target.src = (process.env.REACT_APP_API_URL || 'http://localhost:5001') + '/images/fallback.jpg'; }}
/>

        </div>

        <div className="product-info">
          <h1 className="pd-title">{product.name}</h1>
          <div className="pd-meta">
            <span className="pd-category">{product.category}</span>
            <span className="pd-price">₹{product.price}</span>
          </div>

          <p className="pd-desc">{product.description}</p>

          <div className="pd-controls">
            <div className="qty-box">
              <label>Quantity</label>
              <div className="qty-controls">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="small-btn">−</button>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                  className="qty-input"
                />
                <button onClick={() => setQty(qty + 1)} className="small-btn">+</button>
              </div>
            </div>

            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <button className="btn" onClick={handleAddToCart} disabled={busy}>
                {token ? (busy ? 'Adding...' : 'Add to Cart') : 'Login to Add'}
              </button>
              <button
                className="small-btn"
                onClick={() => {
                  if (!token) return nav('/login');
                  handleAddToCart();
                }}
              >
                Buy Now
              </button>
            </div>
          </div>

          <div className="pd-extra">
            <h4>Product details</h4>
            <ul>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Price:</strong> ₹{product.price}</li>
              <li><strong>ID:</strong> {product._id}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
