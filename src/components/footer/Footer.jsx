import React from "react"
import "./Footer.scss"
import { Link } from "react-router-dom"
import { CgFacebook } from "react-icons/cg"
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs"
import { toast } from "react-toastify"
import { FaBug, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';
import propTypes from "prop-types"
import { useState } from "react"
const Footer = ({ TechTeamRef }) => {

  const [subscribingEmail, setSubscribingEmail] = useState("")
  const handleEmailSubscriptionChange = (e) => {
    setSubscribingEmail(e.target.value)
  }

  const handleEmailSubscription = () => {

    if (!subscribingEmail) {
      toast.error("Please enter your email")
      return
    }
    if (!subscribingEmail.includes("@")) {
      toast.error("Please enter a valid email , email does not incluede the @  ")
      return
    }


    toast.success("Thank you for subscribing")
    toast.success("latest deals and discounts will be sent to your email")
  }
  const handleScrollToTechTeam = () => {
    if (TechTeamRef && TechTeamRef.current) {
      TechTeamRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">

      <div className="footer-container">
        <div className="footer-top-section">
          <div className="footer-top-section_left">
            <h1>
              <span>E</span>xplore latest deals and discounts
            </h1>
            <div className="F_email_input">
              <input type="email" placeholder="Subscribe@gmail.com" onChange={handleEmailSubscriptionChange} />
              <button className="F_email_btn" type="submit" onClick={handleEmailSubscription}>
                Subscribe
              </button>
            </div>

          </div>
          <div className="footer-top-section_right">
            <div className="f-chat">
              <h2> Chat with us!!   💬</h2>

              <div>whatsapp</div>
            </div>
            <div className="F_contacts">
              <div className="F_contact_">
                <h3>Call us 📞</h3>
                <p>123-456-7890</p>
              </div>
              <hr />
              <div className="F_contact_">
                <h3>Mail us  📧</h3>
                <p>dummycreator@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="footer-mid-section">
          <div className="fm-deal-gallery">

          </div>
          <div className="fm-right">
            <div className="fm-social-contact">
              <h2>Follow us   🔍</h2>
              <div className="fm-social-icons ">
                <Link to="https://www.facebook.com/YOUTUBE" target="_blank" className="fm-social-icon"  >
                  <BsInstagram className="fmc-icon" />
                </Link>
                <Link className="fm-social-icon">
                  <BsTwitter className="fmc-icon" />
                </Link>
                <Link className="fm-social-icon">
                  <BsYoutube className="fmc-icon" />
                </Link>
                <Link className="fm-social-icon">
                  <CgFacebook className="fmc-icon" />
                </Link>
              </div>
            </div>
            <div className="fm-info">
              <div className="fm-resource">

                <h2>Resources  <span> 📚</span> </h2>
                <Link className="link" to="/faq">
                  FAQ's
                </Link>
                <Link className="link" to="/privacy_policy_page">
                  Privacy_Policy
                </Link>
                <Link className="link" to="/developer_meet">
                  Hi , to Developer
                </Link>
              </div>
              <div className="fm-product-help">
                <h2>Product Help   <span >❓</span></h2>
                <Link className="link" to="/contact_page">
                  support
                </Link>
                <Link className="link" to="/contact_page">
                  Customer_Care
                </Link>
                <Link className="link" to="/developer_meet" onClick={handleScrollToTechTeam}>
                  Report  🐞
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer-bottom-section">
          <div className="fb-info">
            <p>--- No Gain / unauthorized use of users information ---  ⚠️</p>{" "}
            <span>
              feel free to visit our---
              <Link className="consumer link" to="/consumer_directives">
                consumer content usage directives
              </Link>
            </span>
          </div>
          <div>© 2021 DummyCreator. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
Footer.propTypes = {

  TechTeamRef: propTypes.object
};