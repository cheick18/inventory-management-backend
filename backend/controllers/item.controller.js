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
    const { USER_ID, NAME, PRICE, DESCRIPTION } = req.body;
    if (!NAME || !PRICE || !USER_ID) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const priceNum = Number(PRICE);
    if (!Number.isFinite(priceNum) || priceNum <= 0) {

        return res.status(400).json({ success: false, message: 'Price must be a valid positive number' });

    }
    try {
        const item = await createItem(USER_ID, NAME, PRICE, DESCRIPTION);
        res.status(201).json({ success: true, data: item });


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
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, data: item });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching item', error: err.message });
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
    const { NAME, PRICE, DESCRIPTION } = req.body;
    if (!NAME || !PRICE) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const priceNum = Number(PRICE);
    if (!Number.isFinite(priceNum) || priceNum <= 0) {

        return res.status(400).json({ success: false, message: 'Price must be a valid positive number' });

    }

    try {


        const item = await updateItem(req.params.id, NAME, PRICE, DESCRIPTION);
        if (item == null) return res.status(404).json({ succes: false, message: 'Item not found' });

        res.status(200).json({ succes: true, data: item });
    } catch (err) {
        res.status(500).json({ succes: false, message: 'Error updating item', error: err.message });
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
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ succes: true, message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting item', error: err.message });

    }
}