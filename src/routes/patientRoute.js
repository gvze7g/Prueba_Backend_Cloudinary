import {Router} from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import {uploadProfilePicture} from '../controllers/patientController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

import{
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
}from '../controllers/patientController.js';

const router = Router();

router.get(
    '/',
    authMiddleware,
    getPatients
);

router.get(
    '/:id',
    authMiddleware,
    getPatientById
);

router.put(
    '/:id',
    authMiddleware,
    updatePatient
);

router.delete(
    '/:id',
    authMiddleware,
    deletePatient
);

router.post(
    '/upload/:id',
    authMiddleware,
    upload.single('profilePicture'),
    uploadProfilePicture
);

export default router;