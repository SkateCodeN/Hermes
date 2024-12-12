import React,{useState,useEffect} from 'react';

const HOST_URL = import.meta.env.VITE_API_URL;
const SERVER_HOST_URL =  import.meta.env.VITE_ENV_CODE === "Debug" ?  "http://localhost:5100" :  HOST_URL;

const ImageList = () => {
    const [imgData, setImgData] = useState([]);
    useEffect( () =>{
        getImageList();
    },[]);

    const getImageList = async () =>{
        try{
            const response = await fetch(`${SERVER_HOST_URL}/api/maintenanceLogs/images`);
            if(!response.ok) throw new Error('Failed to send Image');
            const data = await response.json();
            console.log(data);
            setImgData(data);
        }
        catch(error){
            console.error("Error getting Images:", error)
        }
    }
    const createFullPath = (img) =>{

        const imgPath = `data:image/jpeg;base64,${img.toString('base64')}`;

        return imgPath;
    }
    return(
        <>
            <h1>Images</h1>
            <div>
            {imgData.map( (imgObj) => (
                    <div key={imgObj.id}>
                        <h4>{imgObj.name}</h4>
                        <p>ID: {imgObj.id}</p>
                        <img src={createFullPath(imgObj.data)} height="200px" />
                          
                    </div>
                ))}
            </div>
        </>
    )
}

export default ImageList;