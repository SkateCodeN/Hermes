const db = require('./CRUD.cjs')
const fs = require('fs');

const maintenanceLogs = {
    //Read and get all items on DB
    getAll: async () =>{
        const query = 'SELECT * FROM log ORDER BY id ASC';
        const{ rows} = await db.query(query);

        return rows;

    },
    // Create an entry
    create: async (data) => {
        const{date,maintenanceList,miles} = data;
        const query = `
            INSERT INTO log (date, maintenance,miles)
            VALUES ($1, $2, $3) RETURNING *;
        `;
        const values = [date, maintenanceList, miles]
        const{ rows} = await db.query(query, values);

        return rows[0];
    },

    //Update the entry
    update: async(data) => {
        const{date,maintenance,miles,id} = data;
        const query = `
            UPDATE log
            SET date = $1, maintenance = $2, miles = $3
            WHERE id = $4 RETURNING *;
        `;

        const values = [date, maintenance, miles, id];

        const{ rows} = await db.query(query,values);

        return rows[0];
    },
    delete: async(id) => {

        const query =`
            DELETE FROM log
            WHERE id = $1 RETURNING *;
        `;

        const values = [id];
        const {rows} = await db.query(query, values);

        return rows[0];
    },
    uploadImage: async(data) =>{
        const{name,imgData} = data;

        const query =`INSERT INTO images (name,data) VALUES ($1, $2)`;
        // imgData is a path
        const imgDataBinary = fs.readFileSync(imgData);
        const values = [name, imgDataBinary]
        const {rows} = await db.query(query,values);
        return rows[0]
    },
    getImageFromDB: async(id) =>{

        const query=`SELECT name, data FROM images WHERE id=$1`;
        const values = [id];

        const {rows} = await db.query(query, values);

        return rows[0];
    },

}

module.exports = maintenanceLogs;