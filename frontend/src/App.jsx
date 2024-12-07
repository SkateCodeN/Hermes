
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css'
import MaintenanceEntry from './component/MaintenanceEntry';

import MaintLogList from './component/MaintLogList';
import MaintenanceLogs from './component/MaintenanceLogs';
function App() {
  
  return (
    <>
    
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<MaintenanceLogs />} />
                <Route path="/create" element={<MaintenanceEntry />} />
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
