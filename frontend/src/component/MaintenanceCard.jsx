// This is to display card components that show maintenance history.
import React,{useState} from 'react';
import deleteImage from '../assets/x.svg';
import { Link } from 'react-router-dom';
const HOST_URL = import.meta.env.VITE_API_URL;
const SERVER_HOST_URL =  import.meta.env.VITE_ENV_CODE === "Debug" ?  "http://localhost:5100" :  HOST_URL;
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
            
            const response = await fetch(`${SERVER_HOST_URL}/api/maintenanceLogs/${log.id}`, {
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
            const response = await fetch(`${SERVER_HOST_URL}/api/maintenanceLogs/${log.id}`, {
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
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let logDate = new Date(date);

    const formatter = new Intl.NumberFormat('en-US');
    const milesFormatted = formatter.format(miles);

    const targetUrl = `/report/${log.id}`;

    return(
        <div style={styles.card}>

            <div style={styles.deleteContainer}>
                <h3>ID: {log.id}</h3>
                
                <button style={styles.deleteButton} type="button" onClick={handleDelete}><img src={deleteImage} style={styles.icon} /></button>
            </div>

            {/* Date  */}
            <div style={styles.inputContainer}>
                <h3>Date:</h3>
                {edit ? (
                    <input type="date" value={date}  onChange={(e) => setDate(e.target.value)} />
                ) : (
                    <p>{logDate.toLocaleDateString("en-US", options)}</p>
                )}
            </div>
           
            {/* Miles */}
            <div style={styles.inputContainer}>
                <h3>Miles:</h3>
                {edit ? (
                    <input type="number" value={miles}  onChange={(e) => setMiles(e.target.value)} />
                ) : (
                    <p> {milesFormatted}</p>
                )}
            </div>
            
            {/* Maintenance */}
            <div tyle={styles.maintenanceContainer}>
                <h3>Maintenance:</h3>
                {edit ? (
                    <textarea value={maintenance} style={{height:"200px",width:"90%",resize:"none", padding:"0 20px", fontSize:'1rem'}}  onChange={(e) => setMaintenance(e.target.value)}/>
                ) : (
                    <p>{maintenance}</p>
                )}
            </div>
            
            <div style={styles.editContainer}>
                <button onClick={handleEditClick} style={edit? styles.editButton : styles.cancelEditButton}>{edit ? "Cancel Edit" : "Edit"}</button>
                <button onClick={handleSubmit} style={edit ? styles.editOn: styles.test}> Submit Change</button>
                
            </div>

            <div style={styles.viewMoreContainer}>
                <Link to={targetUrl} state={{log}}>View More</Link>
            </div>
          
        </div>
    );
}



const styles = {
    card : {
        width:"500px",
        padding: "20px",
        margin:"20px 0",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        textAlign: "left",
        color:"black",
        fontSize:"1.1rem"
    },

    test:{
        display:"none"
    },
    editButton:{
        backgroundColor:"red"
    },
    cancelEditButton:{
        backgroundColor:"yellow",
        color:"black"
    },
    editOn:{
        display:"block",
        backgroundColor:"green"
    },

    icon:{
        height:"20px",
        width:"20px",
        
    },
    inputContainer:{
        width:"300px",
        display:"flex",
        gap:"30px",
        alignItems:"center",
        

    
    },
    maintenanceContainer:{
        display:"flex",
        flexDirection:"column",
        paddingTop:"30px"
    },
    deleteContainer:{
        display:"flex",
        justifyContent:"space-between"

    },
    deleteButton:{
        backgroundColor:"white"
    },
    editContainer:{
        display:"flex",
        justifyContent: "space-between",
        padding:"20px 0"
    },
    viewMoreContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
}
    
    
    

export default MaintenanceCard;