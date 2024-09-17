
import { useEffect, useState } from "react";
import Cookie from 'cookie-universal';
import { Outlet } from "react-router-dom";
import { AxiosCreate } from "../../../components/Axios/Axios";
import { GETUSR } from "../../../components/Api/Api";
const cookie = Cookie();
const token = cookie.get("EComerce")



export default function UserDetais(){

    const [curntuser,setCurnUser]=useState({})
    useEffect(() => {
  const getUser = async () => {
    try {
      const res = await AxiosCreate.get(`${GETUSR}`);
     
      setCurnUser(res.data.user)
    } catch (error) {
      console.error(error); // Corrected error handling
    }
  };

  if (token) {
    getUser(); // Call the async function if the token exists
  }
}, [token]);


    return(   <>
        <h1>
          Welcome <span style={{ color: "red" }}>{curntuser.name}</span>
        </h1>
  
       <div > <h3 className="text-muted">Your Number: {curntuser.phone}</h3>
        <h3 className="text-muted">Your Address: {curntuser.address}</h3>
        <h3 className="text-muted">Your Email: {curntuser.email}</h3></div>
  
        <div className="container-fluid p-0 admin-dashboard" style={{width:"100%"}}>
          <div className="row no-gutters" style={{width:"100%"}}>
            <div className="col-md-9" >
              <div className="d-flex justify-content-center align-items-center card mt-5"
              >
                < Outlet /> {/* Render nested routes here */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
}