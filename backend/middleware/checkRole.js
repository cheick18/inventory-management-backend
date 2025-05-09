/**
 * Middleware pour vérifier si l'utilisateur est un administrateur
 * Utiliser dans les routes protégées (POST, PUT, DELETE sur /items)
 * @param {Object} req - L'objet de requête Express
 * @param {Object} res - L'objet de réponse Express
 * @param {Function} next - La fonction middleware suivante 
 * @return {void|Response} - Continue ou renvoie le message une erreur
 */

export const checkRole = (req, res, next) => {
    const userRole = req.headers['x-role'];
    if (!userRole) {
        return res.status(400).json({ message: 'Role is required in the request header' });
    }
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Only admins are allowed to modify items' });
    }
    next();
}