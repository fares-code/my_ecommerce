
import axios from "axios";
import { useEffect, useState } from "react";
import Cookie from 'cookie-universal';
import toast from "react-hot-toast";
import moment from 'moment';
import { Select } from "antd"
;
export default function AdminOrders() {
  const[status,setStatus]=useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]);
  const [changeStatus,setChangeStatus]=useState('')
  const [orders, setOrders] = useState([]);
  const cookie = Cookie();
  const token = cookie.get('EComerce');
  const { Option } = Select;
  // Convert Buffer to Base64
  const convertBufferToBase64 = (buffer) => {
      const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      return `data:image/jpeg;base64,${btoa(binary)}`;
  };

  const getAllOrders = async () => {
      try {
          const { data } = await axios.get("https://my-ecommerce-smoky.vercel.app/api/v1/product/all-orders", {
              headers: { Authorization: token }
          });
          setOrders(data); // Update state with fetched orders
      } catch (error) {
          toast.error(error.response?.data?.message || error.message); // Display error message
      }
  };

  useEffect(() => {
      getAllOrders();
  }, [token]);



const handelUpdate = async (orderId,value)=>{
try {
    await axios.put(`http://localhost:4000/api/v1/product/update-order/${orderId}`,{status:value},{headers:{Authorization:token}})
getAllOrders()
} catch (error) {
    console.log(error);
    
}
}


















  return (
<>
        <div className="border shadow col-md-12">
            <h1 className="text-center">All Orders</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td> <Select bordered={false} 
                            defaultValue={order.status} 
                             onChange={(value)=> {handelUpdate(order._id,value)}} >




                                {status.map((s,i)=>{
                                    return( <Option key={i} value={s}>{s}</Option>)
                                })}
                                
                                </Select></td>
                            <td>{order.buyer.name}</td>
                            <td>{moment(order.createdAt).fromNow()}</td>
                            <td>{order.payment.success ? 'Success' : 'Failed'}</td>
                            <td>{order?.products?.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Nested Product Tables */}
            {orders.map((order, orderIndex) => (
                <div key={orderIndex} className="container mt-4">
                    <h3>Products for Order #{orderIndex + 1}</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Product Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.products?.map((product, productIndex) => (
                                <tr key={`${orderIndex}-${productIndex}`}>
                                    <td>
                                        <img
                                            src={convertBufferToBase64(product.photo.data.data)}
                                            alt={product.des}
                                            style={{ height: "100px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.des}</td>
                                    <td style={{ color: "red" }}>{product.price} LE</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div> 
        </>
    );
  
}
