import { motion } from "framer-motion";
import {
  Edit,
  Search,
  Trash2,
  X,
  Check,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Combobox from "./ComboboxCustom";
import axios from "axios";

const course_DATA = [
  {
    id: 1,
    actor: "Huỳnh Thanh Giang",
    image: "../ZangHuynh.png",
    name: "Khóa học HTML, CSS pro",
    category: "Lập trình",
    price: 199.99,
    date: "2023-01-01",
    statusbar: "Chờ duyệt",
  },
  {
    id: 2,
    actor: "Huỳnh Thanh Giang",
    image: "../ZangHuynh.png",
    name: "Khóa học ReactJS",
    category: "Lập trình",
    price: 299.99,
    date: "2023-02-01",
    statusbar: "Chờ duyệt",
  },
  {
    id: 3,
    actor: "Huỳnh Thanh Giang",
    image: "../ZangHuynh.png",
    name: "Khóa học NodeJS",
    category: "Lập trình",
    price: 399.99,
    date: "2023-03-01",
    statusbar: "Đã duyệt",
  },
  {
    id: 4,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học Python",
    category: "Lập trình",
    price: 499.99,
    date: "2023-04-01",
    statusbar: "Đã duyệt",
  },
  {
    id: 5,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học Java",
    category: "Lập trình",
    price: 599.99,
    date: "2023-05-01",
    statusbar: "Đã duyệt",
  },
  {
    id: 6,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học C++",
    category: "Lập trình",
    price: 699.99,
    date: "2023-06-01",
    statusbar: "Đã duyệt",
  },
  {
    id: 7,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học PHP",
    category: "Lập trình",
    price: 799.99,
    date: "2023-07-01",
    statusbar: "Chờ duyệt",
  },
  {
    id: 8,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học Ruby",
    category: "Lập trình",
    price: 899.99,
    date: "2023-08-01",
    statusbar: "Đã duyệt",
  },
  {
    id: 9,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học Swift",
    category: "Lập trình",
    price: 999.99,
    date: "2023-09-01",
    statusbar: "Đã duyệt",
  },
  {
    id: 10,
    actor: "Huỳnh Thanh Giang",
    image: "../ZangHuynh.png",
    name: "Khóa học Kotlin",
    category: "Lập trình",
    price: 1099.99,
    date: "2023-10-01",
    statusbar: "Vi phạm",
  },
  {
    id: 11,
    actor: "Huỳnh Thanh Giang",
    image: "../ZangHuynh.png",
    name: "Khóa học Go",
    category: "Lập trình",
    price: 1199.99,
    date: "2023-11-01",
    statusbar: "Vi phạm",
  },
  {
    id: 12,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học C#",
    category: "Lập trình",
    price: 1299.99,
    date: "2023-12-01",
    statusbar: "Chờ duyệt",
  },
  {
    id: 13,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học TypeScript",
    category: "Lập trình",
    price: 1399.99,
    date: "2023-01-15",
    statusbar: "Chờ duyệt",
  },
  {
    id: 14,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học Dart",
    category: "Lập trình",
    price: 1499.99,
    date: "2023-02-15",
    statusbar: "Đã duyệt",
  },
  {
    id: 15,
    actor: "Phan Phước Hiệp",
    image: "../PPH.jpg",
    name: "Khóa học R",
    category: "Lập trình",
    price: 1599.99,
    date: "2023-03-15",
    statusbar: "Vi phạm",
  },
];

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]); // Initialize as empty array
  const [sortOption, setSortOption] = useState("Chờ duyệt");
  const [alphabetOption, setAlphabetOption] = useState("A-Z");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  const sortOptions = ["Chờ duyệt", "Đã duyệt", "Vi phạm", "Tất cả"];
  const alphabetOptions = ["A-Z", "Z-A", "Mới nhất", "Cũ nhất"];
  const statusOptions = ["Chờ duyệt", "Đã duyệt", "Vi phạm"];

  // Fetch dữ liệu từ API
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/courses")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("fetch() got:", data);
        setCourses(data.length > 0 ? data : course_DATA); 
        setIsLoading(false);
      })
      .catch(err => {
        console.error("fetch() error:", err);
        setCourses(course_DATA); 
        setError(err.message);
        setIsLoading(false);
      });
  }, []);
  

  useEffect(() => {
    let result = [...courses];

    // Lọc theo tên
    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo trạng thái
    if (sortOption !== "Tất cả") {
      result = result.filter((course) => course.statusbar === sortOption);
    }

    // Sắp xếp
    if (alphabetOption === "A-Z") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (alphabetOption === "Z-A") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    } else if (alphabetOption === "Mới nhất") {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (alphabetOption === "Cũ nhất") {
      result = [...result].sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredCourses(result);
  }, [searchTerm, sortOption, alphabetOption, courses]); // Add courses as dependency

  // Tính giá trị mỗi trang
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Đặt lại về trang đầu tiên khi bộ lọc thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption, alphabetOption]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourse({
      ...selectedCourse,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleStatusChange = (newStatus) => {
    setSelectedCourse({
      ...selectedCourse,
      statusbar: newStatus,
    });
  };

  const handleSaveChanges = () => {
    if (!selectedCourse) return;
    
    // Use axios to update course on the backend
    axios.put(`http://localhost:5000/api/courses/${selectedCourse.id}`, selectedCourse)
      .then(response => {
        console.log("Course updated:", response.data);
        // Update local state
        const updatedCourses = courses.map((course) =>
          course.id === selectedCourse.id ? selectedCourse : course
        );
        setCourses(updatedCourses);
      })
      .catch(error => {
        console.error("Error updating course:", error);
        // Fallback to local update if API fails
        const updatedCourses = courses.map((course) =>
          course.id === selectedCourse.id ? selectedCourse : course
        );
        setCourses(updatedCourses);
      });
    
    handleCloseModal();
  };

  const handleApprove = (courseId) => {
    const courseToUpdate = courses.find(course => course.id === courseId);
    if (!courseToUpdate) return;
    
    const updatedCourse = { ...courseToUpdate, statusbar: "Đã duyệt" };
    
    axios.put(`http://localhost:5000/api/courses/${courseId}`, updatedCourse)
      .then(response => {
        console.log("Course approved:", response.data);
        // Update local state
        const updatedCourses = courses.map((course) =>
          course.id === courseId ? { ...course, statusbar: "Đã duyệt" } : course
        );
        setCourses(updatedCourses);
      })
      .catch(error => {
        console.error("Error approving course:", error);
        // Fallback to local update if API fails
        const updatedCourses = courses.map((course) =>
          course.id === courseId ? { ...course, statusbar: "Đã duyệt" } : course
        );
        setCourses(updatedCourses);
      });
  };

  const handleOpenDeleteModal = (course) => {
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const handleDeleteCourse = () => {
    if (!courseToDelete) return;
    
    axios.delete(`http://localhost:5000/api/courses/${courseToDelete.id}`)
      .then(response => {
        console.log("Course deleted:", response.data);
        // Update local state
        const updatedCourses = courses.filter(
          (course) => course.id !== courseToDelete.id
        );
        setCourses(updatedCourses);
      })
      .catch(error => {
        console.error("Error deleting course:", error);
        // Fallback to local update if API fails
        const updatedCourses = courses.filter(
          (course) => course.id !== courseToDelete.id
        );
        setCourses(updatedCourses);
      });
    
    handleCloseDeleteModal();
  };

  // Cuộn đến modal khi mở
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      setTimeout(() => {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }

    if (isDeleteModalOpen && deleteModalRef.current) {
      setTimeout(() => {
        deleteModalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [isModalOpen, isDeleteModalOpen]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-100 mr-3">
            Danh sách khóa học
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <Combobox
            value={sortOption}
            options={sortOptions}
            onChange={setSortOption}
            width="160px"
          />
          <Combobox
            value={alphabetOption}
            options={alphabetOptions}
            onChange={setAlphabetOption}
            width="160px"
          />
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập tên/loại khóa học..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center p-6 text-red-400">
          <p>Lỗi tải dữ liệu: {error}</p>
          <p className="mt-2">Đang hiển thị dữ liệu mẫu</p>
        </div>
      ) : (
        <div
          className="overflow-x-auto"
          style={{ maxHeight: "600px", minHeight: "200px" }}
        >
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800 sticky top-0">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tên khóa học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tác giả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Loại khóa học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ngày phát hành
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
              {currentCourses.map((course) => (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                    {course.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {course.name}
                  </td>
                  <td className="px-6S py-4 whitespace-nowrap text-sm font-medium text-gray-100 gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.image}
                        alt="course img"
                        className="size-10 rounded-full"
                      />
                      {course.actor}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {course.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {course.price.toFixed(2)} đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {course.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {course.statusbar === "Chờ duyệt" ? (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {course.statusbar}
                      </span>
                    ) : course.statusbar === "Đã duyệt" ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {course.statusbar}
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {course.statusbar}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                      onClick={() => handleOpenModal(course)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleOpenDeleteModal(course)}
                    >
                      <Trash2 size={18} />
                    </button>
                    {course.statusbar !== "Đã duyệt" && (
                      <button
                        className="text-green-400 hover:text-green-300 ml-2"
                        onClick={() => handleApprove(course.id)}
                        title="Duyệt khóa học"
                      >
                        <Check size={18} />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Thông tin */}
      <div className="flex justify-between items-center mt-6 text-gray-300">
        <div>
          Hiển thị {indexOfFirstCourse + 1}-
          {Math.min(indexOfLastCourse, filteredCourses.length)} của{" "}
          {filteredCourses.length} khóa học
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
            // Phân trang
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
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
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
            className={`p-2 rounded-md ${
              currentPage === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            ref={modalRef}
            className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl border border-gray-700"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: -50 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Chỉnh sửa khóa học
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  ID
                </label>
                <input
                  type="text"
                  name="id"
                  value={selectedCourse.id}
                  disabled
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 cursor-not-allowed opacity-70"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tên khóa học
                </label>
                <input
                  type="text"
                  name="name"
                  value={selectedCourse.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tác giả
                </label>
                <input
                  type="text"
                  name="actor"
                  value={selectedCourse.actor}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Loại khóa học
                </label>
                <input
                  type="text"
                  name="category"
                  value={selectedCourse.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Giá
                </label>
                <input
                  type="number"
                  name="price"
                  value={selectedCourse.price}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Ngày phát hành
                </label>
                <input
                  type="date"
                  name="date"
                  value={selectedCourse.date}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Trạng thái
                </label>
                <div className="flex gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedCourse.statusbar === status
                          ? status === "Chờ duyệt"
                            ? "bg-yellow-500 text-white"
                            : status === "Đã duyệt"
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
                Hủy
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

      {/* Modal xóa khóa học */}
      {isDeleteModalOpen && courseToDelete && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
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

            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Xác nhận xóa
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Bạn có chắc chắn muốn xóa khóa học "{courseToDelete.name}" không?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleCloseDeleteModal}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteCourse}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
              >
                Xóa khóa học
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CoursesTable;
