import React,{useState,useEffect} from 'react';
const HOST_URL = import.meta.env.VITE_API_URL;

const UploadImage = () =>{
    
    useEffect( () => {
        testUpload();
    },[]);

    const testUpload = async() =>{
        const payload ={
            date: date,
            maintenanceList: maintenanceList,
            miles: parseInt(miles,10),
        
        }

        try{
            const response = await fetch(`${HOST_URL}/postImage`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if(!response.ok) throw new Error('Failed to send Image');
            const data = await response.json();
            alert('Image was uploaded successfully')
        }
        catch (error){
            console.error("Error sending Image:", error)
        }
       

    }
    return(
        <>
            
        </>
    )
}

export default UploadImage;