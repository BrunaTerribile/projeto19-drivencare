import { Router } from "express";
import doctorControllers from "../controllers/doctorControllers.js";

const doctorRoutes = Router();

doctorRoutes.post('/', doctorControllers.create)
//doctorRoutes.get('/', doctorController.get)
//doctorRoutes.get('/:id', doctorController.put)

export default doctorRoutes;