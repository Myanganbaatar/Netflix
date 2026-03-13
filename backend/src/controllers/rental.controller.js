import Rental from '../models/Rental.js';
import Movie from '../models/Movie.js';
import User from '../models/User.js';

// @desc    Louer un film
// @route   POST /api/rentals
// @access  Private
export const createRental = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        // Pour l'instant, on suppose que l'utilisateur est authentifié et req.user contient ses infos
        // Si pas de middleware auth, on pourrait prendre userId dans le body pour tester
        const userId = req.user ? req.user._id : req.body.userId; 

        if (!userId) {
             return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
        }

        // Vérifier si le film existe
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Film non trouvé' });
        }

        // Vérifier si le film est disponible
        if (!movie.isAvailable) {
            return res.status(400).json({ success: false, message: 'Film non disponible à la location' });
        }

        // Vérifier si l'utilisateur a déjà loué ce film (actives uniquement)
        const existingRental = await Rental.findOne({
            user: userId,
            movie: movieId,
            status: 'active'
        });

        if (existingRental) {
            return res.status(400).json({ success: false, message: 'Vous avez déjà une location en cours pour ce film' });
        }

        // Créer la location
        const rental = await Rental.create({
            user: userId,
            movie: movieId,
            price: movie.price
        });

        // Mettre à jour le compteur de locations du film
        movie.rentalCount += 1;
        await movie.save();

        res.status(201).json({
            success: true,
            data: rental
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir les locations d'un utilisateur
// @route   GET /api/rentals/my-rentals
// @access  Private
export const getMyRentals = async (req, res, next) => {
    try {
        const userId = req.user ? req.user._id : req.query.userId; // Fallback pour test sans auth
        const { status } = req.query;

        if (!userId) {
             return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
        }

        let query = { user: userId };
        
        // Filtrer par status si fourni (ex: ?status=active)
        if (status) {
            query.status = status;
        }

        const rentals = await Rental.find(query)
            .populate('movie', 'title poster description')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: rentals.length,
            data: rentals
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir toutes les locations (admin)
// @route   GET /api/rentals
// @access  Private/Admin
export const getAllRentals = async (req, res, next) => {
    try {
        const rentals = await Rental.find()
            .populate('user', 'name email')
            .populate('movie', 'title price')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: rentals.length,
            data: rentals
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Annuler une location
// @route   DELETE /api/rentals/:id
// @access  Private
export const cancelRental = async (req, res, next) => {
    try {
        const rental = await Rental.findById(req.params.id);

        if (!rental) {
            return res.status(404).json({ success: false, message: 'Location non trouvée' });
        }

        // Vérifier que c'est bien la location de l'utilisateur ou admin
        // Note: req.user peut être undefined si pas d'auth middleware active
        if (req.user && rental.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Non autorisé' });
        }

        // On ne supprime pas physiquement, on change le statut ou on supprime si demandé
        // Ici on suppose une "annulation" = suppression ou changement de statut
        // Le user a demandé "DELETE /api/rentals/:id"
        // Si on suit la logique "soft delete" ou "cancel":
        rental.status = 'cancelled';
        await rental.save();
        
        // Ou suppression physique: await rental.deleteOne();
        // Le prompt dit "Annuler une location" -> status cancelled semble mieux, mais verb DELETE souvent supprime.
        // Je vais laisser en 'cancelled'.

        res.status(200).json({
            success: true,
            data: rental,
            message: 'Location annulée'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir les statistiques des locations
// @route   GET /api/rentals/stats
// @access  Private/Admin
export const getRentalStats = async (req, res, next) => {
    try {
        const stats = await Rental.aggregate([
            {
                $group: {
                    _id: null,
                    totalRentals: { $sum: 1 },
                    totalRevenue: { $sum: '$price' },
                    avgPrice: { $avg: '$price' },
                    activeRentals: {
                        $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
                    },
                    cancelledRentals: {
                        $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: stats.length > 0 ? stats[0] : null
        });
    } catch (error) {
        next(error);
    }
};
