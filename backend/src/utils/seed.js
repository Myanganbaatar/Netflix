import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Rental from '../models/Rental.js';

// Configuration pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
// Adjusted path to look for .env in backend root
dotenv.config({ path: join(__dirname, '../../.env') });

const seedDatabase = async () => {
    try {
        console.log('Connecting to DB...');
        // Connexion à la base de données
        await connectDB();

        // Charger les données de films
        // Adjusted path to look for data/movies.json in workspace root
        // If workspace root is c:\Users\Dell\Netflix
        // and __dirname is c:\Users\Dell\Netflix\backend\src\utils
        // then ../../../ brings us to c:\Users\Dell\Netflix
        const moviesPath = join(__dirname, '../../../data/movies.json');
        
        console.log(`Reading movies from: ${moviesPath}`);

        if (!existsSync(moviesPath)) {
             throw new Error(`Movies data file not found at ${moviesPath}. Please check the path and file existence.`);
        }

        const fileContent = readFileSync(moviesPath, 'utf-8');
        // Simple check to remove BOM if present
        const cleanContent = fileContent.replace(/^\uFEFF/, ''); 

        let moviesData = JSON.parse(cleanContent);

        // Transform data to match schema if necessary
        moviesData = moviesData.map(movie => {
            // Fix genre: convert string to array if it's a string
            if (typeof movie.genre === 'string') {
                movie.genre = [movie.genre];
            }
            // Ensure other fields are present or default
            return movie;
        });

        console.log('🗑️ Nettoyage de la base de données...');

        // Supprimer toutes les données existantes
        await User.deleteMany({});
        await Movie.deleteMany({});
        await Rental.deleteMany({});

        console.log('✅ Base de données nettoyée');

        // Créer un utilisateur admin
        console.log('👤 Création de l\'utilisateur admin...');
        const adminEmail = 'admin@netflix.com';
        
        const admin = await User.create({
            name: 'Admin Netflix',
            email: adminEmail,
            password: 'admin123',
            role: 'admin'
        });
        console.log(`✅ Admin créé: ${admin.email}`);
        
        // Créer des utilisateurs de test
        console.log('👥 Création des utilisateurs de test...');
        const users = await User.create([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'password123'
            },
            {
                name: 'Bob Martin',
                email: 'bob@example.com',
                password: 'password123'
            }
        ]);
        console.log(`✅ ${users.length} utilisateurs créés`);

        // Insérer les films
        console.log('🎬 Insertion des films...');
        const movies = await Movie.insertMany(moviesData);
        console.log(`✅ ${movies.length} films insérés`);

        // Créer quelques locations de test
        console.log('📦 Création de locations de test...');
        
        if (users.length > 0 && movies.length >= 3) {
            const rentals = await Rental.create([
                {
                    user: users[0]._id,
                    movie: movies[0]._id,
                    price: movies[0].price,
                    rentalDate: new Date(),
                    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                },
                {
                    user: users[0]._id,
                    movie: movies[1]._id,
                    price: movies[1].price,
                    rentalDate: new Date(),
                    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                },
                {
                    user: users[1]._id,
                    movie: movies[2]._id,
                    price: movies[2].price,
                    rentalDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                    expiryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                    status: 'expired'
                }
            ]);
            console.log(`✅ ${rentals.length} locations créées`);
            
            // Mettre à jour le compteur de location des films
            await movies[0].incrementRentalCount();
            await movies[1].incrementRentalCount();
            await movies[2].incrementRentalCount();
            
            console.log('\n📊 Résumé:');
            console.log(` - Admin: admin@netflix.com / admin123`);
            console.log(` - Users: ${users.length}`);
            console.log(` - Movies: ${movies.length}`);
            console.log(` - Rentals: ${rentals.length}`);
        }
        
        console.log('\n🎉 Base de données initialisée avec succès!');
        process.exit(0);

    } catch (error) {
        console.error(`❌ Erreur lors du seed: ${error.message}`);
        console.error(error);
        process.exit(1);
    }
};

// Exécuter le seed
seedDatabase();
