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

async function findById(id) {
    return await connectionDb.query(`    
      SELECT * FROM doctors WHERE id = $1`,
      [id]);
}

async function getAll(){
    return await connectionDb.query(`    
        SELECT d.name, d.specialty, d.location 
        FROM doctors d`,
    );
}

async function getSpecialties(specialty){
    return await connectionDb.query(`    
        SELECT d.name, d.specialty, d.location
        FROM doctors d
        WHERE d.specialty ILIKE $1`,
    [`%${specialty}%`]);
}

async function getOptions(location){
    return await connectionDb.query(`    
        SELECT d.name, d.specialty, d.location
        FROM doctors d
        WHERE d.location ILIKE $1`,
    [`%${location}%`]);
}


export default {
    findByEmail,
    create,
    findById,
    getAll,
    getSpecialties,
    getOptions
}