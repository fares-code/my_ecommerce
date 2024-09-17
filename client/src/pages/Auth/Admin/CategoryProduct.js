import axios from "axios";
import Layout from "../../../components/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../components/Context/Cart.js";
export default function CategoryProduct() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart,setCart]=useCart([])
  const nav = useNavigate();

console.log(category);

  useEffect(() => {
    getproductsByCategory();
  }, [slug]);

  const getproductsByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://my-ecommerce-smoky.vercel.app/api/v1/product/product-category/${slug}`);
      setLoading(false);
      setCategory(data.category); // Wrap category in array for mapping
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Convert Buffer to Base64
  const convertBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };

  return (
    <Layout>
      <div className="container mt-3 pb-50">
       {category.map((item)=>{
        return(
        <h1  className="text-center">Category - {item.name}</h1>)
       })}
          
       

        <h2 className="text-center text-top">We Have {products.length} Product(s) in this Category</h2>

        <div className="products-section col-md-9">
          <h1 className="text-center section-title">All Products</h1>

          <div style={{width:"1000px"}} className="product-list d-flex flex-wrap justify-content-around">
            {loading ? (
              <h4 className="text-center">Loading Products...</h4>
            ) : products && products.length > 0 ? (
              products.map((prod, index) => (
                <div className="card product-card m-2" key={index} style={{ width: "18rem" }}>
                  <img
                    src={convertBufferToBase64(prod.photo.data.data)}
                    className="card-img-top product-image"
                    alt={prod.des}
                    style={{ height: "200px", objectFit: "cover" }} // Ensure image fits well
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
        </div>
      </div>
    </Layout>
  );
}
