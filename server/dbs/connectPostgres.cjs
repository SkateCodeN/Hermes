const {Pool} = require ("pg");
//is the same as import {pool} from "pg"

//Import .env variables
require('dotenv').config();


const pool = new Pool({
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

const connected = () =>
{
    console.log('Connected to the PostgreSQL database');
}
//pool.on("connect", connected);
pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
  });
  

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});



module.exports = {
    query: async (text, params) => {
      try {
        console.log(`Executing query: ${text}`);
        const res = await pool.query(text, params);
        return res;
      } catch (err) {
        console.error('Error executing query:', err);
        throw err;
      }
    },
  };