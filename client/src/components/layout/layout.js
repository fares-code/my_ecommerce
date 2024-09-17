import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import  { Toaster } from 'react-hot-toast';

export default function Layout({
  children,
  title = "ECommerce shop now",
  description = "Mern stack project",
  keyword = "mern reactjs react js nodejs express mongodb",
  auth = "Fare Mohamed"
}) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={auth} />
        <title>{title}</title>
      </Helmet>

      <Header />
    
      <main style={{
  minHeight: "80vh",
  width: "95%",
  display: "flex",
alignItems:"center",
marginRight:"80px"
 , justifyContent: "center", // Centers items horizontally
   // Incorrect, should be a valid value like "center"
}}
>
  <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
}
