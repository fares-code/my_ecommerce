import { useEffect, useState } from "react";
import { CHECKUSER } from "../../components/Api/Api.js";
import Cookie from 'cookie-universal';
import {  Outlet } from "react-router-dom";
import Loading from "../../components/Loading/Loading.js";
import { AxiosCreate } from "../../components/Axios/Axios.js";

export default function RequireAuth() {
  const [ok, setOk] = useState(false); // Default to false

  const cookies = Cookie();
  const token = cookies.get("EComerce");


  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await AxiosCreate.get(`/${CHECKUSER}`);
      console.log(res.data.ok)
        
        if (res.data.ok && token) {

          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
        console.error(error);
      }
    };
  
    checkUser();
  }, [token]);

return ok ? <Outlet/> : <Loading/>;
}
