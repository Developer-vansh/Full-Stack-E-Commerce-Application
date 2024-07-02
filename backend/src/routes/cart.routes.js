import { Router } from 'express';
import { getCart, addItemToCart, removeItemFromCart } from '../controllers/cart.controller.js';
import { authenticateUser} from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/cart', authenticateUser, getCart);
router.post('/cart', authenticateUser, addItemToCart);
router.delete('/cart/:id', authenticateUser, removeItemFromCart);

export default router;