import Rental from '../models/Rental.js';

// @desc    Get all rentals
// @route   GET /api/rentals
// @access  Private
export const getRentals = async (req, res) => {
    res.status(200).json({ message: 'Get all rentals' });
};

// @desc    Create a rental
// @route   POST /api/rentals
// @access  Private
export const createRental = async (req, res) => {
    res.status(200).json({ message: 'Create rental' });
};
