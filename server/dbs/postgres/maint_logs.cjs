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
        return { record: rows[0] }
        //console.log(`Made it to about to call the DB, data: ${name} and path: ${imgData}`)
        //return { test: "test Was made"}
    },
    getImageFromDB: async(id) =>{

        const query=`SELECT name, data FROM images WHERE id=$1`;
        const values = [id];

        const {rows} = await db.query(query, values);
        if(rows.length === 0) throw new Error("Image not foun in DB")
        
       
        return rows[0];
    },
    getImages: async () =>{
        const query = `SELECT * FROM images ORDER BY id ASC`;
        const{ rows} = await db.query(query);

        if(rows.length === 0){
            console.Error("Not able to get images from DB ")
        }
        return rows;

    }

}

module.exports = maintenanceLogs;