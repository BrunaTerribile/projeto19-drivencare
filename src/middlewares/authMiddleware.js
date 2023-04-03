import errors from "../errors/index.js";
import doctorRepositories from "../repositories/doctorRepositories.js";
import jwt from "jsonwebtoken";
import patientRepositories from "../repositories/patientRepositories.js";

async function authDoctorValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw errors.unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw errors.unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw errors.unauthorizedError();

  jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    try {
      if (error !== null) throw errors.unauthorizedError();

      const {rows: [user]} = await doctorRepositories.findById(decoded.id);
      if (!user) throw errors.unauthorizedError();

      res.locals.user = user;

      next();
    } catch (err) {
      next(err);
    }
  });
}

async function authPatientValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw errors.unauthorizedError();
  
  const parts = authorization.split(" ");
  if (parts.length !== 2) throw errors.unauthorizedError();
  
  const [schema, token] = parts;
  if (schema !== "Bearer") throw errors.unauthorizedError();
  
  jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    try {
      if (error !== null) throw errors.unauthorizedError();
  
      const {rows: [user]} = await patientRepositories.findById(decoded.id);
      if (!user) throw errors.unauthorizedError();
  
      res.locals.user = user;
  
      next();
    } catch (err) {
      next(err);
    }
  });
}

export default { authDoctorValidation, authPatientValidation };