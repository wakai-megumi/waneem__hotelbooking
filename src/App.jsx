import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/home/Home"
import HotelList from "./pages/hotellist/HotelList"
import Hotel from "./pages/hotel/Hotel"
import "./App.scss"
import Navbar from "./components/navbar/Navbar"
import { Toaster } from "react-hot-toast"
import Login from "./pages/login/Login"
import Success from "./pages/success/Success"
import Register from "./pages/register/Register"
import UserProfile from "./pages/profile/Profile"
import { Payment } from "./pages/payment/Payment"
import Mybooking from "./pages/myubookings/Mybooking"
import AboutPage from "./pages/about/AboutPage"
import ContactPage from "./pages/contact/ContactPage"
import { ToastContainer } from "react-toastify"
import PrivacyPolicyPage from "./pages/privacyPolicy/PrivacyPolicyPage"
import FAQ from "./pages/footerPages/faq/FAQ"
import Developer_meet from "./pages/footerPages/developer_meet-up/Developer_meet"
import ConsumerDirectives from "./pages/footerPages/consumer_directives/ConsumerDirectives"
import { BsArrowLeft } from 'react-icons/bs'

import NotFoundPage from "./pages/notfoundpage/NotFoundPage"
import AvailableSoon from "./pages/avaialablesoon/AvailableSoon"
const App = () => {
  const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // Navigate back to the previous page
    };

    return (
      <div className="back-button-container">
        <button className="back-button" onClick={goBack}>
          <BsArrowLeft />

        </button>
      </div>
    );
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/not_found" element={<NotFoundPage />} />
        <Route path="/available_soon" element={<AvailableSoon />} />



        <Route path="/hotels" element={<HotelList />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/payment" element={<Payment />} />




        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact_page" element={<ContactPage />} />
        <Route path="/privacy_policy_page" element={<PrivacyPolicyPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/developer_meet" element={<Developer_meet />} />
        <Route path="/consumer_directives" element={<ConsumerDirectives />} />




        <Route path="/register" element={<Register />} />

        <Route path="/success" element={<Success />} />
        <Route path="/payment" element={<Payment />} />


        <Route path="/bookings/:id" element={<Mybooking />} />
      </Routes>
      <BackButton />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  )
}

export default App
