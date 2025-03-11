import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    role: "buyer",
  });

    useEffect(() => {
      let token = localStorage.getItem("token");
      if (token) navigate("/dashboard");
    }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = "http://localhost:8090/api/public/signup";
      const response = await axios.post(apiUrl, formData);
      console.log(response.data);

      localStorage.setItem("userData", JSON.stringify(formData));

      if (
        formData.userName.trim().length < 2 ||
        formData.userName.trim().length > 20
      ) {
        toast.error(JSON.stringify(response.message.message));
        setLoading(false);
        return;
      }

      toast.success(response.data.message || "Signup successful!");

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-indigo-500 to-blue-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-3xl p-12 max-w-md w-full text-center border border-gray-300"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block text-gray-800 font-semibold mb-2">
              Username
            </label>
            <input
              placeholder="Enter your username"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="text-left">
            <label className="block text-gray-800 font-semibold mb-2">
              Email
            </label>
            <input
              placeholder="Enter your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="text-left">
            <label className="block text-gray-800 font-semibold mb-2">
              Password
            </label>
            <input
              placeholder="Enter your password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="text-left">
            <label className="block text-gray-800 font-semibold mb-2">
              Phone
            </label>
            <input
              placeholder="Enter your phone number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="text-left">
            <label className="block text-gray-800 font-semibold mb-2">
              Role
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="tenant"
                  checked={formData.role === "tenant"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Tenant
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={formData.role === "buyer"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Buyer
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={formData.role === "seller"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Seller
              </label>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg text-lg shadow-lg transition-all hover:bg-yellow-300 hover:shadow-xl"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
