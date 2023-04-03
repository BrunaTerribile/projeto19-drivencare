import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { patientSchema } from "../schemas/Patient.js";
import patientControllers from "../controllers/patientControllers.js";

const patientRoutes = Router();

patientRoutes.post('/signup', validateSchema(patientSchema), patientControllers.create)
patientRoutes.post('/signin', patientControllers.signin)

export default patientRoutes;