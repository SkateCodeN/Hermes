
import { Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import './App.css'
import MaintenanceEntry from './component/MaintenanceEntry';

import MaintenanceLogs from './component/MaintenanceLogs';
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
            
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MaintenanceLogs />} />
          <Route path="/create" element={<MaintenanceEntry />} />
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
