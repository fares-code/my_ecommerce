import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div style={{}} className="footer">
            <h4 className="text-center" style={{ color: 'white' }}>
                All Right Reserved &#169; FaresStore
            </h4>

            <p className="text-center" style={{ color: 'white', marginLeft: "-30px" }}>



                <Link to={'/about'}>About</Link>
                |
                <Link to={'/contact'}>Contact</Link>
                |
                <Link to={'/policy'}>Policy</Link>


            </p>







           </div>
      
    );
}
