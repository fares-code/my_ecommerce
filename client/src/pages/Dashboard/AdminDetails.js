import { AxiosCreate } from "../../components/Axios/Axios";
import { GETUSR } from "../../components/Api/Api";
import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";




export default function AdminDetais(){

    const [curntuser,setCurnUser]=useState({})
    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await AxiosCreate.get(`${GETUSR}`);
          setCurnUser(res.data.user);
        } catch (error) {
          console.error(error);
        }
      };
    
      getUser(); // Call the async function
    }, []); // Empty dependency array
    


    return(   <>
        <h1>
          Welcome <span style={{ color: "red" }}>{curntuser.name}</span>
        </h1>
  
       <div >
        <h3 className="text-muted">Your Email: <span style={{color:"blue"}}> {curntuser.email}</span></h3>
       <h3 className="text-muted">Your Number:<span style={{color:"blue"}}> {curntuser.phone}</span></h3>
        <h3 className="text-muted">Your Address: <span style={{color:"blue"}}> {curntuser.address}</span> </h3>
        </div> 
  
        <div className="container-fluid p-0 admin-dashboard" style={{width:"100%"}}>
          <div className="row no-gutters" style={{width:"100%"}}>
            <div className="col-md-9" >
              <div className="card w-100 p-4 admin-card">
                <Outlet /> {/* Render nested routes here */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
}