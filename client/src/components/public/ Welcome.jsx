import { useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const Welcome = () => {
  useEffect(() => {
    gsap.fromTo(
      ".cta-button",
      { boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.2)" },
      {
        boxShadow: "0px 0px 30px rgba(255, 215, 0, 0.9)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
      }
    );
    gsap.from(".hero-title", { opacity: 0, y: -50, duration: 1, delay: 0.3 });
    gsap.from(".hero-text", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-indigo-500 to-blue-500 p-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?luxury,mansion')",
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-3xl p-12 max-w-3xl text-center border border-gray-300"
      >
        <h1 className="hero-title text-7xl font-extrabold text-gray-900 mb-6 drop-shadow-xl">
          Welcome to <span className="text-yellow-400">LuxeLiving</span>
        </h1>
        <p className="hero-text text-xl text-gray-800 mb-8 leading-relaxed drop-shadow-lg">
          Experience the pinnacle of luxury living. Discover stunning properties
          tailored for your elite lifestyle.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cta-button px-10 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full text-xl shadow-lg transition-all hover:bg-yellow-300 hover:shadow-2xl"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Welcome;
