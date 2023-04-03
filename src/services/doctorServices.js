import bcrypt from 'bcrypt';
import doctorRepositories from '../repositories/doctorRepositories.js';

async function create({name, email, password, specialty, location}){
    const {rowsCount} = await doctorRepositories.findByEmail(email) //verifica se esse email já está cadastrado
    if(rowsCount) return "Não"

    const hashPassword = await bcrypt.hash(password, 10);
    await doctorRepositories.create({name, email, password: hashPassword, specialty, location});
}

export default {
    create,
}