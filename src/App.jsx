import React,{ useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/AuthPages/Home';
import Wallet from './pages/AuthPages/Wallet';
import Deposits from './pages/AuthPages/Deposits';
import Withdrawals from './pages/AuthPages/Withdrawals';
import TransactionHistory from './pages/AuthPages/TransactionHistory';
import Settings from './pages/AuthPages/Settings';
import Profile from './pages/AuthPages/Profile';
import Investments from './pages/AuthPages/Investments';
import HomePage from './pages/General/HomePage';
import Contact from './pages/General/Contact';
import Aboutus from './pages/General/Aboutus';
import Products from './pages/General/Products';
import Login from './pages/General/Login';
import SignUp from './pages/General/SignUp';
import AuthRoutes from './services/AuthRoutes';
import Logout from './pages/AuthPages/Logout';
import EmailVerification from './pages/General/EmailVerification';



function App() {


  return (
    <>
      <div className="w-full h-full">

        <Router>
          <Routes>
            //General pages
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/product" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/email-verification" element={<EmailVerification />} />
          

            //Auth pages
            <Route path="/dashboard/overview" element={<AuthRoutes><Home /></AuthRoutes>} />
            <Route path="/dashboard/wallet" element={<AuthRoutes><Wallet /></AuthRoutes>} />
            <Route path="/dashboard/deposits" element={<AuthRoutes><Deposits /></AuthRoutes>} />
            <Route path="/dashboard/profile" element={<AuthRoutes><Profile /></AuthRoutes>} />
            <Route path="/dashboard/withdraw" element={<AuthRoutes><Withdrawals /></AuthRoutes>} />
            <Route path='/dashboard/transhistory' element={<AuthRoutes><TransactionHistory/></AuthRoutes>}/>
            <Route path="/dashboard/investments" element={<AuthRoutes><Investments /></AuthRoutes>} />
            <Route path="/dashboard/settings" element={<AuthRoutes><Settings /></AuthRoutes>} />
            
            
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
