// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data store (instead of a database)
const products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
  { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics' },
  { id: 3, name: 'Headphones', price: 199.99, category: 'Accessories' },
  { id: 4, name: 'Monitor', price: 349.99, category: 'Electronics' },
  { id: 5, name: 'Keyboard', price: 89.99, category: 'Accessories' }
];

const users = [
  { id: 1, username: 'john_doe', email: 'john@example.com' },
  { id: 2, username: 'jane_smith', email: 'jane@example.com' },
  { id: 3, username: 'bob_johnson', email: 'bob@example.com' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    endpoints: [
      '/api/products',
      '/api/products/:id',
      '/api/products/category/:category',
      '/api/users',
      '/api/users/:id'
    ]
  });
});

// GET all products
app.get('/api/products', (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// GET products by category
app.get('/api/products/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  );
  
  if (filteredProducts.length === 0) {
    return res.status(404).json({
      success: false,
      error: `No products found in category: ${category}`
    });
  }
  
  res.status(200).json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts
  });
});

// GET all users
app.get('/api/users', (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET single user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Resource not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;