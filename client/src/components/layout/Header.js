import { NavLink, Link, useNavigate } from "react-router-dom";
import { AxiosCreate } from "../../components/Axios/Axios.js";
import Cookie from 'cookie-universal';
import { useEffect, useState } from "react";
import { GETUSR } from "../Api/Api.js";
import { MdLocalGroceryStore } from "react-icons/md";
import SearchForm from "../Form/SearchForm.js";
import useCategory from "../../pages/Hooks/useCategory.js";
import { useCart } from "../Context/Cart.js";
import { Badge } from "antd";
export default function Header() {
  const [cart ]=useCart()
  const cookies = Cookie();
  const [currentUserName, setCurrentUserName] = useState("");
  const [role, setRole] = useState("");
  const token = cookies.get("EComerce");
  const nav = useNavigate();
const categories = useCategory();
  function handleLogout() {
    cookies.remove("EComerce");
    nav("/login");
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await AxiosCreate.get(`/${GETUSR}`);
       
        setCurrentUserName(res.data.user.name);
        setRole(res.data.user.role);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) { // Ensure token exists before making the request
      getUser();
    }
  }, [token]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{ fontWeight: '700' }} to="/"> <MdLocalGroceryStore /> <span > FARES STORE </span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchForm/>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>







              <li className="nav-item">
  <div className="dropdown">
    <Link className="btn dropdown-toggle" role="button" data-bs-toggle="dropdown">
      Categories
    </Link>

    <ul className="dropdown-menu">
      <li>
        <Link className="dropdown-item" to="/categoreis">All Categories</Link>
     
      {categories.map((item) => (
       
          <Link className="dropdown-item" to={`/category/${item.slug}`}>
            {item.name}
          </Link>
        
      ))}
   </li>
    </ul>
  </div>
</li>
         










<li className="nav-item pt-2" style={{ paddingRight: "20px" }}>
                <Badge count={cart.length} showZero>
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                </Badge>
              </li>
              <li className="nav-item dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {token ? currentUserName : 'Account'}
                </button>
                <ul className="dropdown-menu" style={{ width: 'fit-content' }}>
                  {!token ? (
                    <>
                      <li><NavLink className="dropdown-item" to="/register">Register</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/login">Login</NavLink></li>
                    </>
                  ) : (<>
                    <li><NavLink className="dropdown-item" onClick={handleLogout} to="/login">Logout</NavLink></li>
                    <li>
  <NavLink 
    className="dropdown-item" 
    to={role === 1 ? '/dashboard/admin' : '/dashboard/user'}
  >
    Dashboard
  </NavLink>
</li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
