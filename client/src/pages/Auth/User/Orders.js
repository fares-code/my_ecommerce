import axios from "axios";
import { useEffect, useState } from "react";
import Cookie from 'cookie-universal';
import toast from "react-hot-toast";
import moment from 'moment';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const cookie = Cookie();
    const token = cookie.get('EComerce');

    // Convert Buffer to Base64
    const convertBufferToBase64 = (buffer) => {
        const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        return `data:image/jpeg;base64,${btoa(binary)}`;
    };

    const getOrders = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/v1/product/orders", {
                headers: { Authorization: token }
            });
            setOrders(data); // Update state with fetched orders
        } catch (error) {
            toast.error(error.response?.data?.message || error.message); // Display error message
        }
    };

    useEffect(() => {
        getOrders();
    }, [token]);

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
                            <td>{order.status}</td>
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
