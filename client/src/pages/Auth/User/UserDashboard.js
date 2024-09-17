import { Outlet } from "react-router-dom";

import UserMenue from "./UserMenue";
import Layout from "../../../components/layout/layout";

export default function UserDashboard(){
    return(
       <Layout title="User-Dashboard">
       
      <div className="container-fluid p-0 admin-dashboard">
        <div className="row no-gutters">
          {/* Admin Sidebar */}
          <div className="col-md-3">
            <UserMenue />
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