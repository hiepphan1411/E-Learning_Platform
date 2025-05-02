import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, X, Check, AlertTriangle, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";

const userData = [
  {
    id: 1,
    name: "Phan Phước Hiệp",
    email: "hiep@example.com",
    role: "Quản trị viên",
    status: "Hoạt động",
    avatar: "../PPH.jpg",
    pass: "hiep1235",
  },
  {
    id: 2,
    name: "Huỳnh Thanh Giang",
    email: "giang@example.com",
    role: "Học viên",
    status: "Hoạt động",
    avatar: "../ZangHuynh.png",
    pass: "giang123",
  },
  {
    id: 3,
    name: "Nhân Hồ",
    email: "nhan@example.com",
    role: "Giảng viên",
    status: "Vô hiệu hóa",
    avatar: "../ZangHuynh.png",
    pass: "nhan123",
  },
  {
    id: 4,
    name: "Giang Thanh",
    email: "thanh@example.com",
    role: "Quản trị viên",
    status: "Hoạt động",
    avatar: "../ZangHuynh.png",
    pass: "thanh123",
  }
];

export default function UsersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [accountTypeFilter, setAccountTypeFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const modalRef = useRef(null);
  const deleteModalRef = useRef(null);
  // Thêm phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const statusOptions = ["Hoạt động", "Vô hiệu hóa"];
  const accountTypes = ["Tất cả", "Quản trị viên", "Giảng viên", "Học viên"];
  const statusFilterOptions = ["Tất cả", "Hoạt động", "Vô hiệu hóa"];

  useEffect(() => {
    applyFilters();
  }, [searchTerm, accountTypeFilter, statusFilter]);

  const applyFilters = () => {
    let filtered = userData.filter(
      (user) =>
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (accountTypeFilter === "Tất cả" || user.role === accountTypeFilter) &&
        (statusFilter === "Tất cả" || user.status === statusFilter)
    );
    setFilteredUsers(filtered);
    // Trở về trang 1 sau khi lọc
    setCurrentPage(1);
  };

  // Phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Điều khiển phân trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleAccountTypeFilterChange = (e) => {
    setAccountTypeFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({
      ...selectedUser,
      [name]: value,
    });
  };

  const handleStatusChange = (newStatus) => {
    setSelectedUser({
      ...selectedUser,
      status: newStatus,
    });
  };

  const handleSaveChanges = () => {
    // Cập nhật người dùng
    const updatedUsers = filteredUsers.map((user) =>
      user.id === selectedUser.id ? selectedUser : user
    );
    setFilteredUsers(updatedUsers);
    handleCloseModal();
  };

  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = () => {
    // Lọc user đã xóa
    const updatedUsers = filteredUsers.filter(
      (user) => user.id !== userToDelete.id
    );
    setFilteredUsers(updatedUsers);
    handleCloseDeleteModal();
  };
  
  const handleActivateUser = (userId) => {
    const updatedUsers = filteredUsers.map((user) =>
      user.id === userId ? { ...user, status: "Active" } : user
    );
    setFilteredUsers(updatedUsers);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Cuộn tới modal khi mở
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      setTimeout(() => {
        modalRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100); 
    }

    if (isDeleteModalOpen && deleteModalRef.current) {
      setTimeout(() => {
        deleteModalRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [isModalOpen, isDeleteModalOpen]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Danh sách người dùng</h2>
        <div className="flex items-center">
          <span className="text-gray-300 mr-2">Loại tài khoản</span>
          <select
            value={accountTypeFilter}
            onChange={handleAccountTypeFilterChange}
            className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {accountTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <span className="text-gray-300 mr-2">Trạng thái</span>
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusFilterOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Nhập tên/email..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto" style={{ maxHeight: '600px', minHeight: '200px' }}>
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {currentUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      alt="course img"
                      className="size-10 rounded-full"
                    />
                    {user.name}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Hoạt động"
                        ? "bg-green-800 text-green-100"
                        : "bg-red-800 text-red-100"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button 
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleOpenModal(user)}
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleOpenDeleteModal(user)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-6 text-gray-300">
        <div>
          Hiển thị {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} của {filteredUsers.length} người dùng
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
            // Logic phân trang
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = index + 1;
            } else if (currentPage <= 3) {
              pageNumber = index + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + index;
            } else {
              pageNumber = currentPage - 2 + index;
            }
            
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`w-8 h-8 rounded-md ${
                    currentPage === pageNumber 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Modal chỉnh sửa */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <motion.div 
            ref={modalRef}
            className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl border border-gray-700"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: -50 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Chỉnh sửa người dùng</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">ID</label>
                <input
                  type="text"
                  name="id"
                  value={selectedUser.id}
                  disabled
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 cursor-not-allowed opacity-70"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Tên</label>
                <input
                  type="text"
                  name="name"
                  value={selectedUser.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="pass"
                    value={selectedUser.pass}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-2.5 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                <select
                  name="role"
                  value={selectedUser.role}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Trạng thái</label>
                <div className="flex gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedUser.status === status
                          ? status === "Active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
              >
                Lưu thay đổi
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal xóa */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div 
            ref={deleteModalRef}
            className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
          >
            <div className="flex justify-center mb-4 text-yellow-500">
              <AlertTriangle size={48} />
            </div>
            
            <h2 className="text-xl font-semibold text-white text-center mb-2">Xác nhận xóa</h2>
            <p className="text-gray-300 text-center mb-6">
              Bạn có chắc chắn muốn xóa "{userToDelete.name}"?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleCloseDeleteModal}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
              >
                Xóa
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
    </motion.div>
  );
}
