import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navClass = ({ isActive }) =>
  `block p-3 rounded-xl transition duration-200 decoration-none ${
    isActive
      ? 'bg-green-600 text-white shadow-md'
      : 'text-gray-700 hover:bg-green-100 hover:text-green-700'
  }`  
  const navigate = useNavigate()

const handleLogout = () => {
  localStorage.removeItem('token')
  navigate('/')
}  

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-5 border-r">

      {/* Logo */}
      <h2 className="text-3xl font-bold text-green-600">
        Trash2Treasure
      </h2>

      <p className="text-gray-500 text-sm border-b pb-4">
        Waste ➜ Wealth ♻️
      </p>

      {/* User Card */}
      <div className="bg-green-50 rounded-xl p-3 mt-4 mb-6">
        <p className="text-sm text-gray-600">
          Welcome Back 👋
        </p>
        
      </div>

      {/* Menu */}
      <h3 className="text-xs text-gray-400 mb-3 uppercase">
        Main Menu
      </h3>

      <ul className="space-y-2">

        <li>
          <NavLink to="/dashboard" className={navClass}>
            🏠 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/submit-waste" className={navClass}>
            ♻️ Submit Waste
          </NavLink>
        </li>

        <li>
          <NavLink to="/mypickups" className={navClass}>
            🚚 My Pickups
          </NavLink>
        </li>

        <li>
          <NavLink to="/rewards" className={navClass}>
            💰 Rewards
          </NavLink>
        </li>

        <NavLink
  to="/find-centers"
  className={({ isActive }) =>
    `block p-3 rounded-lg transition ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-100"
    }`
  }
>
  📍 Find Centers
</NavLink>

        <NavLink
  to="/recycler-portal"
  className={({ isActive }) =>
    `block p-3 rounded-lg transition ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-100 text-gray-700 no-underline"
    }`
  }
>
  👷 Recycler Portal
</NavLink>

      </ul>

      {/* Impact Stats */}
      <div className="mt-10">
        <h3 className="text-xs text-gray-400 mb-3 uppercase">
          Impact Stats
        </h3>

        <div className="bg-green-100 p-3 rounded-lg mb-3">
          <p className="text-sm text-gray-600">
            CO₂ Saved
          </p>
          <p className="font-bold text-green-700">
            1024 kg
          </p>
        </div>

        <div className="bg-green-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            Total Earned
          </p>
          <p className="font-bold text-green-700">
            ₹6398
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8">
        <button
  onClick={handleLogout}
  className="w-full bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition"
>
  🚪 Logout
</button>
      </div>

    </div>
  )
}

export default Sidebar