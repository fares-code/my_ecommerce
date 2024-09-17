import { Link } from "react-router-dom";
import Layout from "../../../components/layout/layout";
import useCategory from "../../Hooks/useCategory";
import './Categories.css'; // Import custom CSS for styling

export default function Categories() {
    const categories = useCategory();
    
    return (
        <Layout>
            <div className="categories-container">
                <h1 className="categories-title">Categories</h1>
                <div className="categories-grid">
                    {categories.map((item) => (
                        <Link 
                            key={item._id} // Ensure a unique key for each link
                            to={`/category/${item.slug}`} // Update the route as needed
                            className="category-button"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
