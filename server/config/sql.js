import mysql2 from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();

const sql = mysql2.createConnection({
    host: process.env.DEV_HOST,
    user: process.env.DEV_USER,
    password: null || process.env.DEV_PASSWORD,
    database: process.env.DEV_DB
});

sql.connect(error => {
    if (error) throw error; 
    console.log("Successfully connected to the database.");
});

export default sql; 
