import React, { useState, useEffect } from "react";
import { FaChevronRight, FaUser, FaLock } from "react-icons/fa";
import "../styles/SettingsPage.css";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [userData, setUserData] = useState(null);

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
  // Kiểm tra xem chuỗi có phải là Base64 hay không
  const isBase64Image = useCallback((src) => {
    return (
      src &&
      (src.startsWith("data:image") ||
        src.startsWith("data:application/octet-stream;base64") ||
        (src.length > 100 && /^[A-Za-z0-9+/=]+$/.test(src)))
    );
  }, []);

  //Chuyển đổi Base64 thành URL
  const getImageSrc = useCallback(
    (image) => {
      if (!image) return "../avatarAdmin.png";

      if (isBase64Image(image)) {
        if (image.startsWith("data:")) {
          return image;
        }
        return `data:image/jpeg;base64,${image}`;
      }

      return image;
    },
    [isBase64Image]
  );
  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <div className="account-header">
          <img src="../logoAdmin.png" alt="Logo" className="w-25 h-12 mb-5" />
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

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Họ và tên</h4>
                  <p>{userData?.name || "Chưa cập nhật"}</p>
                </div>
                <FaChevronRight />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Tên người dùng</h4>
                  <p>{userData?.account.user_name || "Chưa cập nhật"}</p>
                </div>
                <FaChevronRight />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email</h4>
                  <p>{userData?.email || "Chưa cập nhật"}</p>
                </div>
                <FaChevronRight />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Giới thiệu</h4>
                  <p>{userData?.bio || "Chưa cập nhật"}</p>
                </div>
                <FaChevronRight />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Ảnh đại diện</h4>
                  <div className="avatar-placeholder">
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
                </div>
                <FaChevronRight />
              </div>
            </div>

            <div className="info-section">
              <h3>Thông tin mạng xã hội</h3>
              <p>Quản lý liên kết tới các trang mạng xã hội của bạn.</p>

              {[
                { name: "Trang web cá nhân", value: "Chưa cập nhật" },
                { name: "GitHub", value: "Chưa cập nhật" },
                { name: "LinkedIn", value: "Chưa cập nhật" },
                { name: "Facebook", value: "Chưa cập nhật" },
                { name: "YouTube", value: "Chưa cập nhật" },
                { name: "TikTok", value: "Chưa cập nhật" },
              ].map((item) => (
                <div className="setting-item" key={item.name}>
                  <div className="setting-info">
                    <h4>{item.name}</h4>
                    <p>{item.value}</p>
                  </div>
                  <FaChevronRight />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="settings-section">
            <h2>Mật khẩu và bảo mật</h2>
            <p>Quản lý mật khẩu và cài đặt bảo mật.</p>

            <div className="info-section">
              <h3>Đăng nhập & khôi phục</h3>
              <p>Quản lý mật khẩu và các phương thức khôi phục.</p>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Tạo mật khẩu</h4>
                  <p>Chưa đặt mật khẩu</p>
                </div>
                <FaChevronRight />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Xác minh 2 bước</h4>
                  <p>Đang tắt</p>
                </div>
                <FaChevronRight />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
