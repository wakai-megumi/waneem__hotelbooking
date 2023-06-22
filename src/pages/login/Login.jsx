import React, { useContext, useEffect, useState } from "react"
import { Authcontext } from "../../context/Authcontext.jsx"
import axios from "axios"
import "./Login.scss"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  })
  const { currentUser, loading, error, dispatch } = useContext(Authcontext)
  const handlechange = (e) => {
    console.log(e.target.value)
    return setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }
  useEffect(() => {

    dispatch({ type: "LOGOUT" })

  }, [])

  ///code for make user go back on same page after login from where he is reidirected

  const navigate = useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: "START" })
    try {
      const { email, password } = credentials
      console.log(email, password)
      const res = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/auth/login`, {
        email: email,
        password: password,
      },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
      dispatch({ type: "SUCCESS", payload: res?.data?.user })
      navigate('/')
    } catch (err) {
      toast.error(err?.response?.data?.message)
      console.log(err?.response?.data?.message)
      dispatch({ type: "FAILURE", payload: err.response.data.message })
    }
  }

  return (
    <form className="login" onSubmit={handlesubmit} autoComplete="new-password">
      <div className="loginwrapper">
        <h1> Login </h1>

        <span style={{ display: "flex", justifyContent: 'center' }}>

          <p> click here if-----</p>

          <a className="link" style={{ fontSize: "1rem", color: 'green' }} href={`https://waneem-admin.onrender.co`}>  ADMIN</a>

        </span>
        <input
          className="logininput"
          placeholder="username"
          type="email"
          id="email"
          value={credentials.email}
          onChange={handlechange}
        />
        <input
          className="logininput"
          placeholder="password"
          type="password"
          autoComplete="new-password"
          id="password"
          value={credentials.password}
          onChange={handlechange}
        />
        <button disabled={loading} style={loading ? { cursor: 'not-allowed' } : null} className="btn" type="submit">
          submit
        </button>
        <div className="form-bottom">
          <span className="forgot">Forgot Password?</span>
          <span className=" registerbtn" onClick={() => navigate('/register')}>Register here</span></div>
      </div>
    </form>
  )
}

export default Login
