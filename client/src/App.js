
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import About from './pages/About';
import Policy from './pages/policy'; // Make sure this matches the file path
import Contact from './pages/Contact';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import RequireAuth from './pages/Auth/RequireAuth';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import AdminDashboardRoute from './pages/Dashboard/AdminDashboardRoute';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import CreateCatgeory from './pages/Auth/Admin/CreateCatgeory';
import CreatePrduct from './pages/Auth/Admin/CreatePrduct';
import AdminDetais from './pages/Dashboard/AdminDetails';
import UserDashboard from './pages/Auth/User/UserDashboard';
import UserDetais from './pages/Auth/User/UserDetails';
import Orders from './pages/Auth/User/Orders';
import Profile from './pages/Auth/User/Profile';
import Products from './pages/Auth/Admin/Products';
import UpdateProduct from './pages/Auth/Admin/UpdateProduct';
import SearchPage from './pages/SaerchPage';
import ProductDetails from './pages/ProductDeatails';
import Categories from './pages/Auth/Admin/Catgegoreis';
import CategoryProduct from './pages/Auth/Admin/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Auth/Admin/AdminOrders';
// Assuming this is your auth component
function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/categoreis' element={<Categories />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/category/:slug' element={<CategoryProduct />} />
      <Route path='/product/:slug' element={<ProductDetails />} />
      <Route path='/search' element={<SearchPage />} />
      {/* Protected routes */}


      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/forgot-password' element={<ForgotPassword />} />



      {/*User protect */}
      <Route element={<RequireAuth />}>
        <Route path='/dashboard' element={<UserDashboard />} >
          <Route path='user' element={<UserDetais />}>
            <Route path='orders' element={<Orders />} />
            <Route path='profile' element={<Profile/>} />
          </Route>
        </Route>
      </Route>


      {/*Admin protect */}
      <Route element={<AdminDashboardRoute />}>
        <Route path='/dashboard' element={<AdminDashboard />}  >
          <Route path='admin' element={<AdminDetais />}   >
            <Route path='create-category' element={<CreateCatgeory />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='create-product' element={<CreatePrduct />} />
            <Route path='product' element={<Products />} />
            <Route path='product/:slug' element={<UpdateProduct />} />
          
          </Route>
        </Route>

      </Route>






      <Route element={<RequireAuth />}>
        <Route path='/about' element={<About />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/contact' element={<Contact />} />
      </Route>


      <Route path='*' element={<Pagenotfound />} />
    </Routes>
  );
}

export default App;



