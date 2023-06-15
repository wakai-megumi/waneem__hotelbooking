import React from "react"
import "./EmailList.scss"
const EmailList = () => {
  return (
    <div className="emaillist">
      <div className="emaillist_container">
        <h2> Save time , save money!</h2>
        <h3> Sign up and we'll send the best deals to you</h3>
        <div className="emaillist_input">
          <input type="text" placeholder=" Your Email Address" />
          <button> Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default EmailList
