import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCategory() {
    
    const [categories, setCategories] = useState([]);

    // Fetch Categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/v1/category/get-categorys');
          
            
            setCategories(data.AllCategories || []); // Ensure it's an array
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}
