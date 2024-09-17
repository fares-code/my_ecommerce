import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookie from 'cookie-universal';
import { Link } from "react-router-dom";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [Loading,setLoading]=useState(false)
    // Get token from cookie
    const cookie = Cookie();
    const token = cookie.get("EComerce");

    // Get All Products
    const GetAllProducts = async function () {
        try {
            setLoading(true)
            const res = await axios.get("https://my-ecommerce-smoky.vercel.app/api/v1/product/get-products", {
                headers: {
                    Authorization: token
                }
            });
            console.log(res.data.products);
            setProducts(res.data.products);
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error("Error on get Products");
        }
    };

    // Convert Buffer to Base64
    const convertBufferToBase64 = (buffer) => {
        const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        return `data:image/jpeg;base64,${btoa(binary)}`;
    };

    // Fetch products on component mount
    useEffect(() => {
        GetAllProducts();
    }, []);

    return (
        <div className="container">
            <div className="col-md-9">
                <h1 className="text-center">List of Products</h1>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-start">
                {!Loading ? products.map((prod, index) => (
                    <div className="card m-2" style={{ width: '18rem' }} key={index}>
                        <Link className="card-link" to={prod.slug}>
                            <img
                                src={convertBufferToBase64(prod.photo.data.data)}
                                className="card-img-top"
                                alt={prod.des}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{prod.name}</h5>
                                <p className="card-text">{prod.des}</p>
                                <p className="card-text">Quantity: {prod.quantity}</p>
                                <p className="card-text">Price: {prod.price}</p>
                                
                            </div>
                        </Link>
                    </div>
                )):<h4 className="text-center">Loading Products ......</h4>}
            </div>
        </div>
    );
}
