import connectionDb from "../config/database.js"

async function findByEmail(email){
    return await connectionDb.query(`
        SELECT * FROM doctors WHERE email = $1`, 
        [email]);
}

async function create({name, email, password, specialty, location}){
    await connectionDb.query(`
        INSERT INTO doctors (name, email, password, specialty, location)
        VALUES ($1, $2, $3, $4, $5)`, 
        [name, email, password, specialty, location]);
}

export default {
    findByEmail,
    create
}