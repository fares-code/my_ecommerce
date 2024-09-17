import { useState } from "react";
import Layout from "../../components/layout/layout";
import {  LOGIN } from "../../components/Api/Api";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Cookie from 'cookie-universal'
import { AxiosCreate } from "../../components/Axios/Axios";
import { useAuth } from "../../components/Context/authContex.js";
export default function Login(){
  const cookies = Cookie();
const [auth,setAuth]=useAuth()



    function handlechange(e) {


        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      }
    
    
    
    
      async function   handlesubmit  (e){
        e.preventDefault();
        try {
          const res= await AxiosCreate.post(`/${LOGIN}`,form);
        console.log(res.data.user);
        localStorage.setItem("user",JSON.stringify(res.data.user));
          setAuth({...auth,
            user:res.data.user
          });
        toast.success("Login successed")
        cookies.set("EComerce",res.data.token);
          window.location.pathname='/';
        } catch (error) {
          console.log(error);
          toast.error("Some thing was error ")
        }
        }
    
    const [form, setForm] = useState({
        email: "",
        password: ""
      
      });
      const nav =useNavigate();





return(
    <Layout title={"ECommerce-Register"}>
    <div className="register">

      <form  onSubmit={handlesubmit} ><h1>Login Now</h1>
      <div className="mb-3">

          <input type="email" value={form.email} onChange={handlechange} name="email" className="form-control" placeholder="Enter Your Email....." />
        </div>
        <div className="mb-3">

          <input type="password" value={form.password} onChange={handlechange} name="password" className="form-control" placeholder="Enter Your password....." />
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

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>




  </Layout>
)
}