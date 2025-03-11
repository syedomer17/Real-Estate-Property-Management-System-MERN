import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    gsap.fromTo(
      ".reset-password-form",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = "http://localhost:8090/api/public/resetpassword";
      const response = await axios.post(apiUrl, { email });

      toast.success(response.data.message || "Reset link sent successfully!");
      navigate("/signin");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      console.error(errorMessage);
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
        className="reset-password-form bg-white bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-3xl p-12 max-w-md w-full text-center border border-gray-300"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block text-gray-800 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
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
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        {/* Added Sign-in Link */}
        <p className="text-gray-400 text-center mt-4">
          Remember your password?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
