import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Instagram, Github, Linkedin, Facebook } from "lucide-react";

function SignUpModal({ isOpen, onClose, onSignInClick }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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
              Sign In HiGi
            </h2>
            <p className="text-center">
              Học tập - Rèn luyện - Chia sẻ - Kết nối
            </p>
            <form>
              <div className="flex mb-4 mt-4 gap-10">
                <div className="w-1/2">
                  <input
                    type="lastname"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Last Name"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="firstname"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="mb-4 mt-4">
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4 mt-4">
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4 mt-4">
                <input
                  type="confirmpassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Confirm Password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
              >
                Sign In
              </button>
              <div className="mt-4">
                <input type="checkbox" /> Bằng cách đăng ký HiGi, bạn đồng ý với{" "}
                <span className="text-red-600 cursor-pointer hover:underline">
                  Điều khoản dịch vụ
                </span>{" "}
                và{" "}
                <span className="text-red-600 cursor-pointer hover:underline">
                  Chính sách quyền riêng tư
                </span>{" "}
                của HiGi
              </div>
              <div className="flex flex-col items-center justify-center w-full mt-4">
                <div className="flex items-center w-full">
                  <div className="flex-grow h-px bg-black"></div>
                  <span className="px-2 whitespace-nowrap">
                    Hoặc bạn có thể kết nối với chúng tôi thông qua
                  </span>
                  <div className="flex-grow h-px bg-black"></div>
                </div>
                <div className="flex w-full items-center justify-around mt-4 gap-4">
                  <button className="flex items-center justify-center bg-gray-100 px-2 rounded-lg shadow hover:bg-gray-200">
                    <Facebook strokeWidth={0.75} className="h-12 w-8" />
                  </button>
                  <button className="flex items-center justify-center bg-gray-100 px-2 rounded-lg shadow hover:bg-gray-200">
                    <Github strokeWidth={0.75} className="h-12 w-8" />
                  </button>
                  <button className="flex items-center justify-center bg-gray-100 px-2 rounded-lg shadow hover:bg-gray-200">
                    <Linkedin strokeWidth={0.75} className="h-12 w-8" />
                  </button>
                  <button className="flex items-center justify-center bg-gray-100 px-2 rounded-lg shadow hover:bg-gray-200">
                    <Instagram strokeWidth={0.75} className="h-12 w-8" />
                  </button>
                  <button className="flex items-center justify-center bg-gray-100 px-2 rounded-lg shadow hover:bg-gray-200">
                    <Youtube strokeWidth={0.75} className="h-12 w-8" />
                  </button>
                </div>
              </div>
            </form>
            <div className="flex w-full items-center justify-center gap-1 mt-16">
              Bạn đã có tài khoản?{" "}
              <span
                className="text-teal-400 cursor-pointer hover:underline"
                onClick={() => {
                  onClose();
                  onSignInClick();
                }}
              >
                Đăng nhập
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SignUpModal;
