const {Pool} = require ("pg");
//is the same as import {pool} from "pg"

//Import .env variables need to install dotenv 
require('dotenv').config();


const pool = new Pool({
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

module.exports = {
    query:(text,params) => pool.query(text,params),
};