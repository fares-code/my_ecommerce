import Layout from "../components/layout/layout";
import { useAuth } from "../components/Context/authContex";
import Cookie from 'cookie-universal';
import { useCart } from "../components/Context/Cart";
import { Link, useNavigate } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react';
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function CartPage() {
    const [auth] = useAuth(); // Extract the auth context
    const [cart, setCart] = useCart([]);
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const [loading,setLoading]=useState(false)
    const cookie = Cookie();
    const token = cookie.get('EComerce');
    const userName = auth?.user?.name; // Safely access auth.user.name
    const nav = useNavigate()
    console.log( instance);
    console.log('Cart data being sent:', cart);

  

    // Convert Buffer to Base64
    const convertBufferToBase64 = (buffer) => {
        const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        return `data:image/jpeg;base64,${btoa(binary)}`;
    };

    // Remove item from the cart
    const handleRemoveItem = (indexToRemove) => {
        JSON.parse(localStorage.getItem("cart"));
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const TotalPrice = () => {
        let total = 0
        cart?.map((item) => total = total + item.price)
        return (
            <span style={{ color: "red" }}>{total.toLocaleString("en-US", {
                style: "currency",
                currency: "EGY"
            })}</span>
        )
    }

    //get payment getwat token
    const get_PaymentToken = async () => {
        try {
            const { data } = await axios.get("https://my-ecommerce-smoky.vercel.app/api/v1/product/braintree/token");
            console.log(data.clientToken);
            setClientToken(data.clientToken)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        get_PaymentToken();
    }, [token])


    const handelPayment = async () => {
        try {
            setLoading(true)
            const {nonce}= await instance.requestPaymentMethod();
            console.log("this is nonce");
            
            console.log(nonce);
const {data}= await axios.post("https://my-ecommerce-smoky.vercel.app/api/v1/product/braintree/payment",{cart,nonce},{headers:{Authorization:token}});
console.log(data);
setLoading(false)
localStorage.removeItem("cart")
setCart([])
nav('/dashboard/user/orders')
toast.success("Payment success")
        } catch (error) {
            console.log(error);
setLoading(false)
        }
    }
    return (
        <Layout title="Cart Page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center bg-light p-3 mb-4">
                        <h1>
                            {token && userName ? `Hello, ${userName}` : `Welcome to your cart. You have ${cart.length} items, please login to check out!`}
                        </h1>
                        {token && userName && (
                            <h2>This is your cart</h2>
                        )}
                    </div>

                    <div className="col-lg-9 col-md-12 products-section">
                        <h2 className="text-center section-title">All Products</h2>

                        <div className="product-list row">
                            {cart.length === 0 ? (
                                <h4 className="text-center">No Products Found In Cart</h4>
                            ) : (
                                cart.map((cartItem, index) => (
                                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={index}>
                                        <div className="card product-card h-100">
                                            <img
                                                src={convertBufferToBase64(cartItem.photo.data.data)}
                                                className="card-img-top product-image"
                                                alt={cartItem.des}
                                                style={{ height: "200px", objectFit: "cover" }} // Ensure image fits well
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <h3 className="card-title">Name: {cartItem.name}</h3>
                                                <h4 className="card-text">About: {cartItem.des}</h4>
                                                <h4 className="card-text">Price: <span style={{ color: "red" }}> {cartItem.price} LE</span></h4>

                                                <button
                                                    className="btn btn-danger mt-auto"
                                                    onClick={() => handleRemoveItem(index)}
                                                >
                                                    Remove Item
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="col-lg-3 col-md-12 cart-summary" style={{ padding: '20px' }}>
                        <div className="cart-summary-content bg-light p-4 rounded">
                            <h1>Cart Summary</h1>
                            <h3>Total Items: {cart.length}</h3>
                            <h4>Checkout | Payment | Total</h4>
                            <hr />
                            <h2>Total Price : {TotalPrice()}</h2>

                            {
                                auth?.user && token ? <h3>Address : <span style={{ color: "red" }}>{auth?.user.address}</span></h3> : ""
                            }

                            <button className="btn btn-outline-warning update-btn">
                                {token ? (
                                    <Link to={'/dashboard/user/profile'} className="link-style">
                                        Update Address
                                    </Link>
                                ) : (
                                    <Link to={'/login'} style={{ color: "black", textDecoration: "none" }}>
                                        Login to Checkout
                                    </Link>
                                )}
                            </button>
                            <div className="mt-2">

                                {clientToken && token && cart.length? (
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                          paypal:{flow:'vault'}
                                        }}
                                        onInstance={(way) => setInstance(way)}
                                    />
                                ):""
                            
                            }

                                <button

                                    className="btn btn-primary"
                                    onClick={handelPayment}
// disabled={!clientToken  || !loading || ! auth?.user.address}
                                >{loading ? 'processing....':"Make Payment"}</button>

                            </div>
                            {/* Add more cart summary details as needed */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional styling for responsiveness */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .products-section {
                        order: 2; // Push the products below the cart summary on smaller screens
                    }
                    .cart-summary {
                        order: 1; // Move cart summary to the top
                    }
                    .cart-summary-content {
                        margin-bottom: 20px; // Add spacing at the bottom
                    }
                }

                @media (max-width: 576px) {
                    .card-img-top {
                        height: 150px; // Adjust image height for smaller screens
                    }
                }

                .product-card {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s;
                }

                .product-card:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </Layout>
    );
}
