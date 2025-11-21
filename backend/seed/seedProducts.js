const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Classic Cotton Tee',
    description: 'Soft ring-spun cotton tee — breathable, lightweight and perfect for everyday wear.',
    price: 499,
    category: 'Clothing',
    image: 'http://localhost:5001/images/classic-tee.jpg'
  },
  {
    name: 'Trail Running Shoes',
    description: 'Lightweight running shoes with cushioned sole for comfort and grip on multiple surfaces.',
    price: 2499,
    category: 'Footwear',
    image: 'http://localhost:5001/images/trail-shoes.jpg'
  },
  {
    name: 'Wireless Headphones',
    description: 'Over-ear Bluetooth headphones with 20h battery and noise-isolating earcups.',
    price: 2999,
    category: 'Electronics',
    image: 'http://localhost:5001/images/wireless-headphones.jpg'
  },
  {
    name: 'Minimalist Backpack',
    description: 'Water-resistant 20L backpack with laptop sleeve and multiple pockets for daily commute.',
    price: 1799,
    category: 'Accessories',
    image: 'http://localhost:5001/images/minimalist-backpack.jpeg'
  },
  {
    name: 'Ceramic Coffee Mug',
    description: '350ml handcrafted ceramic mug — dishwasher safe with a matte finish.',
    price: 399,
    category: 'Home',
    image: 'http://localhost:5001/images/ceramic-mug.jpg'
  },
  {
    name: 'Smartwatch Lite',
    description: 'Fitness-focused smartwatch with heart-rate monitoring and step tracker.',
    price: 3999,
    category: 'Electronics',
    image: 'http://localhost:5001/images/smartwatch-lite.jpeg'
  },
  {
    name: 'Desk Lamp — Adjustable',
    description: 'LED desk lamp with adjustable brightness and flexible neck for focused lighting.',
    price: 899,
    category: 'Home',
    image: 'http://localhost:5001/images/desk-lamp.jpg'
  },
  {
    name: 'Noise Cancelling Earbuds',
    description: 'Compact true wireless earbuds with quick-charge and clear call quality.',
    price: 1599,
    category: 'Electronics',
    image: 'http://localhost:5001/images/noise-earbuds.jpg'
  },
  {
    name: 'Vintage Sunglasses',
    description: 'UV400 protected sunglasses with classic round frame and comfortable nose pads.',
    price: 699,
    category: 'Accessories',
    image: 'http://localhost:5001/images/vintage-sunglasses.jpeg'
  },
  {
    name: 'Notebook — Ruled',
    description: 'A5 ruled notebook with 160 pages, perfect for notes and sketches.',
    price: 249,
    category: 'Stationery',
    image: 'http://localhost:5001/images/notebook-ruled.jpg'
  }
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-ecom');
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products with local images');
  process.exit();
};

run().catch(err => { console.error(err); process.exit(1); });
