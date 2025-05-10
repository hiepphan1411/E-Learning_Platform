import { useState, useRef, useEffect } from "react";
import { getImageSrc } from "../../utils/processBase64";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function UserInfo({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-around px-6 py-2 gap-2 bg-gray-50 rounded-2xl shadow-xl hover:bg-gray-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={getImageSrc(user?.avatarData || "")}
          alt="Avatar"
          className="w-8 h-8 rounded-2xl"
        />
        <div className="text-gray-700">{user?.name || "User"}</div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          <Link
            to="/my-courses"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Khóa học của tôi
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Cài đặt
          </Link>
          <div className="border-t border-gray-100 my-1"></div>
          <div
            className="block px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
            onClick={onLogout}
          >
            Đăng xuất
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default UserInfo;
