import { useEffect, useState } from "react";
import Cookie from 'cookie-universal';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { BASEURL, UPDATE } from "../../../components/Api/Api";
import axios from "axios";
import { useAuth } from "../../../components/Context/authContex";

export default function Profile() {
  const cookie = Cookie();
  const [auth, setAuth] = useAuth();
  const token = cookie.get("EComerce");
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    address: "",
    name: "",
    answer: ""
  });

  useEffect(()=>{
const {address,answer,email,name, phone} = auth?.user

setForm({
  ...form,
  name:name,
  address:address,
  answer:answer,
  email:email,
  phone:phone
});
  },[])
  const nav = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${BASEURL}/${UPDATE}`, form, {
        headers: { Authorization: token }
      });
      console.log(data);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });

        let ls = localStorage.getItem("user");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;


        localStorage.setItem("user", JSON.stringify(ls));
        toast.success("Updated successfully");
        nav('/dashboard/user');
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the profile.");
    }
  }

  return (
    <div className="register mt-5 me-5" >
      <form onSubmit={handleSubmit}>
        <h1>Update Now</h1>

        <div className="mb-3">
          <input
            type="email"
            value={form.email}
            onChange={handleChange}
            name="email"
            className="form-control"
            placeholder="Enter Your Email....."
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={form.password}
            onChange={handleChange}
            name="password"
            className="form-control"
            placeholder="Enter Your Password....."
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={form.name}
            onChange={handleChange}
            name="name"
            className="form-control"
            placeholder="Enter Your Name....."
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={form.address}
            onChange={handleChange}
            name="address"
            className="form-control"
            placeholder="Enter Your Address....."
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={form.phone}
            onChange={handleChange}
            name="phone"
            className="form-control"
            placeholder="Enter Your Phone....."
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={form.answer}
            onChange={handleChange}
            name="answer"
            className="form-control"
            placeholder="Enter Your Favourite Sports....."
          />
        </div>

        <button
          type="button"  // Changed to 'button' to avoid form submission
          className="btn btn-primary"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "30px",
            padding: "10px 20px",
            border: "none",
            marginBottom: "20px",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
            cursor: "pointer"
          }}
          onClick={() => { nav('/forgot-password'); }}
        >
          Forgot Password
        </button>

        <button
          disabled={!form.name || !form.email}  // Ensure both name and email are filled
          type="submit"
          className="btn btn-primary"
        >
          Update
        </button>
      </form>
    </div>
  );
}
