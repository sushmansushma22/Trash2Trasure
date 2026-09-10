import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      )

      localStorage.setItem('token', response.data.token)

      localStorage.setItem("userName", response.data.user.name);
alert("Login Successful");

      navigate('/dashboard')
    } catch (error) {
      console.error(error)

      alert(
        error.response?.data?.message || 'Login Failed'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">

        <h1 className="text-3xl font-bold text-green-600 text-center mb-2">
          Trash2Treasure
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Welcome Back 👋
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-5"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Login
        </button>

        <p className="text-center mt-5">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-green-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login