import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from 'react-icons/fa';
import "./Navbar.scss";
import { Authcontext } from "../../context/Authcontext";

const Navbar = () => {
  const { currentUser } = useContext(Authcontext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
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

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
    navigate("/");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="nav_container">
        <Link to="/" className="link">
          <div className="nav_logo">
            <h1>megumi</h1>
          </div>
        </Link>

        <div className={`nav_menu ${showMenu ? "active" : ""}`}>
          <div className="nav_links">
            <Link to="/" className="nav_link link">
              Home
            </Link>
            <Link to="/about" className="nav_link link">
              About
            </Link>
            <Link to="/contact_page" className="nav_link link">
              Contact
            </Link>
            <Link to="/bookings" className="nav_link link">
              Bookings
            </Link>
            {!currentUser && (
              <Link to="/login" className="menu_link link" onClick={toggleMenu}>
                Login
              </Link>
            )}
            {currentUser && (
              <>
                <div
                  className="user_image"
                  onClick={() => navigate(`/profile/${currentUser._id}`)}
                >
                  <img src={currentUser?.profileimage} alt="user" />
                </div>

                <Link
                  to="/"
                  className="nav_link link"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            )}
          </div>

          <div className={`menu_icon ${showMenu ? "open" : ""}`} onClick={toggleMenu}>
            {showMenu ? <FaTimes /> : <FaBars />}
          </div>

          <div className={`menu_content ${showMenu ? "open" : ""}`}>
            <div className="menu_links">
              <Link to="/" className="menu_link link" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/about" className="menu_link link" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/contact_page" className="menu_link link" onClick={toggleMenu}>
                Contact
              </Link>
              <Link to="/bookings" className="menu_link link" onClick={toggleMenu}>
                Bookings
              </Link>
              {currentUser && (
                <>
                  <Link
                    to={`/profile/${currentUser._id}`}
                    className="menu_link link"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <Link to="/" className="menu_link link" onClick={handleLogout}>
                    Logout
                  </Link>
                </>
              )}
              {!currentUser && (
                <Link to="/login" className="menu_link link" onClick={toggleMenu}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
