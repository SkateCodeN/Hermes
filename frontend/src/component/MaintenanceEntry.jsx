
// Thi is where we enter Miles, Maintenance and Date of service for the car
import React,{useState} from 'react';
import FileUpload from "../../../../Talos/frontend/src/components/FileUpload";

const HOST_URL = import.meta.env.VITE_API_URL;
const SERVER_HOST_URL =  import.meta.env.VITE_ENV_CODE === "Debug" ?  "http://localhost:5100" :  HOST_URL;

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
            const response = await fetch(`${SERVER_HOST_URL}/api/maintenanceLogs`, {
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
            <div style={styles.card}>

                <div style={styles.titleContainer}>
                    <h2 >Create Maintenance Record</h2>
                </div>
                
                
                <form style={styles.formContainer} onSubmit={handleSubmit}>

                     {/* Input Date*/}
                     <div style={styles.dateContainer}>
                        <label  htmlFor="maintenance-txtbox">Date:</label>
                        <input style={{width:"50%"}} type="date" id="maintenance-txtbox" onChange={(e) => setDate(e.target.value)}></input>
                    </div>

                    {/* Input Miles*/}
                    <div style={styles.milesContainer}>
                        <label  htmlFor="miles-txt-box">Input Miles: </label>
                        <input  type="text" id="miles-txt-box" onChange={(e) => setMiles(e.target.value)}></input>

                    </div>


                    {/* Input Maintenance*/}
                    <div style={styles.maintenanceContainer}>
                        <div style={styles.milesContainer}>
                            <label htmlFor="maintenance-txtbox">Maintenance:</label>
                        </div>
                        
                        <textarea style={{height:"200px"}} type="textarea" id="maintenance-txtbox" onChange={(e) => setMaintenanceList(e.target.value)}></textarea>
                    </div>

                    <div>
                    
                    {/* Section to upload a file  */}
                    {/* The issue here is handling when a remote user wants to save an image. I want to send the image to what will be a remote DB. Ditto with files */}
                    {/* 
                    <div>
                        <FileUpload />
                    </div>
                    */}
                    
                    

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
        
        alignItems:"center"

    },
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
    titleContainer:{
        width:"100%",
        padding:"10px 0",
        textAlign:"center"
    },

    formContainer:{
        padding:"10px 0",
        width:"100%",
       
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:"20px",
        

    },
    milesContainer:{
        width:"300px",
        display:"flex",
        padding:"10px 0",
        
        justifyContent:"space-between"
    },
    dateContainer:{
        width:"300px",
        display:"flex",
        padding:"10px 0",
        justifyContent:"space-between"

    
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
