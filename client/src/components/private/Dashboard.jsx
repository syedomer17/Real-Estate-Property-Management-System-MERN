import React from "react";
import { useNavigate } from "react-router-dom";
import Getall from "./user/Getall";
import GetById from "./user/GetById";

const Dashboard = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/signin");
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 p-6">
      <div className="w-full max-w-4xl flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <Getall />
      <GetById />
    </div>
  );
};

export default Dashboard;
