import Dashboard from "components/Dashboard";
import React,{useEffect, useState} from "react";

// core components
//import { Container } from "reactstrap";


const ProfilePage = (props)=>{

  const [name,setName] = useState("")
  const [isvalid,setIsvalid] = useState(false)
  const {setIsLoggedIn} = props

  useEffect(()=>{
    let token = localStorage.getItem("token")
    //console.log(token)
    if(token){
      fetch('http://localhost:5000/verify',{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "authorization": token,
        }
    })
    .then(async (res)=>{
      let data = await res.json()
      console.log(data)
      if(data.message==="Valid"){
        setName(data.userName)
        setIsvalid(true)
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    })
    .catch((error)=>console.log(error))
    }else{
      // pass
    }
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
            {isvalid ?
            <Dashboard name={name}/>
            : <div className="content">
              <h2>Kindly Login to go to dashboard</h2>
              </div>
            }
          </div>
          
          
          
        </div>
      </>
  )
}

export default ProfilePage;
