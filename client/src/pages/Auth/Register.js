import { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from 'axios';

import { BASEURL, REGISTER } from "../../components/Api/Api";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
export default function Reguster() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    address: "",
    name: "",
    answer:""
  });
  const nav =useNavigate();
  function handlechange(e) {


    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function   handlesubmit  (e){
e.preventDefault();
try {
  const res= await axios.post(`${BASEURL}/${REGISTER}`,form)
  console.log(res);
toast.success("Register successed")
  nav('/login');
} catch (error) {
  console.log(error);
  toast.error("Some thing was error ")
}
}
  
  return (
    <Layout title={"ECommerce-Register"}>
      <div className="register">

        <form  onSubmit={handlesubmit} ><h1>Register Now</h1>
        <div className="mb-3">

            <input type="email" value={form.email} onChange={handlechange} name="email" className="form-control" placeholder="Enter Your Email....." />
          </div>
          <div className="mb-3">

            <input type="password" value={form.password} onChange={handlechange} name="password" className="form-control" placeholder="Enter Your password....." />
          </div>
         

          <div className="mb-3">

<input type="text" value={form.name} onChange={handlechange} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Name....." />

</div>
          <div className="mb-3">

            <input type="text" value={form.address} onChange={handlechange} name="address" className="form-control" placeholder="Enter Your Address....." />
          </div>
          <div className="mb-3">

            <input type="number" value={form.phone} onChange={handlechange} name="phone" className="form-control" placeholder="Enter Your Phone....." />
          </div>
          <div className="mb-3">

            <input type="text" value={form.answer} onChange={handlechange} name="answer" className="form-control" placeholder="Enter Your Favourite Sports....." />
          </div>
          <button 
  type="submit" 
  className="btn btn-primary" 
  style={{
    backgroundColor: "#007bff",   /* Bootstrap primary color */
    color: "white",
    borderRadius: "30px",         /* Rounded corners */
    padding: "10px 20px",         /* Padding */
    border: "none",
    marginBottom:"20px",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    cursor: "pointer"
  }}
 onClick={()=>{nav('/forgot-password')}}
>
  Forget Password
</button>
      
          
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>




    </Layout>
  );
}