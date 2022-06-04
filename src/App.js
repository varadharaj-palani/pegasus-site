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
import {toastNotification} from './components/Notification/Notification'
import Landing from "./pages/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import AddAccount from "./pages/AddAccount/AddAccount"
import FdAccount from "./pages/Account/FdAccount";
import SavAccount from "./pages/Account/SavAccount";
import AccountModal from "./pages/AccountModal/AccountModal";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
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
            <AllRoutes />
          </Router>
        </div>
      </StyledApp>
    </ThemeProvider>
  );
}

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addAccount" element={<AddAccount />} />
      <Route path="/account/savings/:acct" element={<SavAccount />} />
      <Route path="/account/fd/:acct" element={<FdAccount />} />
      <Route path="/accountModal" element={<AccountModal />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
