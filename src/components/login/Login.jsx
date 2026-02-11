import React, { useState } from 'react'

import './login.css'
import './loginbg.css'
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import Text from '../../components/text/Text';
import Input from '../../components/input/Input';
function Login({setIsslogin}) {
    const [email,setEmail]=useState("jai@gmail.com");
    const[password,setPassword]=useState("1234");
   const navigate = useNavigate();

const handleLogin = (e) => {
  e.preventDefault();

  if (email === "jai@gmail.com" && password === "1234") {
    alert("Login Successfully");

    localStorage.setItem("isLoggedIn", "true");
    setIsslogin(true); 
    navigate("/dashboard");
  } else {
    alert("Password was incorrect, please check!!!");
  }
};


   


   return (
      <div className="main loginbg" >
        <div className="logincontiner loginbgcard"  style={{width:"30%"}}>
          <Text content="LOGIN" />
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              name="emailid"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             
            />

            <br />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <Button name='Login' />
           
          </form>
        </div>
      </div>
    );
  }

export default Login