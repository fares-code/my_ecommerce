import Layout from "../components/layout/layout";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Prices } from "../Prices";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Context/Cart";
export default function Homepage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [cart,setCart]=useCart([])
const nav =useNavigate()
    // Get all categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get('https://my-ecommerce-smoky.vercel.app/api/v1/category/get-categorys');
            if (data.success) {
                setCategories(data.AllCategories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load categories");
        }
    };
    // Get all products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://my-ecommerce-smoky.vercel.app/api/v1/product/product-list/${page}`);
            setProducts(res.data.products);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Error getting products");
            setLoading(false);
        }
    };
    // Get filtered products
    const getFilteredProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.post("https://my-ecommerce-smoky.vercel.app/api/v1/product/product-filters", { checked, radio });
            setProducts(res.data.products);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Error getting filtered products");
            setLoading(false);
        }
    };

    // Get number of products
    const GetNumberOfProducts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get("https://my-ecommerce-smoky.vercel.app/api/v1/product/product-count");
            setTotal(res.data.total);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Error getting number of products");
            setLoading(false);
        }
    }, []);

    // Load more products
    const LoadMore = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://my-ecommerce-smoky.vercel.app/api/v1/product/product-list/${page}`);
            setProducts([...products, ...res.data.products]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Error getting more products");
            setLoading(false);
        }
    };

    // Convert Buffer to Base64
    const convertBufferToBase64 = (buffer) => {
        const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        return `data:image/jpeg;base64,${btoa(binary)}`;
    };

    // Handle category checkbox toggle
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        getCategories();
        GetNumberOfProducts();
        getAllProducts(); // Load initial products
    }, []);

    useEffect(() => {
        if (!checked.length && !radio.length) {
            getAllProducts(); // Load all products when no filters are applied
        } else {
            getFilteredProducts();
        }
    }, [checked, radio]);

    useEffect(() => {
        LoadMore(); // Load more products when the page number changes
    }, [page]);

    return (
        <Layout title="Best Products-Home Page">
            <div className="container-fluid homepage-container">
                {/* Filter Section */}
                <div className="filter-section col-md-3 mb-4">
                    <h5>Filter By Category</h5>
                    <div className="d-flex flex-column">
                        {categories.map((item) => (
                            <Checkbox 
                                key={item._id} 
                                onChange={(e) => handleFilter(e.target.checked, item._id)}
                            >
                                {item.name}
                            </Checkbox>
                        ))}
                    </div>
    
                    {/* Price Filter */}
                    <h5 className="mt-3">Filter By Price</h5>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices.map((item) => (
                                <Radio style={{ display: "block" }} value={item.array} key={item.name}>
                                    {item.name}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </div>
                    <button onClick={()=>{window.location.reload()}} className="btn btn-danger reset-btn">RESET FILTER</button>
                </div>
    
                {/* Products Section */}
                <div className="products-section col-md-9">
                    <h1 className="text-center section-title">All Products</h1>
                    <div className="product-list d-flex flex-wrap justify-content-center">
                        {loading ? (
                            <h4 className="text-center">Loading Products...</h4>
                        ) : products && products.length > 0 ? (
                            products.map((prod, index) => (
                                <div className="card product-card m-2" key={index}>
                                    <img
                                        src={convertBufferToBase64(prod.photo.data.data)}
                                        className="card-img-top product-image"
                                        alt={prod.des}
                                    />
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
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button className="btn btn-warning load-more-btn" onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}>
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
