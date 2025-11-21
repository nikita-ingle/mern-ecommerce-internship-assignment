const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

// GET /cart
router.get('/', auth, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if(!cart) return res.json({ items: [] });
  res.json(cart);
});

// POST /cart (add)
router.post('/', auth, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if(!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
  }

  const idx = cart.items.findIndex(i => i.product.toString() === productId);
  if(idx > -1) {
    cart.items[idx].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  cart = await cart.populate('items.product');
  res.json(cart);
});

// PUT /cart/:id (update item quantity)
router.put('/:id', auth, async (req, res) => {
  const itemId = req.params.id;
  const { quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if(!cart) return res.status(400).json({ msg: 'Cart not found' });

  const item = cart.items.id(itemId);
  if(!item) return res.status(404).json({ msg: 'Item not found' });
  if(quantity <= 0) item.remove();
  else item.quantity = quantity;

  await cart.save();
  cart = await cart.populate('items.product');
  res.json(cart);
});

// DELETE /cart/:id
router.delete('/:id', auth, async (req, res) => {
  const itemId = req.params.id;
  let cart = await Cart.findOne({ user: req.user.id });
  if(!cart) return res.status(400).json({ msg: 'Cart not found' });

  const item = cart.items.id(itemId);
  if(!item) return res.status(404).json({ msg: 'Item not found' });
  item.remove();
  await cart.save();
  cart = await cart.populate('items.product');
  res.json(cart);
});

module.exports = router;
