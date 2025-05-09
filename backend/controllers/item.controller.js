import {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
} from '../model/item.model.js';

/**
 * Contrôleur pour récuperer tous les articles
 * Méthode : POST
 * Route : /items
 * Réponse : 200 avec la liste d'articles, 500 en cas d'erreur serveur
 */
export const getItemsController = async (req, res) => {
    try {
        const items = await getAllItems();
        res.status(200).json({ success: true, data: items });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: err.message });

    }

}
/*
 * Contrôleur pour créer un nouvel article.
 * Méthode : POST
 * En-têtes requis x-role: "admin"
 * Route : /items
 * Corps attendu : { name, price, description (optionnel), user_id }
 * Réponse : 201 avec ID de l'article créé, 400 si un champ manque ou si le champ price est invalide, 500 en cas d'erreur serveur.
 */
export const createItemController = async (req, res) => {
    const { name, price, description, user_id } = req.body;
    if (!name || !price || !user_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const priceNum = Number(price);
    if (!Number.isFinite(priceNum) || priceNum <= 0) {

        return res.status(400).json({ message: 'Price must be a valid positive number' });

    }
    try {
        const result = await createItem(name, price, description, user_id);
        res.status(201).json({ message: 'Item created', itemId: result.insertId });


    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error: error.message });

    }

};

/*
 * Contrôleur pour récuperer un article selon son ID.
 * Méthode : GET
 * Route : /items/:id
 * Réponse : 200 avec l'artice, 404 si l'article n'est pas trouvé, 500 en cas d'erreur serveur.
 */
export const getItemController = async (req, res) => {
    try {
        const item = await getItemById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching item', error: err.message });
    };

};

/**
 * Contrôleur pour modifier un article selon son ID
 * Méthode : PUT
 * En-têtes requis x-role: "admin"
 * Route : /items/:id
 * * Réponse : 200, 404 si l'article n'est pas trouvé, 500 en cas d'erreur serveur 
 */
export const updateItemController = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const result = await updateItem(req.params.id, name, price, description);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating item', error: err.message });
    }
};

/*
 * Contrôleur pour supprimer un article selon son ID.
 * Méthode : DELETE
 * En-têtes requis x-role: "admin"
 * Route : /items/:id
 * Réponse : 200, 404 si l'article n'est pas trouvé, 500 en cas d'erreur serveur 
 
 */
export const deleteItemController = async (req, res) => {
    try {
        const result = await deleteItem(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: err.message });

    }
}