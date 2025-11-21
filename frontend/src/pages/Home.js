import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('load products', err);
      }
    })();
  }, []);

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="grid">
        {products.map(p => <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  );
}
