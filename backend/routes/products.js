const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Path to products data file
const productsFile = path.join(__dirname, '../data/products.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(productsFile);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Initialize products data if it doesn't exist
const initializeProducts = async () => {
  try {
    await fs.access(productsFile);
  } catch {
    const initialProducts = [
      {
        id: 1,
        name: "Gentle Cleanser",
        price: 24.99,
        description: "A gentle, non-stripping cleanser that removes impurities while maintaining your skin's natural moisture barrier.",
        category: "cleanser",
        image: "/images/cleanser.jpeg",
        inStock: true,
        rating: 4.5,
        reviews: 128
      },
      {
        id: 2,
        name: "Hydrating Moisturizer",
        price: 32.99,
        description: "Deeply hydrating moisturizer with hyaluronic acid and ceramides for plump, healthy skin.",
        category: "moisturizer",
        image: "/images/moisturizer.jpeg",
        inStock: true,
        rating: 4.7,
        reviews: 95
      },
      {
        id: 3,
        name: "Vitamin C Serum",
        price: 45.99,
        description: "Brightening serum with stable Vitamin C to even skin tone and boost collagen production.",
        category: "serum",
        image: "/images/serum.jpeg",
        inStock: true,
        rating: 4.6,
        reviews: 203
      },
      {
        id: 4,
        name: "Night Repair Cream",
        price: 38.99,
        description: "Overnight repair cream that works while you sleep to restore and rejuvenate your skin.",
        category: "nightcream",
        image: "/images/nightcream.jpeg",
        inStock: true,
        rating: 4.4,
        reviews: 87
      },
      {
        id: 5,
        name: "SPF 50 Sunscreen",
        price: 28.99,
        description: "Broad-spectrum sunscreen that protects against UVA and UVB rays without leaving a white cast.",
        category: "sunscreen",
        image: "/images/sunscreen.jpeg",
        inStock: true,
        rating: 4.3,
        reviews: 156
      },
      {
        id: 6,
        name: "Hydrating Toner",
        price: 22.99,
        description: "Alcohol-free toner that balances pH and preps skin for better product absorption.",
        category: "toner",
        image: "/images/toner.jpeg",
        inStock: true,
        rating: 4.2,
        reviews: 73
      },
      {
        id: 7,
        name: "Detox Face Mask",
        price: 26.99,
        description: "Purifying clay mask that draws out impurities and leaves skin feeling refreshed.",
        category: "facemask",
        image: "/images/facemask.jpeg",
        inStock: true,
        rating: 4.5,
        reviews: 112
      },
      {
        id: 8,
        name: "Eye Cream",
        price: 34.99,
        description: "Targeted eye cream that reduces puffiness and fine lines around the delicate eye area.",
        category: "eyecream",
        image: "/images/eyecream.jpeg",
        inStock: true,
        rating: 4.4,
        reviews: 89
      },
      {
        id: 9,
        name: "Hair Growth Serum",
        price: 42.99,
        description: "Scalp serum that promotes healthy hair growth and strengthens hair follicles.",
        category: "hair",
        image: "/images/hase.jpeg",
        inStock: true,
        rating: 4.1,
        reviews: 67
      }
    ];
    await fs.writeFile(productsFile, JSON.stringify(initialProducts, null, 2));
  }
};

// Get all products
router.get('/', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeProducts();
    
    const data = await fs.readFile(productsFile, 'utf8');
    const products = JSON.parse(data);
    
    // Filter by category if provided
    const { category } = req.query;
    if (category) {
      const filteredProducts = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
      return res.json(filteredProducts);
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeProducts();
    
    const data = await fs.readFile(productsFile, 'utf8');
    const products = JSON.parse(data);
    
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error reading product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeProducts();
    
    const data = await fs.readFile(productsFile, 'utf8');
    const products = JSON.parse(data);
    
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: req.body.name,
      price: parseFloat(req.body.price),
      description: req.body.description,
      category: req.body.category,
      image: req.body.image || '/images/default.jpeg',
      inStock: req.body.inStock !== undefined ? req.body.inStock : true,
      rating: req.body.rating || 0,
      reviews: req.body.reviews || 0
    };
    
    products.push(newProduct);
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeProducts();
    
    const data = await fs.readFile(productsFile, 'utf8');
    const products = JSON.parse(data);
    
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    products[productIndex] = {
      ...products[productIndex],
      ...req.body,
      id: parseInt(req.params.id) // Ensure ID doesn't change
    };
    
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
    
    res.json(products[productIndex]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await ensureDataDir();
    await initializeProducts();
    
    const data = await fs.readFile(productsFile, 'utf8');
    const products = JSON.parse(data);
    
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
    
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router; 