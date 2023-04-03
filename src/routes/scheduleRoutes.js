import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import scheduleController from "../controllers/scheduleController.js";

const scheduleRoutes = Router();

scheduleRoutes.post('/', authMiddleware.authDoctorValidation, scheduleController.create)
scheduleRoutes.put('/', authMiddleware.authDoctorValidation, scheduleController.confirm)
scheduleRoutes.get('/', authMiddleware.authPatientValidation, scheduleController.getSchedule)
scheduleRoutes.post('/markdown', authMiddleware.authPatientValidation, scheduleController.markAppointment)
scheduleRoutes.get('/history', scheduleController.getHistory)

export default scheduleRoutes;