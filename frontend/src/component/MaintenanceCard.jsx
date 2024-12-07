// This is to display card components that show maintenance history.
import React,{useState} from 'react';
import deleteImage from '../assets/x.svg'
const HOST_URL = import.meta.env.VITE_API_URL;
const MaintenanceCard = ({ log,onUpdate,onDelete }) => 
{
   
    const [edit,setEdit] = useState(false);
    const [miles,setMiles] =useState(log.miles);
    const [date,setDate] =useState(log.date);
    const [maintenance,setMaintenance] =useState(log.maintenance);

    //for the edit button
    const handleEditClick = () =>{
        
        setEdit((prevEdit) => !prevEdit );
    }

    //submit the changes in the edit
    const handleSubmit = async(e) =>{
        e.preventDefault();

        const payload ={
            date: date,
            maintenance: maintenance,
            miles: parseInt(miles,10)
        }
        try{
            //Make the post request to the backend
            
            const response = await fetch(`${HOST_URL}/api/maintenanceLogs/${log.id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if(!response.ok){
                throw new Error('Failed to create maintenance log')
            }

            const data = await response.json();
            console.log("Entry Updated:", data);
            alert('Maintenance log entry was updated');

            //let parent know of update
            onUpdate(data);
            setEdit(false);
        }catch(error){
            console.error("Error:", error)
        }
    }

    //handle delete of a button
    const handleDelete = async() =>{
        try{
            const response = await fetch(`${HOST_URL}/api/maintenanceLogs/${log.id}`, {
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Failed to create maintenance log')
            }
            const data = await response.json();
            console.log("Record Deleted:", data);
            alert('Maintenance log entry was deleted');
            onDelete(log.id);
        }
        catch(error){
            console.error("Error:", error)
        }
    }

    return(
        <div style={styles.card}>
            <div>
                {/* For prod: ./x.svg for dev its ../src/assets */}
                <button  type="button" onClick={handleDelete}><img src={deleteImage} style={styles.icon} /></button>
            </div>
            <h3>Date:</h3>
            {edit ? (
                <input type="date" value={date}  onChange={(e) => setDate(e.target.value)} />
            ) : (
                <p>{date}</p>
            )}

          <h4>id:{log.id}</h4>
          
          <h3>Miles:</h3>
            {edit ? (
                <input type="number" value={miles}  onChange={(e) => setMiles(e.target.value)} />
            ) : (
                <p> {miles}</p>
            )}

            <p><strong>Maintenance:</strong></p>
            {edit ? (
                    <ul>
                        <textarea value={maintenance}  onChange={(e) => setMaintenance(e.target.value)}/>
                    </ul>
                
                ) : (
                    <ul>
                        <p>{maintenance}</p>
                    </ul>
                )}
               
          <button onClick={handleEditClick}>{edit ? "Cancel Edit" : "Edit"}</button>
         <button onClick={handleSubmit} style={edit ? styles.editOn: styles.test}> Submit Change</button>
        </div>
    );
}



const styles = {
    card : {
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        textAlign: "left",
        color:"black"
    },

    test:{
        display:"none"
    },
    editOn:{
        display:"block"
    },

    icon:{
        height:"15px",
        width:"15px"
    }
}
    
    
    

export default MaintenanceCard;