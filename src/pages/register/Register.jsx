import React, { useContext, useState } from "react";
import { Authcontext } from "../../context/Authcontext.jsx";
import axios from "axios";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    country: "",
    city: "",
    address: "",
    phone: "",
    profileimage: "",
  });
  const [load, setLoad] = useState(false)
  const [uploaded, setuploaded] = useState(false)
  const { loading, error, dispatch } = useContext(Authcontext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const inputFields = form.querySelectorAll('input');

    inputFields.forEach((input) => {
      input.setAttribute('autocomplete', 'off');
    });
  });

  const handleimageupload = async (e) => {
    let file = e.target.files[0];
    const data = new FormData();
    data.append('file', file, file.name);
    data.append('upload_preset', 'upload_hotel_booking');


    try {
      setLoad(true)
      const response = await axios.post(`${import.meta.env.VITE_REACT_CLOUDINARY_URL}`, data)

      console.log(response.data.url)
      setFormData((prevData) => ({
        ...prevData,
        profileimage: response.data.url,
      }));
      setLoad(false)
      setuploaded(true)

    } catch (err) {
      console.log(err)
    }

  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    dispatch({ type: "START" });
    try {
      setLoad(true)
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        formData, { withCredentials: true }
      );

      console.log(response)
      dispatch({ type: "SUCCESS", payload: response?.data?.user });
      navigate("/");
      setLoad(false)

    } catch (err) {
      setLoad(false)
      console.log(err)
      dispatch({ type: "FAILURE", payload: err.response.data.message });
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="form" autoComplete="new-password">

        <div className="register-wrapper">
          <h1>Register</h1>
          <input
            className="register-input"
            placeholder="Email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="register-input"
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="register-input"
            placeholder="Username"
            type="text"
            id="username"
            autoComplete="off"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="register-input"
            placeholder="Country"
            type="text"
            id="country"
            value={formData.country}
            onChange={handleChange}
          />
          <input
            className="register-input"
            placeholder="City"
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            className="register-input"
            placeholder="Address"
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            className="register-input"
            placeholder="Phone"
            type="number"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <label htmlFor="profileimage" className="uploadimage"> <span>upload profile image</span>
            <span className="upload" disabled={load}>  <AiOutlineCloudUpload style={uploaded ? { color: 'green' } : { color: 'blue' }} /> </span>
            {uploaded && <span style={uploaded ? { color: 'green' } : { color: 'blue' }} >  success</span>}

          </label>
          <input
            className="register-input"
            placeholder="profile-image"
            type="file"
            id="profileimage"
            accept="image/*"
            disabled={loading || load}
            onChange={handleimageupload}
          />
          <button disabled={loading || load} className="register-btn" type="submit">
            Register
          </button>
          {error && <span className="register-error">{error}</span>}
          <span className="formbottom">
            <h5>already have an account! </h5>
            <h4 onClick={() => navigate('/login')}> click here </h4>
          </span>
        </div>


      </form>

    </div>
  );
};

export default Register;