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
  var logbit;
  if (localStorage.getItem('email') == null) {
    bool = false;
    logbit = 4;
  } else {
    bool = true;
    logbit = localStorage.getItem('logbit');
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
          {logbit == 1 && <a href="/accountModal">Account</a>}
          {logbit == 1 &&<a href="/profile">Profile</a>}
          {logbit == 2 &&<a href="/addAccount">Add Account</a>}
          {logbit == 2 &&<a href="/addLoan">Lend Loan</a>}
          {logbit == 1 &&<a href='/loans'>Loans</a>}
          {logbit == 1 &&<a href="/instapay">Quick Pay</a>}
          {logbit == 1 &&<a href="/bills">Bill</a>}
          {logbit == 1 &&<a href="/selectAccount">History</a>}
          {logbit == 3 && <a href = "/addEmployee">Add Employee</a>}
          {logbit == 3 && <a href = "/addBranch">Add Branch</a>}
          {logbit == 2 &&<a href="/addMoney">Add Money</a>}
          {logbit == 2 &&<a href="/employeeProcedure">Procedures</a>}
          {<a href="/contact">Contact  </a>}
          {<a href='/login' onClick={() => {
            if (bool) { localStorage.clear() } 
            Store.addNotification({ ...toastNotification, message: "Logged Out Successfully", type: "success" });
            setState(!val)
          }}>{prof}</a>}
          {/* <a href="mailto:someone@example.com" target="_blank">Feedback</a> */}

        </div>
      </div>
    </div>

  )
}

export default Navbar