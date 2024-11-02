import express from 'express';
import { protectedRoute } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/',protectedRoute,addToCart)

export default router