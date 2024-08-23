

import express from "express";
import { 
    createAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment
}  from '../../controllers/socialWorker/appointmentController.js';

const router = express.Router();

router
    .route('/Create_Appointment')
    .post(createAppointment)

router
    .route('/getAppointment')
    .get(getAppointment)

router
    .route('/Update_Appointment/:appointmentId')
    .patch(updateAppointment)

router
    .route('/Delete_Appointment/:appointmentId')
    .delete(deleteAppointment);

export default router;