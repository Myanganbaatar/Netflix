import Movie from '../models/Movie.js';

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
export const getMovies = async (req, res) => {
    res.status(200).json({ message: 'Get all movies' });
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
export const getMovie = async (req, res) => {
    res.status(200).json({ message: `Get movie ${req.params.id}` });
};
