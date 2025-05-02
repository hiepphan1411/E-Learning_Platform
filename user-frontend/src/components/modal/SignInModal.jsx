import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "lucide-react";

function SignInModal({ isOpen, onClose }) {
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
              <div>
                <p>Hoặc bạn có thể kết nối với chúng tôi thông qua</p>
              </div>
            </form>
            <button
              onClick={onClose}
              className="mt-4 text-teal-600 hover:underline"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SignInModal;
