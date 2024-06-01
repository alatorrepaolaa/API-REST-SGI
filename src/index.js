/*const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'secret_key';

// Dummy database to store products
let products = [];

app.use(bodyParser.json());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Routes
app.post('/login', (req, res) => {
  // In a real scenario, you would authenticate the user here
  const username = req.body.username;
  // Dummy authentication, you should use a proper authentication mechanism
  if (username === 'admin') {
    const token = jwt.sign({ username: username }, SECRET_KEY);
    res.json({ token: token });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// CRUD operations

// Add a new product
app.post('/products', verifyToken, (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.status(201).json(product);
});

// Get all products
app.get('/products', verifyToken, (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/products/:id', verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json(product);
  }
});

// Update a product
app.put('/products/:id', verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  }
});

// Delete a product
app.delete('/products/:id', verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    products.splice(index, 1);
    res.sendStatus(204);
  }
});

// Search products by name
app.get('/products/search', verifyToken, (req, res) => {
  const query = req.query.q.toLowerCase();
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
  res.json(filteredProducts);
});

// Calculate total inventory value
app.get('/products/total-value', verifyToken, (req, res) => {
  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  res.json({ totalValue: totalValue });
});

// Sort products by price
app.get('/products/sort/:order', verifyToken, (req, res) => {
  const order = req.params.order.toLowerCase();
  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ message: 'Invalid order parameter. Use "asc" or "desc".' });
  }
  const sortedProducts = [...products].sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
  res.json(sortedProducts);
});

// Filter products by quantity in stock
app.get('/products/filter/:quantity', verifyToken, (req, res) => {
  const quantity = parseInt(req.params.quantity);
  const filteredProducts = products.filter(p => p.quantity > quantity);
  res.json(filteredProducts);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/

// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
