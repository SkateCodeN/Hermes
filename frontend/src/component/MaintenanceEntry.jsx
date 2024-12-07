
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
            <div style={{width:"700px",height:"700px",display:"flex",flexDirection:"column",alignItems:"center",alignContent:"center",backgroundColor:"red"}}>

                <div style={{width:"100%",backgroundColor:"silver",padding:"10px 0"}}>
                    <h1>Enter Info: </h1>
                </div>
                
                
                <form style={{padding:"10px 0",backgroundColor:"black", width:"500px"}} onSubmit={handleSubmit}>
                    <div style={{width:"400px",height:"100px",display:"flex",gap:"10px",alignItems:"center"}}>
                        <label style={{width:"50%"}} htmlFor="miles-txt-box">Input Miles: </label>
                        <input style={{width:"50%"}} type="text" id="miles-txt-box" onChange={(e) => setMiles(e.target.value)}></input>

                    </div>
                    <div style={{width:"400px",height:"25px",display:"flex",gap:"10px"}}>
                        <label style={{width:"50%"}} htmlFor="maintenance-txtbox">Date:</label>
                        <input style={{width:"50%"}} type="date" id="maintenance-txtbox" onChange={(e) => setDate(e.target.value)}></input>
                    </div>
                    <div style={{width:"400px",height:"200px",display:"flex",flexDirection:"column",gap:"10px",paddingTop:"30px"}}>
                        <label htmlFor="maintenance-txtbox">Maintenance:</label>
                        <textarea style={{height:"200px"}} type="textarea" id="maintenance-txtbox" onChange={(e) => setMaintenanceList(e.target.value)}></textarea>
                    </div>

                    <div>
                    <button type="submit"
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '10px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>
                    </div>
                </form>
                
            </div>
           
        </>
    );
}

export default MaintenanceEntry;
