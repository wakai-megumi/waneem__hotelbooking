import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Navbar.scss"
import { Authcontext } from "../../context/Authcontext"
const Navbar = () => {
  /////////////////////////////////////
  //temporary condition sections


  /////////////////
  const { currentUser } = useContext(Authcontext)
  console.log(currentUser)
  useEffect(() => {
    // Function to fetch the current user 
    const fetchCurrentUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        console.log(user);
      } catch (error) {
        console.log("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);
  const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem("currentUser")
    window.location.reload()
    navigate("/")
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

        </div>
      </div>
    </nav>
  )
}

export default Navbar