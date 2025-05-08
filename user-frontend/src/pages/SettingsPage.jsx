import React, { useState, useEffect, useCallback } from "react";
import { FaChevronRight, FaUser, FaLock, FaTimes } from "react-icons/fa";
import "../styles/SettingsPage.css";
import { getImageSrc } from "../utils/processBase64";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Lỗi localStorage:", error);
      }
    }
  }, []);

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue || "");
  };

  const handleCloseModal = () => {
    setEditingField(null);
    setEditValue("");
  };

  const handleSaveEdit = () => {
    if (!editingField) return;

    const updatedUserData = { ...userData };

    if (editingField === "name") {
      updatedUserData.name = editValue;
    } else if (editingField === "user_name") {
      if (!updatedUserData.account) updatedUserData.account = {};
      updatedUserData.account.user_name = editValue;
    } else if (editingField === "email") {
      updatedUserData.email = editValue;
    } else if (editingField === "bio") {
      updatedUserData.bio = editValue;
    } else if (editingField === "password") {
      if (!updatedUserData.account) updatedUserData.account = {};
      updatedUserData.account.password = editValue;
    } else if (editingField.startsWith("social_")) {
      const socialType = editingField.split("_")[1];
      if (!updatedUserData.social) updatedUserData.social = {};
      updatedUserData.social[socialType] = editValue;
    }

    setUserData(updatedUserData);
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    handleCloseModal();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUserData = { ...userData, avatarData: reader.result };
        setUserData(updatedUserData);
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      };
      reader.readAsDataURL(file);
    }
    handleCloseModal();
  };

  const renderEditField = (field) => {
    if (!editingField || editingField !== field) return null;

    return (
      <div className="bg-white shadow-lg rounded-lg p-4 mt-2 mb-4 border border-gray-200">
        {field === "avatarData" ? (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {userData?.avatarData && (
                <img
                  src={getImageSrc(userData.avatarData)}
                  alt="Current avatar"
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
              )}
            </div>
            <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z"
                  clipRule="evenodd"
                />
                <path d="M8 11l2-2 2 2m0 0v4" />
              </svg>
              Chọn ảnh mới
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
            <p className="text-gray-500 text-sm mt-2">
              Hỗ trợ JPG, PNG (tối đa 2MB)
            </p>
            <button
              className="mt-3 text-gray-600 hover:text-red-500 transition-colors duration-300"
              onClick={handleCloseModal}
            >
              Hủy
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getFieldLabel(field)}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                placeholder={`Nhập ${getFieldLabel(field).toLowerCase()} mới`}
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors duration-300 flex items-center"
                onClick={handleCloseModal}
              >
                <FaTimes className="mr-1" /> Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300 flex items-center"
                onClick={handleSaveEdit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Thay đổi
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SettingItem = ({ field, label, value, onClick, children }) => {
    const isEditing = editingField === field;

    return (
      <>
        <div
          className={`border border-gray-200 rounded-md p-3 mb-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors duration-300 ${
            isEditing ? "bg-blue-50" : ""
          }`}
          onClick={onClick}
        >
          <div className="setting-info">
            <h4 className="text-sm font-medium text-gray-900">{label}</h4>
            {React.isValidElement(value) ? (
              value
            ) : (
              <div className="text-gray-500 text-sm mt-1">{value}</div>
            )}
          </div>
          {!isEditing && <FaChevronRight className="text-gray-400" />}
        </div>
        {isEditing && renderEditField(field)}
      </>
    );
  };

  const getFieldLabel = (field) => {
    const fieldLabels = {
      name: "Họ và tên",
      user_name: "Tên người dùng",
      email: "Email",
      bio: "Giới thiệu",
      avatarData: "Ảnh đại diện",
      password: "Mật khẩu",
    };
    return fieldLabels[field] || field;
  };

  const getFieldValue = (field) => {
    if (!userData) return "Chưa cập nhật";

    if (field === "name") return userData.name || "Chưa cập nhật";
    if (field === "user_name")
      return userData.account?.user_name || "Chưa cập nhật";
    if (field === "email") return userData.email || "Chưa cập nhật";
    if (field === "bio") return userData.bio || "Chưa cập nhật";
    if (field === "password")
      return userData.account?.password || "Chưa đặt mật khẩu";

    if (field.startsWith("social_")) {
      const socialType = field.split("_")[1];
      return userData.social?.[socialType] || "Chưa cập nhật";
    }

    return "Chưa cập nhật";
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <div className="account-header">
          <h2>Cài đặt tài khoản</h2>
          <p>
            Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo
            mật, quản lý thông báo, v.v.
          </p>
        </div>

        <div className="settings-menu">
          <button
            className={`menu-item ${activeTab === "personal" ? "active" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            <FaUser /> Thông tin cá nhân
          </button>
          <button
            className={`menu-item ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <span className="icon">🔒</span> Mật khẩu và bảo mật
          </button>
        </div>
      </div>

      <div className="settings-content">
        {activeTab === "personal" ? (
          <div className="settings-section">
            <h2>Thông tin cá nhân</h2>
            <p>Quản lý thông tin cá nhân của bạn.</p>

            <div className="info-section">
              <h3>Thông tin cơ bản</h3>
              <p>
                Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.
              </p>

              <SettingItem
                field="name"
                label="Họ và tên"
                value={userData?.name || "Chưa cập nhật"}
                onClick={() => handleEdit("name", userData?.name)}
              />

              <SettingItem
                field="user_name"
                label="Tên người dùng"
                value={userData?.account?.user_name || "Chưa cập nhật"}
                onClick={() =>
                  handleEdit("user_name", userData?.account?.user_name)
                }
              />

              <SettingItem
                field="email"
                label="Email"
                value={userData?.email || "Chưa cập nhật"}
                onClick={() => handleEdit("email", userData?.email)}
              />

              <SettingItem
                field="bio"
                label="Giới thiệu"
                value={userData?.bio || "Chưa cập nhật"}
                onClick={() => handleEdit("bio", userData?.bio)}
              />

              <SettingItem
                field="avatarData"
                label="Ảnh đại diện"
                value={
                  <div className="avatar-placeholder text-gray-500 text-sm mt-1">
                    {userData?.avatarData ? (
                      <img
                        src={getImageSrc(userData.avatarData)}
                        alt="Avatar"
                        className="user-avatar"
                      />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                }
                onClick={() => handleEdit("avatarData")}
              />
              <button className="bg-blue-700 text-white px-5 py-3 rounded-full right-20 absolute mt-10">Lưu và thay đổi</button>
            </div>

            {/* <div className="info-section">
              <h3>Thông tin mạng xã hội</h3>
              <p>Quản lý liên kết tới các trang mạng xã hội của bạn.</p>

              {[
                { field: "social_website", name: "Trang web cá nhân" },
                { field: "social_github", name: "GitHub" },
                { field: "social_linkedin", name: "LinkedIn" },
                { field: "social_facebook", name: "Facebook" },
                { field: "social_youtube", name: "YouTube" },
                { field: "social_tiktok", name: "TikTok" },
              ].map((item) => (
                <SettingItem
                  key={item.field}
                  field={item.field}
                  label={item.name}
                  value={userData?.social?.[item.field.split('_')[1]] || "Chưa cập nhật"}
                  onClick={() => handleEdit(item.field, userData?.social?.[item.field.split('_')[1]])}
                />
              ))}
            </div> */}
          </div>
        ) : (
          <div className="settings-section">
            <h2>Mật khẩu và bảo mật</h2>
            <p>Quản lý mật khẩu và cài đặt bảo mật.</p>

            <div className="info-section">
              <h3>Đăng nhập & khôi phục</h3>
              <p>Quản lý mật khẩu và các phương thức khôi phục.</p>

              <SettingItem
                field="password"
                label="Tạo mật khẩu"
                value={
                  userData?.account?.password ? "••••••••" : "Chưa đặt mật khẩu"
                }
                onClick={() =>
                  handleEdit("password", userData?.account?.password)
                }
              />

              <SettingItem
                field="two_factor"
                label="Xác minh 2 bước"
                value="Đang tắt"
                onClick={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
