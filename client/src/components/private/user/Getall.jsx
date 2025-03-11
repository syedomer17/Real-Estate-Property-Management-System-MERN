import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetAll = () => {
  const [users, setUsers] = useState([]); // Stores users
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [loading, setLoading] = useState(false); // Loading state for delete

  // Function to fetch all users
  async function getAll() {
    try {
      const response = await axios.get(
        "http://localhost:8090/api/private/user/getall"
      );

      if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
        toast.success("Users fetched successfully!");
        setIsOpen(true);
      } else {
        toast.info("No users found.");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  }

  // Function to delete all users
  async function deleteAllUsers() {
    if (users.length === 0) {
      toast.info("No users to delete.");
      return;
    }

    setLoading(true);
    try {
      await axios.delete("http://localhost:8090/api/private/user/deleteall");
      toast.success("All users deleted successfully!");
      setUsers([]);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting users:", error);
      toast.error("Failed to delete users.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Get All Users
      </h1>

      {/* Fetch Users Button */}
      <button
        onClick={getAll}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md transition duration-200"
      >
        Fetch Users
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition duration-200"
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Users List
            </h3>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Role</th>
                    <th className="p-2 border">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="text-center bg-gray-50 hover:bg-gray-100 transition duration-200"
                      >
                        <td className="p-2 border">{user._id}</td>
                        <td className="p-2 border">{user.userName || "N/A"}</td>
                        <td className="p-2 border">{user.email || "N/A"}</td>
                        <td className="p-2 border">{user.role || "N/A"}</td>
                        <td className="p-2 border">
                          {user.userVerified?.email ? "✅ Yes" : "❌ No"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Delete All Users Button */}
            {users.length > 0 && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={deleteAllUsers}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md shadow-md transition duration-200"
                >
                  {loading ? "Deleting..." : "Delete All Users"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default GetAll;
