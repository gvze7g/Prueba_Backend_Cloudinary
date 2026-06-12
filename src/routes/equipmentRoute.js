import {Router} from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import {uploadImage} from '../controllers/equipmentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

import{
    createEquipment,
    getEquipments,
    getEquipmentById,
    updateEquipment,
    deleteEquipment
}from '../controllers/equipmentController.js';

const router = Router();

router.post(
    '/',
    authMiddleware,
    createEquipment
)

router.get(
    '/',
    authMiddleware,
    getEquipments
);

router.get(
    '/:id',
    authMiddleware,
    getEquipmentById
);

router.put(
    '/:id',
    authMiddleware,
    updateEquipment
);

router.delete(
    '/:id',
    authMiddleware,
    deleteEquipment
);

router.post(
    '/upload/:id',
    authMiddleware,
    upload.single('image'),
    uploadImage
);

export default router;