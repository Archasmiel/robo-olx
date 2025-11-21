import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let user = process.env.DB_USER;
let password = process.env.DB_PASS;
let dbname = process.env.DB_DB;

const connection = mysql.createConnection({
    host, user, password, port,
    database: dbname,
});

connection.connect(async (err) => {
    if (err) {
        console.error("Connect fail:" + err.stack);
        return;
    }
});

export default connection;
