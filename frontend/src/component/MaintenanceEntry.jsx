
// Thi is where we enter Miles, Maintenance and Date of service for the car
import React,{useState} from 'react';
const HOST_URL = import.meta.env.VITE_API_URL;
const debug = "localhost:5100";

const MaintenanceEntry = () =>{

    const [date,setDate] = useState('');
    const[miles,setMiles] = useState('');
    const[maintenanceList,setMaintenanceList] = useState('');

    const handleSubmit = async(e) =>{
        //prevents a refresh
        e.preventDefault();

        //validates that we provided data
        if(!date || !miles || !maintenanceList){
            alert('Please fill out all the fields');
            return;
        }

        //set up our header data to send to the back
        const payload ={
            date: date,
            maintenanceList: maintenanceList,
            miles: parseInt(miles,10),
        
        }

        try{
            //Make the post request to the backend
            const response = await fetch(`http://localhost:5100/api/maintenanceLogs`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if(!response.ok){
                throw new Error('Failed to create maintenance log')
            }

            const data = await response.json();
            console.log("Entry created:", data);
            alert('Maintenance log entry created successfully');

        }
        catch(error)
        {
            console.error("Error:", error)
        }
    }

    return(
        <>
            <div style={styles.container}>

                <div style={styles.titleContainer}>
                    <h2 >Create Maintenance Record</h2>
                </div>
                
                
                <form style={styles.formContainer} onSubmit={handleSubmit}>

                     {/* Input Date*/}
                     <div style={styles.dateContainer}>
                        <label style={{width:"50%"}} htmlFor="maintenance-txtbox">Date:</label>
                        <input style={{width:"50%"}} type="date" id="maintenance-txtbox" onChange={(e) => setDate(e.target.value)}></input>
                    </div>

                    {/* Input Miles*/}
                    <div style={styles.milesContainer}>
                        <label style={{width:"50%"}} htmlFor="miles-txt-box">Input Miles: </label>
                        <input style={{width:"50%"}} type="text" id="miles-txt-box" onChange={(e) => setMiles(e.target.value)}></input>

                    </div>

                   

                    {/* Input Maintenance*/}
                    <div style={styles.maintenanceContainer}>
                        <div style={styles.milesContainer}>
                            <label htmlFor="maintenance-txtbox">Maintenance:</label>
                        </div>
                        
                        <textarea style={{height:"200px"}} type="textarea" id="maintenance-txtbox" onChange={(e) => setMaintenanceList(e.target.value)}></textarea>
                    </div>

                    <div>
                    
                    <div style={styles.buttonContainer}>
                        <button type="submit"style={styles.button}>
                            Submit
                        </button>
                    </div>
                    
                    </div>
                </form>
                
            </div>
           
        </>
    );
}

const styles= {
    container:{
        width:"700px",
        height:"700px",
        display:"flex",
        flexDirection:"column",
        backgroundColor:"red",
        alignItems:"center"

    },
    titleContainer:{
        width:"100%",
        padding:"10px 0",
        textAlign:"center"
    },

    formContainer:{
        padding:"10px 0",
        width:"100%",
        background:"green",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:"20px",
        

    },
    milesContainer:{
        width:"400px",
        display:"flex",
        padding:"10px 0",
        background:"blue"
        
    },
    dateContainer:{
        width:"400px",
        display:"flex",
        padding:"10px 0",
        

    
    },
    maintenanceContainer:{
        width:"400px",
        display:"flex",
        flexDirection:"column",
        gap:"10px",
        paddingTop:"30px"
    },
    buttonContainer:{
        width:"400px",
        display:"flex",
        justifyContent:"flex-end",
        backgroundColor:"silver"
    },
    button:{
        backgroundColor:"green",
        color:"white",
        padding:"10px",
        margin:"10px 0",
        border:"none",
        cursor:"pointer",
        
    },

}

export default MaintenanceEntry;
