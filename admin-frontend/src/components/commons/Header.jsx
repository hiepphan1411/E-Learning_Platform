import React, { useState, useRef, useEffect } from 'react';
import { Eye, Delete } from "lucide-react";
import PopupMenu from './PopupMenu';

const Header = ({title}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Thông báo mẫu
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Người dùng mới đã đăng ký", time: "5 phút trước", read: false },
    { id: 2, message: "Khóa học 'React Basics' đã được tạo", time: "1 giờ trước", read: false },
    { id: 3, message: "Yêu cầu xác nhận khóa học mới", time: "3 giờ trước", read: false },
    { id: 4, message: "Báo cáo doanh thu tháng đã sẵn sàng", time: "1 ngày trước", read: true },
    { id: 5, message: "Cập nhật hệ thống sẽ diễn ra vào ngày mai", time: "2 ngày trước", read: true }
  ]);

  // đóng mở cửa sổ thông báo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };
  
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const deleteAllNotifications = () => {
    setNotifications([]);
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <header className="bg-gray-800 bg-opacity-50 shadow-lg px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-blue-400 font-bold text-2xl mr-2">
          <img className="h-10 w-25" src="../logoAdmin.png" alt="Logo Admin" />
        </div>
        <div className="text-white text-xl ml-8 w-10">{title}</div>
      </div>

      <div className="flex-1 max-w-lg mx-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Nhập từ khóa..." 
            className="w-full py-1 px-3 pr-10 rounded-full bg-white text-gray-700 focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative mr-4" ref={notificationsRef}>
          <button className="text-white" onClick={toggleNotifications}>
            {unreadCount > 0 && 
              <span className="absolute -top-1 -right-1 bg-blue-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            }
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          {/* Cửa sổ thông báo */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 rounded-md shadow-lg py-1 z-50 w-120 bg-gray-800 bg-opacity-50 border-blue-700 border-2" ref={notificationsRef}>
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-white">Thông báo</h3>
              </div>
              
              <div 
                className="max-h-80 overflow-y-auto" 
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <style jsx>{`
                  .max-h-80::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-3 border-b hover:bg-gray-700 ${!notification.read ? 'bg-gray-900 bg-opacity-50' : ''}`}
                    >
                      <div className="flex justify-between">
                        <p className={`text-sm ${!notification.read ? 'font-semibold text-white' : 'text-gray-50'}`}>
                          {notification.message}
                        </p>
                        <div className="flex">
                          {!notification.read && (
                            <button 
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-500 hover:text-blue-700 text-xs mr-2"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            <Delete className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    Không có thông báo nào
                  </div>
                )}
              </div>
              
              <div className="px-4 py-2 flex float-end">
                <button 
                  onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                  className="text-sm text-blue-500 hover:text-blue-700 mr-4"
                >
                  Đánh dấu tất cả là đã đọc
                </button>
                <button 
                  onClick={deleteAllNotifications}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Xóa tất cả
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center cursor-pointer" 
            onClick={toggleDropdown}
          >
            <img 
              src="../avartarAdmin.png" 
              alt="Admin" 
              className="w-9 h-9 rounded-full object-cover border-2 border-gray-600" 
            />
            <div className="ml-2 text-white">Admin</div>
            <svg 
              className={`w-5 h-5 ml-1 text-white transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {/* Chọn menu cho admin */}
          {dropdownOpen && (
            <PopupMenu />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;