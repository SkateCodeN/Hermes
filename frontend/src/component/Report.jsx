
import { useLocation } from 'react-router-dom';

const Report = () =>{
    const location = useLocation();
    const log = location.state?.log;

    if(!log){
        return <p>No log data available.</p>;
    }
    return(
        <>
            <h1>{log.date}</h1>
        </>
    )
}

export default Report;

