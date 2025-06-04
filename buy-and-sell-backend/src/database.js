import mysql, { escapeId } from 'mysql2';

let connection;

export const db = {
    connect:() => {
        connection = mysql.createConnection({
            // host: process.env.DB_HOST, // remove `host` if using socketPath
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            socketPath: process.env.DB_SOCKET
        });
        connection.connect();},
    query: (queryString, escapeValues) => 
        new Promise((resolve, reject)=>{
            connection.query(queryString, escapeValues, (error, results, field) => {
                if (error) reject(error);
                resolve({results, field});
            })
        }),
        end: () => connection.end(),
}