import bcrypt from 'bcrypt';
import doctorRepositories from '../repositories/doctorRepositories.js';
import jwt from 'jsonwebtoken';

async function create({name, email, password, specialty, location}){
    const {rowsCount} = await doctorRepositories.findByEmail(email) //verifica se esse email já está cadastrado
    if(rowsCount) throw new Error("User already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    await doctorRepositories.create({name, email, password: hashPassword, specialty, location});
}

async function signin({email, password}){
    const {rowCount, rows: [user]} = await doctorRepositories.findByEmail(email) //verifica se esse email existe no banco
    if(!rowCount) throw new Error("Incorrect email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw new Error("Incorrect email or password")

    const token = jwt.sign({id: user.id}, process.env.SECRET_JWT, {expiresIn: 86400}); //a chave secreta é um hash SHA1

    return token;
}

export default {
    create,
    signin
}