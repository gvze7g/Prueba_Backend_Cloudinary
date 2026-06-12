import {Router} from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import{
    createMedicalRecord,
    getMedicalRecords,
    getMedicalRecordById,
    updateMedicalRecord,
    deleteMedicalRecord
}from '../controllers/medicalRecordController.js';

const router = Router();

router.post(
    '/',
    authMiddleware,
    createMedicalRecord
)

router.get(
    '/',
    authMiddleware,
    getMedicalRecords
);

router.get(
    '/:id',
    authMiddleware,
    getMedicalRecordById
);

router.put(
    '/:id',
    authMiddleware,
    updateMedicalRecord
);

router.delete(
    '/:id',
    authMiddleware,
    deleteMedicalRecord
);

export default router;