import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard'
import SubmitWaste from './pages/SubmitWaste'
import MyPickups from './pages/MyPickups'
import Rewards from './pages/Rewards'
import FindCenters from './pages/FindCenters'
import RecyclerPortal from './pages/RecyclerPortal'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-waste" element={<SubmitWaste />} />
        <Route path="/mypickups" element={<MyPickups />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/find-centers" element={<FindCenters />} />
        <Route
  path="/recycler-portal"
  element={<RecyclerPortal />}
/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App