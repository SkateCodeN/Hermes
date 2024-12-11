import React,{useState,useEffect} from 'react';
const HOST_URL = import.meta.env.VITE_API_URL;
const SERVER_HOST_URL =  import.meta.env.VITE_ENV_CODE === "Debug" ?  "http://localhost:5100" :  HOST_URL;
const UploadImage = () =>{
    const [imgUrlPath, setImgUrlPath] = useState("")
    const [imgName, setImgName] = useState("");
    useEffect( () => {
        //testUpload();
        fetchImage();
    },[]);

    const imgPath = 'C:/Users/Guillermo Reyes/Documents/ReactProjects/VagProject/img/Rock Auto Oxygen sensors.png'
    const testUpload = async() =>{
        const payload ={
           name: "test Image",
           imgData: imgPath
        
        }

        try{
            const response = await fetch(`${SERVER_HOST_URL}/api/maintenanceLogs/postImage`, {
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

    const fetchImage = async() =>{
        try{
            const response = await fetch(`${SERVER_HOST_URL}/api/maintenanceLogs/image/1`);
            if(!response.ok){
                throw new Error("Response failed to fetch image")
            }
            
            //const blob = await response.blob();
           // const imageUrl = URL.createObjectURL(blob);
            //setImgUrlPath(imageUrl);
            const result = await response.json();
            const {name, data} = result;
            const imageUrl = `data:image/jpeg;base64,${data}`;
            setImgUrlPath(imageUrl)
            setImgName(name);
        }catch(error){
            console.error(error);
        }
    }
    return(
        <>
            <h1>Image</h1>
            <img src={"../src/assets/test.png"} height="50px" />
            <div>
                <p>Image from DB</p>
                <p>Name: {imgName}</p>
                {imgUrlPath ? <img src={imgUrlPath} height="100px" /> : <p>Loading ...</p>}
            </div>
        </>
    )
}

export default UploadImage;