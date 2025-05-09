import db from "../db/database.js";


/** 
 * Récupère tous les articles de la base de données.
 * @returns {Promise<Array>} Un tableau contenant tous les objets item de la table.
 */
export const getAllItems = async () => {
 const [rows] = await db.query('SELECT * FROM items');
return rows;
};


/**
* Créer un nouvel article dans la base de donée
* @param {string} name - Le nom de l'article.
* @param {number} price - Le prix de l'article.
* @param {string} description - Une description de l'article.
* @param {number} user_id - L'identifiant de l'dministrateur ayant créé l'article
* @returns {Promise<Object>} Résultat de l'opération
*/
export const createItem = async (name, price, description, user_id) => {
const sql = 'INSERT INTO items (name, price, description, user_id) VALUES (?, ?, ?, ?)';
const [result] = await db.query(sql, [name, price, description, user_id]);
return result;
};


/**
* Fonction pour récupèrer un article selon son ID
* @param {number} id - L'identifiant unique de l'article.
* @returns {Promise<Object|null>} L'article correspondant à id ou null s'il n'existe pas
*/
export const getItemById = async (id) => {
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [id]);
    return rows[0];
};


/**
 * Fonction pour mettre à jour les informations d'un article existant.
 * @param {number} id - L'ID de l'article à modifier
 * @param {string} name - Le nouveau nom
 * @param {number} price - Le nouveau prix
 * @param {string} description - La nouvelle description
 * @returns {Promise<Object|null>} L'article modifià à partir de son id ou null s'il n'existe pas
 */
export const updateItem = async (id, name, price, description) => {
const sql = 'UPDATE items SET name = ?, price = ?, description = ? WHERE id = ?';
const [result] = await db.query(sql, [name, price, description, id]);

return result;
};
/**
* Fonction pour supprimer un article de la base de donées
* @param {number} id - L'ID de l'article à modifier
* @returns {Promise<Object>} Résultat de l'opération DELETE
*/
export const deleteItem=async(id)=>{
    const sql = 'DELETE FROM items WHERE id = ?';
    const [result] = await db.query(sql, [id]);
    return result;
}