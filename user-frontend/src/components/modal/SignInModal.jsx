import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Instagram, Github, Linkedin, Facebook } from "lucide-react";

function SignInModal({ isOpen, onClose, onSignUpClick }) {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: pass,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        onClose();
        window.location.reload();
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Đã xảy ra lỗi khi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white/5 backdrop-blur-[2px] flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: -100,
              opacity: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="bg-white rounded-lg p-6 w-[600px] shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              Đăng nhập HiGi
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleSignIn}>
              <div className="mb-4 mt-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Tên đăng nhập"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4 mt-4">
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Mật khẩu"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
              <div className="mt-4">
                <input type="checkbox" /> Remember me{" "}
              </div>
            </form>
            <div className="flex w-full items-center justify-center gap-1 mt-16">
              Bạn đã chưa có tài khoản?{" "}
              <span
                className="text-teal-400 cursor-pointer hover:underline"
                onClick={() => {
                  onClose();
                  onSignUpClick();
                }}
              >
                Đăng ký
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SignInModal;
