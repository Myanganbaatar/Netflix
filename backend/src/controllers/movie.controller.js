import Movie from '../models/Movie.js';
import Rental from '../models/Rental.js';

// @desc    Obtenir tous les films
// @route   GET /api/movies
// @access  Public
export const getAllMovies = async (req, res, next) => {
    try {
        // Extraction des paramètres de requête avec valeurs par défaut pour la pagination
        const { search, genre, year, sort, page = 1, limit = 10 } = req.query;
        let query = {};

        // Filtre de recherche (titre ou description)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filtre par genre
        if (genre) {
            query.genre = genre;
        }

        // Filtre par année
        if (year) {
            query.year = parseInt(year);
        }

        // Initialisation de la requête
        let moviesQuery = Movie.find(query);

        // Gestion du tri
        if (sort) {
            const sortBy = sort.split(',').join(' ');
            moviesQuery = moviesQuery.sort(sortBy);
        } else {
            moviesQuery = moviesQuery.sort('-createdAt');
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        moviesQuery = moviesQuery.skip(skip).limit(limitNum);

        // Exécution de la requête
        const movies = await moviesQuery;

        // Comptage total pour la pagination
        const total = await Movie.countDocuments(query); // Compte total des documents correspondant aux filtres

        res.status(200).json({
            success: true,
            count: movies.length,
            total,
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
            data: movies
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir un film par ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: movie
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Créer un nouveau film
// @route   POST /api/movies
// @access  Private/Admin
export const createMovie = async (req, res, next) => {
    try {
        const { title, description, poster, backdrop, genre, year, duration, price, rating } = req.body;

        const movie = await Movie.create({
            title,
            description,
            poster,
            backdrop,
            genre,
            year,
            duration,
            price,
            rating
        });

        res.status(201).json({
            success: true,
            data: movie
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Modifier un film
// @route   PUT /api/movies/:id
// @access  Private/Admin
export const updateMovie = async (req, res, next) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Retourner le document modifié
                runValidators: true // Exécuter les validations
            }
        );

        if (!updatedMovie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedMovie
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer un film
// @route   DELETE /api/movies/:id
// @access  Private/Admin
export const deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouvé'
            });
        }

        // Vérifiez qu’il n’y ait pas de locations
        const hasRentals = await Rental.exists({ movie: req.params.id });
        if (hasRentals) {
            return res.status(400).json({
                success: false,
                message: 'Impossible de supprimer ce film car il a des locations associées.'
            });
        }

        await movie.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir les statistiques des films
// @route   GET /api/movies/stats
// @access  Private/Admin
export const getMovieStats = async (req, res, next) => {
    try {
        const stats = await Movie.aggregate([
            {
               $unwind: "$genre"
            },
            {
                $group: {
                    _id: '$genre',
                    avgRating: { $avg: '$rating' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        const totalRevenue = await Movie.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: { $multiply: ['$price', '$rentalCount'] } }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            count: stats.length,
            totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
            data: stats
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir des films similaires
// @route   GET /api/movies/:id/similar
// @access  Public
export const getSimilarMovies = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouvé'
            });
        }

        // Trouver des films du même genre
        const similarMovies = await Movie.find({
            genre: { $in: movie.genre },
            _id: { $ne: movie._id }, // Exclure le film actuel
            isAvailable: true
        })
        .sort({ rating: -1 })
        .limit(6);

        res.status(200).json({
            success: true,
            count: similarMovies.length,
            data: similarMovies
        });
    } catch (error) {
        next(error);
    }
};
