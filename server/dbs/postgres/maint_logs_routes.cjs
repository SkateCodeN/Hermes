const express = require('express');
const maintenanceLogs = require('./maint_logs.cjs');

const router = express.Router();

// GET ALL USERS ROUTE
router.get( '/', async (req, res) => {
    try {
        const records = await maintenanceLogs.getAll();
        res.json(records);
        //res.json({"message": "hello world"})
    }
    catch (error){
        console.error(error)

        res.status(500).json({ error: 'Failed to fetch maintenance logs' });
    }
    
});

//Create a new maintenance record
router.post( '/', async (req, res) => {
    try {
        const record= await maintenanceLogs.create(req.body);
        res.status(201).json(record);

    }
    catch (error){
        console.error(error)

        res.status(500).json({ error: 'Failed to create maintenance logs' });
    }
    
});

//Update Route
router.put("/:id", async (req,res) => {
    try{
        const {id} = req.params;

        const{date, maintenance,miles} = req.body;

        if(!date || !maintenance || !miles || !id){
            return res.status(400).json({error: "All the fields (date, maintenance, miles, id) are required"})
        }

        const updatedRecord = await maintenanceLogs.update({
            date,
            maintenance,
            miles,
            id: parseInt(id, 10),
        });

        if(!updatedRecord){
            return res.status(404).json({ error: 'Maintenance log not found' });
        }

        res.status(200).json({ message: 'Maintenance log updated successfully' });

    }
    catch(error){
        console.error(error)

        res.status(500).json({ error: 'Failed to create maintenance logs' });
    }
});
router.delete("/:id", async (req,res) => {
    const {id} = req.params;
    const deleteRecord = await maintenanceLogs.delete(id);

    if(!deleteRecord){
        return res.status(404).json({message: "Was not able to delete log"})
    }

    res.status(200).json({ message: 'Maintenance log deleted successfully' });
    
})

module.exports = router;