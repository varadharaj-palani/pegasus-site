import { Container } from '@mui/material'
import React from 'react'
// import { Auth, SetAuth } from "../../App";
import "./Navbar.css"





function Navbar() {

  const [val, setState] = React.useState(true);

  var bool;
  if (localStorage.getItem('email') == null) {
    bool = false;
  } else {
    bool = true;
  }

  var prof;

  if (bool) {
    prof = "Logout"
  } else {
    prof = "Login";
  }

  return (
    <div>



      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <img className='logo' src='../../images/logos/logo.png' />

          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
            {/* <span></span> */}

          </label>
        </div>

        <div className="nav-links">
          <a href="/accountModal">Account</a>
          <a href="/profile">Profile</a>
          <a href='/loans'>Loans</a>
          <a href="/instapay">Pay</a>
          <a href="/selectAccount">History</a>
          <a href="/contact">Contact  </a>
          <a href='/login' onClick={() => {if(bool) {localStorage.clear()} setState(!val)}}>{prof}</a>
          {/* <a href="mailto:someone@example.com" target="_blank">Feedback</a> */}



        </div>
      </div>
    </div>

  )
}

export default Navbar