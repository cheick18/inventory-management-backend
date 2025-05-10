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
* @param {string} NAME - Le nom de l'article.
* @param {number} PRICE - Le prix de l'article.
* @param {string} DESCRIPTION - Une description de l'article.
* @param {number} USER_ID - L'identifiant de l'dministrateur ayant créé l'article
* @returns {Promise<Object>} L'article ajouté
*/
export const createItem = async (USER_ID, NAME, PRICE, DESCRIPTION) => {
    const sql = 'INSERT INTO items (USER_ID, NAME, PRICE, DESCRIPTION) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [USER_ID, NAME, PRICE, DESCRIPTION]);
    const insertedId = result.insertId;
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [insertedId]);
    return rows[0];
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
 * @param {number} ID - L'ID de l'article à modifier
 * @param {string} NAME - Le nouveau nom
 * @param {number} PRICE - Le nouveau prix
 * @param {string} DESCRIPTION - La nouvelle description
 * @returns {Promise<Object|null>} L'article modifié à partir de son id ou null s'il n'existe pas
 */
export const updateItem = async (ID, NAME, PRICE, DESCRIPTION) => {
    const sql = 'UPDATE items SET NAME = ?, PRICE = ?, DESCRIPTION = ? WHERE id = ?';
    const [result] = await db.query(sql, [NAME, PRICE, DESCRIPTION, ID]);
    if (result.affectedRows === 0) return null
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [ID]);
    return rows[0];

};
/**
* Fonction pour supprimer un article de la base de donées
* @param {number} id - L'ID de l'article à modifier
* @returns {Promise<Object>} Résultat de l'opération DELETE
*/
export const deleteItem = async (id) => {
    const sql = 'DELETE FROM items WHERE id = ?';
    const [result] = await db.query(sql, [id]);
    return result;
}