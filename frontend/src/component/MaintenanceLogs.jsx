//This is the parent of Maintenance Cards. We created this parent to handle the state of 
// maintenance entries. This is the parent that deals with the state.
import React,{useState,useEffect} from 'react';
import MaintenanceCard from './MaintenanceCard';
const HOST_URL = import.meta.env.VITE_API_URL;
const SERVER_HOST_URL =  import.meta.env.VITE_ENV_CODE === "Debug" ?  "http://localhost:5100" :  HOST_URL;
const maintenanceLogs = () =>{

    const [logs,setLogs] = useState([]);
    const [loading,setLoading] = useState(true);

    //Once the component mounts fetch the logs
    useEffect( () => {
        fetchLogs();
    },[]);

    //HTTP requesst to fetch logs and set them in state
    const fetchLogs = async() => {
        try{
            const response = await fetch(`${SERVER_HOST_URL}/api/maintenanceLogs`);
            if(!response.ok) throw new Error('Failed to fetch logs');
            const data = await response.json();
            setLogs(data);
        }
        catch (error){
            console.error("Error fetching logs:", error)
        }
        finally{
            setLoading(false)
        }
    };

    // Refresh the update of an edit
    const handleUpdate = (updatedLog) => {
        setLogs((prevLogs) =>
            prevLogs.map( (log) => (log.id === updatedLog.id ? updatedLog : log))
        );
    };

    // Refresh the cards after a DELETE
    const handleDelete = (deletedId) => {
        setLogs((prevLogs) => prevLogs.filter((log) => log.id !== deletedId))
    };

    return(
        <div>
            
            {loading ? ( 
                <p>Loading...</p>
            ) : (
                logs.map((log) => (
                    <MaintenanceCard
                        key = {log.id}
                        log = {log}
                        onUpdate = {handleUpdate}
                        onDelete = {handleDelete}
                    />
                ))
            )}
        </div>
    );
}

// Styles
const styles = {
    container: {
      width: "80%",
      margin: "0 auto",
      textAlign: "center",
      color:"black"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9",
      textAlign: "left",
    },
    title:{
      color:"white"
    }
  };
export default maintenanceLogs;