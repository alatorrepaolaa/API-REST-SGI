// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, productController.createProduct);
router.get('/', verifyToken, productController.getAllProducts);
router.get('/:id', verifyToken, productController.getProductById);
router.put('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);
router.get('/search', verifyToken, productController.searchProductsByName);
router.get('/total-value', verifyToken, productController.calculateInventoryValue);
router.get('/sort/:order', verifyToken, productController.sortProductsByPrice);
router.get('/filter/:quantity', verifyToken, productController.filterProductsByQuantity);

module.exports = router;
