import doctorServices from "../services/doctorServices.js";

async function create(req, res){
    const { name, email, password, specialty, location } = req.body;

    try {
        await doctorServices.create({name, email, password, specialty, location})
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

async function signin(req, res){
    const { email, password } = req.body;

    try {
        const token = await doctorServices.signin({email, password})
        return res.send({ token });
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export default {
    create,
    signin
}