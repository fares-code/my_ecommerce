import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../../components/Form/CategoryForm";
import Cookie from 'cookie-universal';
import { Button, Modal } from 'antd';

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [selected, setSelected] = useState(null);

  const cookie = Cookie();
  const token = cookie.get("EComerce");

  // Get All Categories
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
  }, []);

  // Handle Submit (Create Category)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/category/create-category", { name }, {
        headers: {
          Authorization: token
        }
      });

      if (data.success) {
        toast.success(`${data.newCategory.name} was created successfully`);
        setName('');  // Clear input field
        getCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating the category");
    }
  };

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selected) {
      toast.error("No category selected for update");
      return;
    }
    try {
      await axios.put(`http://localhost:4000/api/v1/category/update-category/${selected._id}`, { name: updateName }, {
        headers: {
          Authorization: token
        }
      });
      toast.success("Category updated successfully");
      setUpdateName('');
      setSelected(null);
      setVisible(false);  // Close the modal
      getCategories();    // Refresh the category list
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the category");
    }
  };

  // Handle Delete
  const handleDelete = async (PID) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/category/delete-category/${PID}`, {
        headers: {
          Authorization: token
        }
      });
      toast.success("Category deleted successfully");
      setSelected(null);
      getCategories();  // Refresh the category list
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the category");
    }
  };

  return (
    <>
      <h1>Manage Category</h1>
      <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
      <table className="table caption-top" style={{ width: "100%" }}>
        <caption className="text-center">
          <h3>List Of Categories</h3>
        </caption>
        <thead>
          <tr>
            <th scope="col" style={{ width: "95%" }}>Name</th>
            <th scope="col" style={{ width: "5%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => {
            console.log(item);
            return (
              <tr key={index}>
                <td style={{ fontSize: '20px', fontStyle: "oblique" }}>{item.name}</td>
                <td>
                  <button
                    onClick={() => {
                      setVisible(true);
                      setUpdateName(item.name);
                      setSelected(item);  // Set the selected category
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        title={'Edit Category'}
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
      </Modal>
    </>
  );
}
