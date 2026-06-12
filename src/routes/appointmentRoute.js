import {Router} from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import{
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}from '../controllers/appointmentController.js';

const router = Router();

router.post(
    '/',
    authMiddleware,
    createAppointment
)

router.get(
    '/',
    authMiddleware,
    getAppointments
);

router.get(
    '/:id',
    authMiddleware,
    getAppointmentById
);

router.put(
    '/:id',
    authMiddleware,
    updateAppointment
);

router.delete(
    '/:id',
    authMiddleware,
    deleteAppointment
);

export default router;