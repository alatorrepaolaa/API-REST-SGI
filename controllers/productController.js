// productController.js
const Product = require('../models/Product');

// Array para simular una base de datos
let products = [];

exports.createProduct = (req, res) => {
  const { name, description, price, quantity } = req.body;
  const id = products.length + 1;
  const newProduct = new Product(id, name, description, price, quantity);
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json(product);
  }
};

exports.updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price, quantity } = req.body;
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    products[index] = { ...products[index], name, description, price, quantity };
    res.json(products[index]);
  }
};

exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    products.splice(index, 1);
    res.sendStatus(204);
  }
};

exports.searchProductsByName = (req, res) => {
  const query = req.query.q.toLowerCase();
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
  res.json(filteredProducts);
};

exports.calculateInventoryValue = (req, res) => {
  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  res.json({ totalValue: totalValue });
};

exports.sortProductsByPrice = (req, res) => {
  const order = req.params.order.toLowerCase();
  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ message: 'Invalid order parameter. Use "asc" or "desc".' });
  }
  const sortedProducts = [...products].sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
  res.json(sortedProducts);
};

exports.filterProductsByQuantity = (req, res) => {
  const quantity = parseInt(req.params.quantity);
  const filteredProducts = products.filter(p => p.quantity > quantity);
  res.json(filteredProducts);
};
