import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from 'antd';
import Cookie from 'cookie-universal';
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function UpdateProduct() {
    const cookie = new Cookie();
    const token = cookie.get("EComerce");
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});
    const [photo, setPhoto] = useState(null); // Only store file object here
    const [oldPhoto, setOldPhoto] = useState(null); // Store old photo URL
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState(null);
    const [id, setId] = useState(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        des: "",
        price: "",
        quantity: "",
    });

    // Convert Buffer to Base64
    const convertBufferToBase64 = (buffer) => {
        const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        return `data:image/jpeg;base64,${btoa(binary)}`;
    };

    // Fetch Product Data
    const getOneProduct = async () => {
        try {
            const slug = window.location.pathname.split('/').pop();
            const { data } = await axios.get(`https://my-ecommerce-smoky.vercel.app/api/v1/product/get-singProduct/${slug}`, { headers: { Authorization: token } });

            if (data.success) {
                setForm({
                    name: data.oneProduct.name,
                    des: data.oneProduct.des,
                    price: data.oneProduct.price,
                    quantity: data.oneProduct.quantity,
                });
                setProduct(data.oneProduct);
                setId(data.oneProduct._id);
                setCategory(data.oneProduct.category.name);
console.log(
data);

                // Check if old photo data exists
                if (data.oneProduct.photo && data.oneProduct.photo.data) {
                    const base64Photo = convertBufferToBase64(data.oneProduct.photo.data.data);
                    setOldPhoto(base64Photo);
                } else {
                    console.log('No photo data found');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Cannot get Product");
        }
    };

    // Fetch Categories Data
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

    useEffect(() => {
        getCategories();
        getOneProduct();
    }, []);

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const HandelUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('des', form.des);
        formData.append('price', form.price);
        formData.append('quantity', form.quantity);
        formData.append('category', category);
        if (photo) {
            formData.append('photo', photo);
        }
        formData.append('shipping', shipping);

        try {
            const { data } = await axios.put(`https://my-ecommerce-smoky.vercel.app/api/v1/product/update-product/${id}`, formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (data.success) {
                toast.success(`${form.name} is Updated in Category ${category}`);
                navigate('/dashboard/admin/product');
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to Update product");
        }
    };

    return (
        <div className="col-md-9">
            <h1 className="text-center">Update Product</h1>
            <form onSubmit={HandelUpdate}>
                <Select
                    bordered={false}
                    showSearch
                    placeholder="Select Category"
                    size="large"
                    className="form-select mb-3"
                    value={category}
                    onChange={(value) => setCategory(value)}
                >
                    {categories.map((item) => (
                        <Option key={item._id} value={item._id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
                <div className="mb-3">
                    <label
                        htmlFor="Photo"
                        className="btn btn-outline-secondary col-md-12"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            backgroundColor: '#f0f0f0',
                            border: '1px solid #ccc',
                            color: "black",
                            textAlign: 'center',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        {photo ? photo.name : "Select Photo"}
                        <input
                            type="file"
                            id="Photo"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => {
                                setPhoto(e.target.files[0]);
                            }}
                            style={{ display: 'none' }}
                        />
                    </label>
                    <div className="mb-3 mt-4 text-center">
                        {photo ? (
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="product_Photo"
                                height="300px"
                                className="img img-responsive"
                            />
                        ) : oldPhoto ? (
                            <img
                                src={oldPhoto}
                                alt="product_Photo"
                                height="300px"
                                className="img img-responsive"
                            />
                        ) : (
                            <p>No photo available</p>
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        placeholder="Enter Name..."
                        onChange={handleForm}
                        className="form-control styled-input"
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        name="des"
                        value={form.des}
                        placeholder="Enter Description..."
                        onChange={handleForm}
                        className="form-control styled-textarea"
                        rows="4"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        placeholder="Enter Quantity..."
                        onChange={handleForm}
                        className="form-control styled-input"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        placeholder="Enter Price..."
                        onChange={handleForm}
                        className="form-control styled-input"
                    />
                </div>
                <div className="mb-3">
                    <Select
                        showSearch
                        bordered={false}
                        size="large"
                        placeholder="Select Shipping"
                        className="form-select mb-3 col-md-12"
                        style={{ color: "black" }}
                        value={shipping}
                        onChange={(value) => setShipping(value)}
                    >
                        <Option value="1">True</Option>
                        <Option value="0">False</Option>
                    </Select>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary col-md-12">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
