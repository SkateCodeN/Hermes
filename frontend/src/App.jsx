
import { Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import './App.css'
import MaintenanceEntry from './component/MaintenanceEntry';
import Report from './component/Report';
import MaintenanceLogs from './component/MaintenanceLogs';
import UploadImage from './component/UploadImage';
function App() {
  
  return (
    <>
      <BrowserRouter>
        <nav style={styles.nav}>
          <div>
            <Link to="/">Home</Link>
          </div>
          <Link to="/create">Create</Link>
          <div>
            <Link to="/uploadImg">Upload</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MaintenanceLogs />} />
          <Route path="/create" element={<MaintenanceEntry />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/uploadImg" element={<UploadImage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const styles= {
  nav:{
    height:"20px",
    padding:"30px 0",
    width:"100%",
    
    display:"flex",
    gap:"20px",
    justifyContent:"flex-end",
    fontSize:"1.2rem"
  }
}
export default App;
