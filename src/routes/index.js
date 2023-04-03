import { Router } from "express";
import doctorRoutes from "./doctorRoutes.js";
import patientRoutes from "./patientRoutes.js"
import scheduleRoutes from "./scheduleRoutes.js"

const routes = Router();

routes.use('/doctors', doctorRoutes);
routes.use('/patients', patientRoutes);
routes.use('/schedule', scheduleRoutes)

export default routes;