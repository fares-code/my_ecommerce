import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./proDetails.css"; // Add a custom CSS file

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
console.log(relatedProducts);

  // Initialize product details
  useEffect(() => {
    if (params.slug) getProduct();
  }, [params.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://my-ecommerce-smoky.vercel.app/api/v1/product/get-singProduct/${params.slug}`
      );
      setProduct(data.oneProduct);
      RelatedProducts(data.oneProduct._id,data.oneProduct.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //Get related Products
  const RelatedProducts = async(pid,cid)=>{
    try {
      const res= await axios.get(`https://my-ecommerce-smoky.vercel.app/api/v1/product/related-product/${pid}/${cid}`)
      console.log(res.data.products);
      setRelatedProducts(res.data.products)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  // Convert Buffer to Base64
  const convertBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };

  return (
    <Layout>
    {/* Main Product Section */}
    <div className="product-details-container">
      {product ? (
        <>
          <div className="product-image-container">
            <img
              src={convertBufferToBase64(product.photo.data.data)}
              className="product-image"
              alt={product.des}
            />
          </div>
          <div className="product-info">
            <h5>NAME: {product.name}</h5>
            <h6>Description: {product.des}</h6>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category.name}</p>
            <button className="btn btn-secondary">ADD TO CART</button>
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>

    {/* Related Products Section */}
    <div className="related-products-container">
      <h3>Related Products</h3>
      <div className="related-products-grid">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct, index) => (
            <div className="related-product-item" key={index}>
              <img
                src={convertBufferToBase64(relatedProduct.photo.data.data)}
                alt={relatedProduct.name}
                className="related-product-image"
              />
              <h5>{relatedProduct.name}</h5>
              <p>Price: ${relatedProduct.price}</p>
              <button className="btn btn-secondary">ADD TO CART</button>
            </div>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  </Layout>
  );
}
