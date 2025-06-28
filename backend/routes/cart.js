const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Path to cart data file
const cartFile = path.join(__dirname, '../data/cart.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(cartFile);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Initialize cart data if it doesn't exist
const initializeCart = async () => {
  try {
    await fs.access(cartFile);
  } catch {
    await fs.writeFile(cartFile, JSON.stringify([], null, 2));
  }
};

// Get all cart items
router.get('/', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeCart();
    const data = await fs.readFile(cartFile, 'utf8');
    const cart = JSON.parse(data);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeCart();
    const data = await fs.readFile(cartFile, 'utf8');
    const cart = JSON.parse(data);
    const { productId, quantity } = req.body;
    const existing = cart.find(item => item.productId === parseInt(productId));
    if (existing) {
      existing.quantity += parseInt(quantity);
    } else {
      cart.push({ productId: parseInt(productId), quantity: parseInt(quantity) });
    }
    await fs.writeFile(cartFile, JSON.stringify(cart, null, 2));
    res.status(201).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// Remove item from cart
router.delete('/:productId', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeCart();
    const data = await fs.readFile(cartFile, 'utf8');
    let cart = JSON.parse(data);
    cart = cart.filter(item => item.productId !== parseInt(req.params.productId));
    await fs.writeFile(cartFile, JSON.stringify(cart, null, 2));
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

module.exports = router; 