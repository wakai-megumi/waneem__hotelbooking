import React, { useContext, useState } from "react"
import { Authcontext } from "../../context/Authcontext.jsx"
import axios from "axios"
import "./Login.scss"
import { useNavigate } from "react-router-dom"
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
  ///code for make user go back on same page after login from where he is reidirected

  console.log(loading)
  const navigate = useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault()
    console.log("handlesubmit")

    dispatch({ type: "START" })
    try {
      const { email, password } = credentials
      const res = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}auth/login`, {
        email: email,
        password: password,
      },
        { withCredentials: true })
      dispatch({ type: "SUCCESS", payload: res?.data?.user })
      navigate('/')
    } catch (err) {
      console.log(err)
      dispatch({ type: "FAILURE", payload: err.response.data.message })
    }
  }

  return (
    <form className="login" onSubmit={handlesubmit} autoComplete="new-password">
      <div className="loginwrapper">
        <h1> Login</h1>
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
        <button disabled={loading} className="btn" type="submit">
          submit
        </button>
        {error && <span className="error"> {error}</span>}
        <div className="form-bottom">
          <span className="forgot">Forgot Password?</span>
          <span className=" registerbtn" onClick={() => navigate('/register')}>Register here</span></div>
      </div>
    </form>
  )
}

export default Login
