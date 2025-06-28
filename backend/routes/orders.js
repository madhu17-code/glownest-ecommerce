const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Path to orders data file
const ordersFile = path.join(__dirname, '../data/orders.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(ordersFile);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Initialize orders data if it doesn't exist
const initializeOrders = async () => {
  try {
    await fs.access(ordersFile);
  } catch {
    await fs.writeFile(ordersFile, JSON.stringify([], null, 2));
  }
};

// Get all orders
router.get('/', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeOrders();
    const data = await fs.readFile(ordersFile, 'utf8');
    const orders = JSON.parse(data);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Place a new order
router.post('/', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeOrders();
    const data = await fs.readFile(ordersFile, 'utf8');
    const orders = JSON.parse(data);
    const { userId, items, total, address } = req.body;
    const newOrder = {
      id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
      userId,
      items,
      total,
      address,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeOrders();
    const data = await fs.readFile(ordersFile, 'utf8');
    const orders = JSON.parse(data);
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...req.body,
      id: parseInt(req.params.id)
    };
    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));
    res.json({ message: 'Order updated', order: orders[orderIndex] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

module.exports = router; 