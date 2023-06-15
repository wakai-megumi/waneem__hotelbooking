import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.scss"
const Navbar = () => {
  /////////////////////////////////////
  //temporary condition sections


  const [currentUser, setCurrentUser] = useState(null);
  /////////////////

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    setCurrentUser(user)
    console.log(user)
  }, [setCurrentUser])

  const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem("currentUser")
    window.location.reload()
  }
  //////////////////////////////////////
  return (
    <nav className="navbar ">
      <div className="nav_container">
        <Link to="/" className="link">
          <div className="nav_logo">
            <h1>Logo</h1>
          </div>
        </Link>

        <div className="nav_menu">
          <Link to="/" className="nav_link link">
            Home
          </Link>
          <Link to="/about" className="nav_link link">
            About
          </Link>
          <Link to="/contact_page" className="nav_link link">
            Contact
          </Link>

          {currentUser ? (
            <>
              <div className="user_image" onClick={() => navigate(`/profile/${currentUser._id}`)}>
                <img src={currentUser?.profileimage} alt="user" />
              </div>

              <Link to="/" className="nav_link link" onClick={handlelogout}>
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" className="nav_link link">
              Login
            </Link>
          )}

          {/* upto here -------------------------------- */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar