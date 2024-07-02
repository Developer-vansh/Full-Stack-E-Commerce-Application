import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

import { authenticateUser, checkAdmin } from '../middlewares/auth.middleware.js';

const router = Router();


router.get('/products',getProducts);
router.get('/products/:id',getProduct);
router.post('/products', authenticateUser, checkAdmin, createProduct);
router.put('/products/:id', authenticateUser, checkAdmin, updateProduct);
router.delete('/products/:id', authenticateUser, checkAdmin,deleteProduct);

export default router;