import { Router } from "express";
import doctorControllers from "../controllers/doctorControllers.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { doctorSchema } from "../schemas/Doctor.js";

const doctorRoutes = Router();

doctorRoutes.post('/', validateSchema(doctorSchema), doctorControllers.create)
//doctorRoutes.get('/', doctorController.get)
//doctorRoutes.get('/:id', doctorController.put)

export default doctorRoutes;