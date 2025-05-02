import React from "react";
import Header from "../components/header/Header";

const CoursePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-blue-50 p-4 border-r">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm theo tên bài học"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center justify-between">
                <span className="font-bold">1. Bắt đầu</span>
                <span className="text-gray-500 text-sm">0/2 | 17:35</span>
              </div>
              <ul className="pl-4 mt-2 space-y-1">
                <li className="flex items-center gap-2 text-teal-600">
                  <span>1.1. Chào mừng bạn!</span>
                  <span className="text-green-500">✔</span>
                </li>
                <li className="flex items-center gap-2 text-blue-600">
                  <span>1.2. Bí quyết học tập hiệu quả</span>
                  <span className="text-blue-500">▶</span>
                </li>
              </ul>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span className="font-bold">2. Tìm hiểu về JavaScript</span>
                <span className="text-gray-500 text-sm">0/13 | 43:03</span>
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span className="font-bold">3. Biến (Variables)</span>
                <span className="text-gray-500 text-sm">0/8 | 24:50</span>
              </div>
            </li>
            {/* Add more lessons as needed */}
          </ul>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white p-8">
          {/* Content will go here */}
        </main>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-4 bg-blue-50 border-t">
        <div className="text-gray-500">Cập nhật tháng 4 năm 2025</div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
            ← BÀI TRƯỚC
          </button>
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
            BÀI TIẾP THEO →
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CoursePage;
