import React, { useState, useRef, useEffect } from 'react';
import { Eye, Delete, Bell, AlertCircle, UserPlus, BookOpen, FileText, RefreshCw } from "lucide-react";
import PopupMenu from './PopupMenu';

const Header = ({title}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Thông báo mẫu
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Người dùng mới đã đăng ký", time: "5 phút trước", read: false, type: "user" },
    { id: 2, message: "Khóa học 'React Basics' đã được tạo", time: "1 giờ trước", read: false, type: "course" },
    { id: 3, message: "Yêu cầu xác nhận khóa học mới", time: "3 giờ trước", read: false, type: "request" },
    { id: 4, message: "Báo cáo doanh thu tháng đã sẵn sàng", time: "1 ngày trước", read: true, type: "report" },
    { id: 5, message: "Cập nhật hệ thống sẽ diễn ra vào ngày mai", time: "2 ngày trước", read: true, type: "system" }
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

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'user':
        return <UserPlus size={16} className="text-blue-400" />;
      case 'course':
        return <BookOpen size={16} className="text-green-400" />;
      case 'request':
        return <AlertCircle size={16} className="text-yellow-400" />;
      case 'report':
        return <FileText size={16} className="text-purple-400" />;
      case 'system':
        return <RefreshCw size={16} className="text-red-400" />;
      default:
        return <Bell size={16} className="text-gray-400" />;
    }
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
          <button className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200" onClick={toggleNotifications}>
            {unreadCount > 0 && 
              <span className="absolute -top-1 -right-1 bg-blue-500 text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-800 animate-pulse">
                {unreadCount}
              </span>
            }
            <Bell className="w-5 h-5" />
          </button>
          {/* Cửa sổ thông báo */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 rounded-md shadow-lg py-1 z-50 w-96 bg-gray-800 border border-gray-700 transition-all duration-300 ease-in-out transform origin-top-right" 
                 style={{boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'}}>
              <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-blue-400" />
                  Thông báo
                  {unreadCount > 0 && (
                    <span className="ml-2 bg-blue-500 text-xs px-2 py-1 rounded-full text-white">
                      {unreadCount} mới
                    </span>
                  )}
                </h3>
              </div>
              
              <div 
                className="max-h-80 overflow-y-auto custom-scrollbar" 
                style={{scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937'}}
              >
                <style jsx>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1F2937;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #4B5563;
                    border-radius: 6px;
                  }
                `}</style>
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 ${!notification.read ? 'bg-gray-700 bg-opacity-40' : ''}`}
                    >
                      <div className="flex">
                        <div className="mr-3 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <p className={`text-sm ${!notification.read ? 'font-semibold text-white' : 'text-gray-300'}`}>
                              {notification.message}
                            </p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                        <div className="flex items-center ml-2">
                          {!notification.read && (
                            <button 
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-400 hover:text-blue-300 p-1 rounded-full hover:bg-gray-600"
                              title="Đánh dấu đã đọc"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-gray-600 ml-1"
                            title="Xóa thông báo"
                          >
                            <Delete className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-400 flex flex-col items-center">
                    <Bell className="w-12 h-12 mb-2 opacity-30" />
                    <p>Không có thông báo nào</p>
                  </div>
                )}
              </div>
              
              <div className="px-4 py-3 border-t border-gray-700 flex justify-between bg-gray-800">
                <button 
                  onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-700"
                  disabled={notifications.length === 0 || !notifications.some(n => !n.read)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Đánh dấu tất cả
                </button>
                <button 
                  onClick={deleteAllNotifications}
                  className="text-sm text-red-400 hover:text-red-300 flex items-center transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-700"
                  disabled={notifications.length === 0}
                >
                  <Delete className="w-4 h-4 mr-1" />
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