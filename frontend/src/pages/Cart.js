import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function Cart() {
  const { cart, updateItem, removeItem } = useContext(CartContext);

  // avoid crash if cart or cart.items is null/undefined
  const items = Array.isArray(cart?.items) ? cart.items : [];

  const total = items.reduce((sum, it) => {
    const price = it.product?.price ?? 0; // safe access
    const qty = it.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <div style={{ background:'#fff', padding:20, borderRadius:10, boxShadow:'0 8px 20px rgba(0,0,0,0.04)' }}>
          <p style={{ margin:0 }}>Your cart is empty.</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:18 }}>
          <div style={{ background:'#fff', padding:14, borderRadius:10 }}>
            {items.map(it => (
              <div key={it._id} className="cart-item" style={{ alignItems:'flex-start' }}>
                <div style={{ display:'flex', gap:12, flex:1 }}>
                  <img
                    src={it.product?.image || 'https://picsum.photos/120/90'}
                    alt={it.product?.name || 'Removed product'}
                    style={{ width:100, height:80, objectFit:'cover', borderRadius:8 }}
                  />
                  <div style={{ flex:1 }}>
                    <h4 style={{ margin:0 }}>{it.product?.name || 'Product removed'}</h4>
                    <p style={{ margin:'6px 0', color:'#6b7280' }}>
                      {it.product ? (it.product.description?.slice(0,80) + (it.product.description?.length > 80 ? '...' : '')) : 'This product is no longer available.'}
                    </p>

                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      <div style={{ fontWeight:700 }}>{it.product ? `₹${it.product.price}` : '—'}</div>
                      <div style={{ display:'flex', gap:6, marginLeft:8 }}>
                        <button
                          className="small-btn"
                          onClick={() => updateItem(it._id, Math.max(0, (it.quantity ?? 0) - 1))}
                          disabled={!it.product}
                        >-</button>

                        <div style={{ padding:'6px 10px', border:'1px solid #e6e6ee', borderRadius:8 }}>{it.quantity}</div>

                        <button
                          className="small-btn"
                          onClick={() => updateItem(it._id, (it.quantity ?? 0) + 1)}
                          disabled={!it.product}
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button className="small-btn" onClick={() => removeItem(it._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:'#fff', padding:16, borderRadius:10, height:'fit-content' }}>
            <h3 style={{ marginTop:0 }}>Order summary</h3>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
              <div>Subtotal</div>
              <div style={{ fontWeight:800 }}>₹{total}</div>
            </div>
            <div style={{ marginTop:12 }}>
              <button className="btn" style={{ width:'100%' }}>
                Checkout (demo)
              </button>
            </div>
            <div style={{ marginTop:10, color:'#6b7280', fontSize:13 }}>
              Note: If a product is removed from the catalogue, it appears here as "Product removed". You can remove it from cart.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
