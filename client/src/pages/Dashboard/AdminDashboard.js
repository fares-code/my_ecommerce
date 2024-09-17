import { useEffect, useState } from "react";

import AdminMenue from "../Auth/Admin/AdminMenu";
import { AxiosCreate } from "../../components/Axios/Axios";
import { GETUSR } from "../../components/Api/Api";
import Cookie from 'cookie-universal';
import { Outlet } from "react-router-dom";
import Layout from "../../components/layout/layout";
export default function AdminDashboard (){
 const cookie = Cookie();
const token = cookie.get("EComerce")
const [curntuser,setCurnUser]=useState({})
console.log(curntuser);

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
return(
   <Layout>
      <div className="container-fluid p-0 admin-dashboard">
        <div className="row no-gutters">
          {/* Admin Sidebar */}
          <div className="col-md-3">
            <AdminMenue />
          </div>

          {/* Admin Content Area */}
          <div className="col-md-9">
            <div className="card w-100 p-4 admin-card">
             <Outlet/>
            </div>
          </div>
        </div>
      </div>
 </Layout>
    )
}