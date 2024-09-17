import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import { AxiosCreate } from "../../components/Axios/Axios";
import { RESETPASSWORD } from "../../components/Api/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    answer: "",
    newpassword: "",
  });

  const navigate = useNavigate();

  // Handle form changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await AxiosCreate.post(`/${RESETPASSWORD}`, form);
      console.log(res.data);
      navigate('/login');
      toast.success("Password reset successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Reset password"}>
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Answer to Security Question:</label>
            <input
              type="text"
              name="answer"
              className="form-control"
              value={form.answer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newpassword"
              className="form-control"
              value={form.newpassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  );
}

  