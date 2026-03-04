import express from 'express';
import { getRentals, createRental } from '../controllers/rental.controller.js';

const router = express.Router();

router.get('/', getRentals);
router.post('/', createRental);

export default router;
