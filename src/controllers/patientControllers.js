import patientServices from "../services/patientServices";

async function create(req, res){
    const { name, email, password } = req.body;

    try {
        await patientServices.create({name, email, password});
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function signin(req, res){
    const { email, password } = req.body;

    try {
        const token = await patientServices.signin({email, password})
        return res.send({ token });
    } catch (err) {
        next(err);
    }
}

export default {
    create,
    signin
}