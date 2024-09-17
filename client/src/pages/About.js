import Layout from "../components/layout/layout";
import MyIMAGE from './Images/Aboutus.png';

export default function About() {
  return (
    <Layout title="ECommerce - About Us">
      <div style={{ padding: '20px', textAlign: 'center' }}> {/* Center the content */}
        {/* Center the image and make it responsive */}
        <img 
          src={MyIMAGE}
          alt="About Us"
          style={{ maxWidth: '30%', height: 'auto', display: 'block', margin: '0 auto' }} 
        />
        <h1 style={{ fontFamily: 'Teko, sans-serif',fontSize:"42px",fontWeight:"bold",color:"red" }}>About Us</h1>
        <p style={{ fontFamily: 'Teko, sans-serif',fontSize:"35px",fontWeight:"bold" }}>
  We are a company dedicated to providing the best service in our industry. Our mission is to make a positive impact on our community and customers.
</p>

      </div>
    </Layout>
  );
}
