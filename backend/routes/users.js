const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

// Path to users data file
const usersFile = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(usersFile);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Initialize users data if it doesn't exist
const initializeUsers = async () => {
  try {
    await fs.access(usersFile);
  } catch {
    const initialUsers = [
      {
        id: 1,
        email: 'admin@glownest.com',
        password: '$2a$10$rQZ8K9mN2pL1vX3yA6bC7dE8fG9hI0jK1lM2nO3pQ4rS5tU6vW7xY8zA9bC0dE1f',
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    await fs.writeFile(usersFile, JSON.stringify(initialUsers, null, 2));
  }
};

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeUsers();

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const data = await fs.readFile(usersFile, 'utf8');
    const users = JSON.parse(data);

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeUsers();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const data = await fs.readFile(usersFile, 'utf8');
    const users = JSON.parse(data);

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    await ensureDataDir();
    await initializeUsers();

    const data = await fs.readFile(usersFile, 'utf8');
    const users = JSON.parse(data);

    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    await ensureDataDir();
    await initializeUsers();

    const { name, email } = req.body;
    const data = await fs.readFile(usersFile, 'utf8');
    const users = JSON.parse(data);

    const userIndex = users.findIndex(u => u.id === req.user.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if email is already taken by another user
    if (email && email !== users[userIndex].email) {
      const existingUser = users.find(u => u.email === email && u.id !== req.user.userId);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email
    };

    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: users[userIndex].id,
        email: users[userIndex].email,
        name: users[userIndex].name,
        role: users[userIndex].role
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router; 