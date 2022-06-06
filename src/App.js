import "./App.css";
import "./fonts.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState, createContext, useEffect, useRef } from "react";
import { darkTheme, GlobalStyles } from "./themes";
import styled, { ThemeProvider } from "styled-components";
import { ReactNotifications, Store } from 'react-notifications-component'
import { toastNotification } from './components/Notification/Notification'
import Landing from "./pages/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import History from "./pages/History/History";
import AddAccount from "./pages/AddAccount/AddAccount"
import FdAccount from "./pages/Account/FdAccount";
import SavAccount from "./pages/Account/SavAccount";
import AccountModal from "./pages/AccountModal/AccountModal";
import SelectAccount from "./pages/History/SelectAccount";
import Pay from "./pages/Pay/Pay";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Addloanacc from "./pages/Addloanacc/Addloanacc";
import ApplyLoan from "./pages/ApplyLoan/ApplyLoan";
import ShowBills from "./pages/ShowBills/ShowBills";
import PayBill from "./pages/PayBill/PayBill";

const StyledApp = styled.div``;
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* //   <GlobalStyles /> */}
      <StyledApp>
        <div className="App">
          <Router>
            <Navbar />
            <ReactNotifications />
            {localStorage.getItem('logbit') == 1 ?
              <CustRoutes /> : localStorage.getItem('logbit') == 2 ?
                <EmpRoutes /> : <LogRoutes />}
          </Router>
        </div>
      </StyledApp>
    </ThemeProvider>
  );
}

const LogRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/account/savings/:acct" element={<Login />} />
      <Route path="/account/fd/:acct" element={<Login />} />
      <Route path="/accountModal" element={<Login />} />
      <Route path="/instapay" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />

    </Routes>
  )
}

const CustRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addAccount" element={<AddAccount />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/selectAccount" element={<SelectAccount />} />
      <Route path="/history/:acct" element={<History />} />
      <Route path="/account/savings/:acct" element={<SavAccount />} />
      <Route path="/account/fd/:acct" element={<FdAccount />} />
      <Route path="/accountModal" element={<AccountModal />} />
      <Route path="/instapay" element={<Pay />} />
      <Route path="/bills" element={<ShowBills />} />
      <Route path="/payNewBill" element={<PayBill />} />
      <Route path="/addLoan" element={<Addloanacc />} />
      <Route path="/applyLoan" element={<ApplyLoan />} />
      <Route path="/*" element={<PageNotFound />} />

    </Routes>
  )
}

const EmpRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/account/savings/:acct" element={<SavAccount />} />
      <Route path="/account/fd/:acct" element={<FdAccount />} />
      <Route path="/accountModal" element={<AccountModal />} />
      <Route path="/instapay" element={<Pay />} />
      <Route path="/*" element={<PageNotFound />} />

    </Routes>
  )
}

export default App;
