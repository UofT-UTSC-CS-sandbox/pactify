// routes/homeRoutes.js
import express from 'express';
import { userAuth } from '../auth/auth.js';

const router = express.Router();

router.get('/home', userAuth, (req, res) => {});

export default router;