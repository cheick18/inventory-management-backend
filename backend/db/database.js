import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

/**
 * Fonction pour tester la connexion à la base de donées
*/
export const connectDb = async () => {
    try {
        const connection = await db.getConnection();
        await connection.ping();
        console.log('Connexion à la base de données réussie');
        connection.release();
    } catch (error) {
        console.error('Échec de la connexion à la base de données :', error.message);
        process.exit(1);
    }
};
export default db;
