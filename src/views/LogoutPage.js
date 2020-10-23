import React, { useEffect } from "react";

// core components
//import { Container } from "reactstrap";


const LogoutPage = (props)=>{

  const setIsLoggedIn = props.setIsLoggedIn

  useEffect(()=>{
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  },[setIsLoggedIn])


  return (
      <>
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
            <div className="content">
              <h2>You are Successfully logged out</h2>
          </div>
          </div>
          
          
          
        </div>
      </>
  )
}

export default LogoutPage;
