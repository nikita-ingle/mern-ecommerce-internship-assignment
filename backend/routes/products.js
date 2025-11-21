const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /products
router.get('/', async (req, res) => {
  const { q, category, page = 1, limit = 12 } = req.query;
  const filter = {};
  if(q) filter.name = new RegExp(q, 'i');
  if(category) filter.category = category;

  const skip = (page - 1) * limit;
  const products = await Product.find(filter).skip(skip).limit(parseInt(limit));
  res.json(products);
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) return res.status(404).json({ msg: 'Product not found' });
  res.json(product);
});

module.exports = router;
