// src/routes/product.routes.js

const router = require('express').Router();
const { 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProduct, 
    getProducts 
} = require('../controller/product.controller');
const { protect, authorize } = require('../middleware/auth');
const { ROLES } = require('../utils/roles');

// PUBLIC ROUTES
router.get('/', getProducts);      // Route to get all products
router.get('/:id', getProduct);    // Route to get a single product

// ADMIN-ONLY ROUTES
router.post('/', protect, authorize(ROLES.ADMIN), createProduct);
router.put('/:id', protect, authorize(ROLES.ADMIN), updateProduct);
router.delete('/:id', protect, authorize(ROLES.ADMIN), deleteProduct);

module.exports = router;