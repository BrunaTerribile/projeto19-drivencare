import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import errors from '../errors/index.js'
import "dotenv/config"
import patientRepositories from '../repositories/patientRepositories.js';

async function create({name, email, password}){
    const {rowsCount} = await patientRepositories.findByEmail(email) //verifica se esse email já está cadastrado
    if(rowsCount) throw errors.duplicatedEmailError(email);

    const hashPassword = await bcrypt.hash(password, 10);
    await patientRepositories.create({name, email, password: hashPassword});
}

async function signin({email, password}){
    const {rowCount, rows: [user]} = await patientRepositories.findByEmail(email) //verifica se esse email existe no banco
    if(!rowCount) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw errors.invalidCredentialsError();

    const token = jwt.sign({id: user.id}, process.env.SECRET_JWT, {expiresIn: 86400}); //a chave secreta é um hash SHA1

    return token;
}

export default {
    create,
    signin
}