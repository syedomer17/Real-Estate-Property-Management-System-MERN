import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = "http://localhost:8090/api/public/signin";
      const response = await axios.post(apiUrl, formData);

      if (!response.data) {
        toast.error("Invalid response from server.");
        return;
      }

      const { email, token } = response.data;

      if (!email) {
        toast.error("Account does not exist. Please sign up first.");
        return;
      }

      localStorage.setItem("email", email);
      localStorage.setItem("user", JSON.stringify(response.data));

      if (token) localStorage.setItem("token", token);

      toast.success("Sign in successfully");
    //   navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    gsap.fromTo(
      ".sign-in-form",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-indigo-500 to-blue-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sign-in-form bg-white bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-3xl p-12 max-w-md w-full text-center border border-gray-300"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg text-lg shadow-lg transition-all hover:bg-yellow-300 hover:shadow-xl"
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>
        <div className="mt-4 text-gray-800">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-600 font-bold underline"
            >
              Sign Up
            </button>
          </p>
          <p className="text-sm mt-2">
            <button
              onClick={() => navigate("/resetpassword")}
              className="text-red-500 font-bold underline"
            >
              Forgot Password?
            </button>
          </p>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
