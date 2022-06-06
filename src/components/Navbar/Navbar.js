import { Container } from '@mui/material'
import React from 'react'
// import { Auth, SetAuth } from "../../App";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component'
import { toastNotification } from "../Notification/Notification";
import 'react-notifications-component/dist/theme.css';


function Navbar() {

  const [val, setState] = React.useState(true);
  var navigate = useNavigate();

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
            <img className='logo' src='../../images/logos/logo.png' onClick={() => {
              navigate('/');
            }} />

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
          <a href="/instapay">Quick Pay</a>
          <a href="/bills">Bill</a>
          <a href="/selectAccount">History</a>
          <a href="/contact">Contact  </a>
          <a href='/login' onClick={() => {
            if (bool) { localStorage.clear() } setState(!val)
          }}>{prof}</a>
          {/* <a href="mailto:someone@example.com" target="_blank">Feedback</a> */}

        </div>
      </div>
    </div>

  )
}

export default Navbar