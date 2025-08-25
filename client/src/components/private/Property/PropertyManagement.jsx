import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    price: "",
    status: "Available",
    image: null,
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/properties/getall"
        );
        if (Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setProperties([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
      }
    };
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("propertyName", formData.propertyName);
    data.append("address", formData.address);
    data.append("price", formData.price);
    data.append("status", formData.status);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:8090/api/properties/add",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProperties([...properties, response.data]);
      setFormData({
        propertyName: "",
        address: "",
        price: "",
        status: "Available",
        image: null,
      });
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8090/api/properties/deletebyid/${id}`
      );
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8090/api/properties/editbyid/${id}`,
        formData
      );
      setProperties(
        properties.map((property) =>
          property._id === id ? response.data : property
        )
      );
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Property Management
        </h1>

        {/* Property Submission Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-lg rounded-lg mb-8"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Add New Property
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              placeholder="Property Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Property
            </button>
          </div>
        </form>

        {/* Property Listing */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <motion.div
              key={property._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={property.image || "placeholder.jpg"}
                alt="Property"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {property.propertyName}
                </h2>
                <p className="text-gray-600 mt-2">{property.address}</p>
                <p className="text-gray-900 font-bold mt-2">
                  ${property.price}
                </p>
                <p
                  className={`mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {property.status}
                </p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(property._id)}
                    className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyManagement;
