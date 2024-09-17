import { useNavigate } from "react-router-dom";
import { useSearch } from "../components/Context/SearchContext";
import Layout from "../components/layout/layout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../components/Context/Cart.js";
export default function SearchPage() {
    const [product, setProduct] = useSearch();
    const [cart,setCart]=useCart([])
    const [loading, setLoading] = useState(false);
const nav = useNavigate();
    // Convert Buffer to Base64
    const convertBufferToBase64 = (buffer) => {
        const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        return `data:image/jpeg;base64,${btoa(binary)}`;
    };







    
    return (
        <Layout title="Search Results">
            <div className="search-container mt-5">
                <h4 className="search-result-header">
                    {product.result.length < 1 ? "No Products Found" : `Found ${product.result.length}`}
                </h4>
                
                <div className="d-flex flex-wrap justify-content-center product-grid">
                    {loading ? (
                        <h4 className="text-center">Loading Products...</h4>
                    ) : product && product.result.length > 0 ? (
                        product.result.map((prod, index) => (
                            <div className="card product-card m-2" key={index}>
                                {prod.photo && prod.photo.data && prod.photo.data.data ? (
                                    <img
                                        src={convertBufferToBase64(prod.photo.data.data)}
                                        className="card-img-top product-image"
                                        alt={prod.des}
                                    />
                                ) : (
                                    <img
                                        src="default-image.jpg"
                                        className="card-img-top product-image"
                                        alt="No image available"
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{prod.name}</h5>
                                    <p className="card-text">{prod.des}</p>
                                    <p className="card-text">Quantity: {prod.quantity}</p>
                                    <p className="card-text">Price: ${prod.price}</p>
                                    <button className="btn btn-primary  product-btn me-2"  onClick={()=>{nav(`/product/${prod.slug}`)}} >Show Details</button>
                                    <button className="btn btn-secondary product-btn" 
                                        onClick={()=>{
                                            setCart([...cart,prod])
                                            localStorage.setItem("cart",JSON.stringify([...cart,prod]))
                                            toast.success("Item Was Added")
                                        }}
                                        >Add to cart</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h4 className="text-center">No Products Found</h4>
                    )}
                </div>
            </div>
        </Layout>
    );
}
