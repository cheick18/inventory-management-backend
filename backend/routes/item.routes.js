import express from 'express'

import {
    getItemsController,
    createItemController,
    getItemController,
    updateItemController,
    deleteItemController

} from '../controllers/item.controller.js'
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

/** 
 * Endpoints accessibles par le customer et admin */
router.get('/:id', getItemController);
router.get('/', getItemsController)
router.get('/:id', getItemController);

/** 
 * Endpoints réservés à l'admin */
router.post('/', checkRole, createItemController);
router.delete('/:id',checkRole, deleteItemController);
router.put('/:id', checkRole, updateItemController);

export default router;