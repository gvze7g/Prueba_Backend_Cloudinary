import {Router} from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import{
    createSpeciality,
    getSpecialities,
    getSpecialityById,
    updateSpeciality,
    deleteSpeciality
}from '../controllers/SpecialtyController.js';

const router = Router();

router.post(
    '/',
    authMiddleware,
    createSpeciality
)

router.get(
    '/',
    authMiddleware,
    getSpecialities
);

router.get(
    '/:id',
    authMiddleware,
    getSpecialityById
);

router.put(
    '/:id',
    authMiddleware,
    updateSpeciality
);

router.delete(
    '/:id',
    authMiddleware,
    deleteSpeciality
);

export default router;