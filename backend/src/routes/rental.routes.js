import express from 'express';
import {
  getAllRentals,
  getMyRentals,
  getRentalStats,
  createRental,
  cancelRental
} from '../controllers/rental.controller.js';

const router = express.Router();

// GET /api/rentals/my-rentals ➔ Toutes les locations de l’utilisateur connecté
router.get('/my-rentals', getMyRentals);

// GET /api/rentals/stats ➔ Stat sur les locations
router.get('/stats', getRentalStats);

// GET /api/rentals/ ➔ Toutes les locations
router.get('/', getAllRentals);

// POST /api/rentals ➔ Création d’une location pour l’utilisateur connecté
router.post('/', createRental);

// DELETE /api/rentals/xxx ➔ Supprimer la location
router.delete('/:id', cancelRental);

export default router;
