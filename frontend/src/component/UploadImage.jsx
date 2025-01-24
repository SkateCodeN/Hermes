import React,{useState,useEffect} from 'react';
import UploadImageBox from '../../../../Talos/frontend/src/components/UploadFileBox';
const HOST_URL = import.meta.env.VITE_API_URL;
const SERVER_HOST_URL =  import.meta.env.VITE_ENV_CODE === "Debug" ?  "http://localhost:5100" :  HOST_URL;
const UPLOAD_URL = import.meta.env.VITE_UPLOAD_API_URL;
const SERVER_UPLOAD_URL =  import.meta.env.VITE_ENV_CODE === "Debug" ?  "http://localhost:3000" :  UPLOAD_URL;
const UploadImage = () =>{

    const [imgUrlPath, setImgUrlPath] = useState("")
    const [imgName, setImgName] = useState("");
    const [image, setImage] = useState(null);
    
    useEffect( () => {
        //testUpload();
        //fetchImage();
    },[]);

    const handleImgUpdate = (image) =>{
        setImage(image);
    }

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

    const fetchImage = async(id) =>{
        try{
            const response = await fetch(`${SERVER_HOST_URL}/api/maintenanceLogs/image/${id}`);
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
        <div style={styles.container}>
            <div>
                <label for="imgName" >Enter Img Name:</label>
                <input type='text' id="imgName" ></input>
            </div>
            
            <UploadImageBox onImgUpdate={handleImgUpdate}/>
            <div>
                { image && <p>{image.name}</p>}
            </div>
            
        </div>
            
        </>
    )
}

const styles = {
    container: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    }
}
export default UploadImage;