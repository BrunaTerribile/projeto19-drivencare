import doctorServices from "../services/doctorServices.js";

async function create(req, res, next){
    const { name, email, password, specialty, location } = req.body;

    try {
        await doctorServices.create({name, email, password, specialty, location});
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function signin(req, res, next){
    const { email, password } = req.body;

    try {
        const token = await doctorServices.signin({email, password})
        return res.send({ token });
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next){
    try {
        const medicalTeam = await doctorServices.getAll();
        return res.json(medicalTeam);
    } catch (err) {
        next(err);
    }
}

async function getBySpecialty(req, res, next){
    try {
        const specialty = req.query.q
        if(!specialty || specialty.lenght < 3) return res.sendStatus(422);

        const specialtySuggestion = await doctorServices.searchSpecialty(specialty);
        return res.json(specialtySuggestion);
    } catch (err) {
        next(err);
    }
}

async function getByLocation(req, res, next){
    try {
        const location = req.query.q
        if(!location || location.lenght < 3) return res.sendStatus(422);

        const locationSuggestion = await doctorServices.searchLocation(location);
        return res.json(locationSuggestion);
    } catch (err) {
        next(err);
    }
}

export default {
    create,
    signin,
    getAll,
    getBySpecialty,
    getByLocation
}