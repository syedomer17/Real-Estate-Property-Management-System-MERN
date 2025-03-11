import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetById = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  const fetchUser = async () => {
    if (!userId.trim()) {
      toast.error("Please enter a valid User ID");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8090/api/private/user/getbyid/${userId}`
      );
      if (!response.data || !response.data._id) {
        toast.error("User not found!");
        setUser(null);
        return;
      }
      setUser(response.data);
      setUpdatedUser(response.data);
      setShowPopup(true);
      toast.success("User fetched successfully!");
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user. Check the ID.");
      setUser(null);
    }
  };

  const deleteUser = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:8090/api/private/user/deletebyid/${user._id}`
      );
      toast.success("User deleted successfully!");
      setUser(null);
      setShowPopup(false);
      setUserId("");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Try again.");
    }
    setLoading(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8090/api/private/user/editbyid/${user._id}`,
        updatedUser
      );
      toast.success("User updated successfully!");
      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Get User By ID
      </h1>

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md transition duration-200"
        >
          Fetch User
        </button>
      </div>

      {showPopup && user && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-lg transition duration-200"
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              User Details
            </h3>
            {editing ? (
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  name="userName"
                  value={updatedUser.userName || ""}
                  onChange={handleChange}
                  className="border p-2"
                />
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email || ""}
                  onChange={handleChange}
                  className="border p-2"
                />
                <input
                  type="text"
                  name="phone"
                  value={updatedUser.phone || ""}
                  onChange={handleChange}
                  className="border p-2"
                />
                <input
                  type="text"
                  name="role"
                  value={updatedUser.role || ""}
                  onChange={handleChange}
                  className="border p-2"
                />
              </div>
            ) : (
              <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
                <tbody>
                  <tr>
                    <td>ID:</td>
                    <td>{user._id}</td>
                  </tr>
                  <tr>
                    <td>Name:</td>
                    <td>{user.userName || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{user.email || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>{user.phone || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Role:</td>
                    <td>{user.role || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Verified:</td>
                    <td>{user.userVerified?.email ? "✅ Yes" : "❌ No"}</td>
                  </tr>
                </tbody>
              </table>
            )}

            <div className="flex justify-end mt-4 space-x-2">
              {editing ? (
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-md transition duration-200"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-md shadow-md transition duration-200"
                >
                  Edit User
                </button>
              )}
              <button
                onClick={deleteUser}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md shadow-md transition duration-200"
              >
                {loading ? "Deleting..." : "Delete User"}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default GetById;
