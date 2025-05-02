import { motion } from "framer-motion";
import { Edit, Search, Trash2, X, Check, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Combobox from "../courses/ComboboxCustom";

const course_DATA = [
  {
    id: 1,
    actor: "Huỳnh Thanh Giang",
    image: "../ZangHuynh.png",
    name: "REVIT MEP THỰC TẾ - ĐIỀU HÒA VRV",
    category: "Điện lạnh",
    price: 199.99,
    date: "2023-01-01",
    statusbar: "Chờ duyệt",
    description: "Khóa học REVIT MEP thực tế - Điều hòa VRV giúp bạn nắm vững kiến thức và kỹ năng thiết kế hệ thống điều hòa không khí VRV bằng phần mềm REVIT MEP.",
    approved_by: "Hiệp Phan",
    certificates: "Chờ duyệt",
    certificates_image: "../Certificate.png",
  }
];

export default function CertificatesTable() {
      const [searchTerm, setSearchTerm] = useState("");
      const [filteredCourses, setFilteredCourses] = useState(course_DATA);
      const [alphabetOption, setAlphabetOption] = useState("A-Z");
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedCourse, setSelectedCourse] = useState(null);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [courseToDelete, setCourseToDelete] = useState(null);
      const [selectedCertificate, setSelectedCertificate] = useState(null); 
      const modalRef = useRef(null);
      const deleteModalRef = useRef(null);
      const [currentPage, setCurrentPage] = useState(1);
      const coursesPerPage = 10;
      const certificateSectionRef = useRef(null); 
    
      const alphabetOptions = ["A-Z", "Z-A", "Mới nhất", "Cũ nhất"];
      const statusOptions = ["Chờ duyệt", "Đã duyệt", "Vi phạm"];
    
      useEffect(() => {
        let result = course_DATA;
    
        // Lọc theo tên
        if (searchTerm) {
          result = result.filter(
            (course) =>
              course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              course.category.toLowerCase().includes(searchTerm.toLowerCase())
          );
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
      }, [searchTerm, alphabetOption]);
    
      // Tính giá trị mỗi trang
      const indexOfLastCourse = currentPage * coursesPerPage;
      const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
      const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
      const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    
      // Thay đổi trang
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
      const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
      const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    
      // Đặt lại về trang đầu tiên khi bộ lọc thay đổi
      useEffect(() => {
        setCurrentPage(1);
      }, [searchTerm, alphabetOption]);
    
      const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
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
        // Lưu khóa học
        const updatedCourses = filteredCourses.map((course) =>
          course.id === selectedCourse.id ? selectedCourse : course
        );
        setFilteredCourses(updatedCourses);
        handleCloseModal();
      };
    
    
      // Cuộn đến modal khi mở
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

      // Xem chi tiết chứng chỉ
      const handleViewCertificate = (course) => {
        setSelectedCertificate(course);
        setTimeout(() => {
          if (certificateSectionRef.current) {
            certificateSectionRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      };

      // Hàm duyệt chứng chỉ
      const handleApproveCertificate = () => {
        const updatedCourses = filteredCourses.map((course) =>
          course.id === selectedCertificate.id ? { ...course, statusbar: "Đã duyệt" } : course
        );
        setFilteredCourses(updatedCourses);
        setSelectedCertificate(null);
      };

      // Hàm đánh dấu vi phạm
      const handleRejectCertificate = () => {
        const updatedCourses = filteredCourses.map((course) =>
          course.id === selectedCertificate.id ? { ...course, statusbar: "Vi phạm" } : course
        );
        setFilteredCourses(updatedCourses);
        setSelectedCertificate(null);
      };
    
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
                Danh sách khóa học đang chờ duyệt chứng chỉ
              </h2>
            </div>
            <div className="flex items-center space-x-4">
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
    
          <div className="overflow-x-auto" style={{ maxHeight: '600px', minHeight: '200px' }}>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                      {course.statusbar === "Chờ duyệt" && (
                        <>
                          <button 
                            className="text-green-400 hover:text-green-300"
                            onClick={() => handleViewCertificate(course)}
                            title="Xem chứng chỉ"
                          >
                            <Check size={18} />
                          </button>
                        </>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {/* Thông tin */}
          <div className="flex justify-between items-center mt-6 text-gray-300">
            <div>
              Hiển thị {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, filteredCourses.length)} của {filteredCourses.length} khóa học
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
    
          {/* Thông tin chứng chỉ */}
          {selectedCertificate && (
            <motion.div 
              ref={certificateSectionRef}
              className="mt-8 border-t border-gray-700 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Thông tin chi tiết</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thông tin chi tiết chứng chỉ */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">Thông tin khóa học</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-sm">Tên khóa học:</p>
                      <p className="text-white font-medium">{selectedCertificate.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Tác giả:</p>
                      <p className="text-white font-medium">{selectedCertificate.actor}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Ngày phát hành:</p>
                      <p className="text-white font-medium">{selectedCertificate.date}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Thời lượng học:</p>
                      <p className="text-white font-medium">18 buổi</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Lĩnh vực:</p>
                      <p className="text-white font-medium">Điện lạnh</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Mã số:</p>
                      <p className="text-white font-medium">Cung cấp kiến thức về revit, và các điểm cầu, tải trọng và nguyên lý hoạt động của điều hòa VRV</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Duyệt bởi admin:</p>
                      <p className="text-white font-medium">{selectedCertificate.approved_by}</p>
                    </div>
                  </div>
                </div>
                
                {/* Hình ảnh chứng chỉ */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">Mẫu chứng chỉ:</h3>
                  
                  <div className="border-4 border-blue-800 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#4338ca">
                          <path d="M30,10 C10,15 5,30 5,50 C5,75 25,90 50,90 C75,90 95,75 95,50 C95,30 90,15 70,10 C60,7 40,7 30,10 Z" />
                          <path d="M20,25 C35,40 65,40 80,25" fill="none" stroke="#fff" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <div className="text-red-600 font-bold text-xl">ENGATECH</div>
                        <div className="text-blue-800 font-bold text-sm">MEP</div>
                      </div>
                      <div className="w-12 h-12">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#4338ca">
                          <path d="M30,10 C10,15 5,30 5,50 C5,75 25,90 50,90 C75,90 95,75 95,50 C95,30 90,15 70,10 C60,7 40,7 30,10 Z" />
                          <path d="M20,25 C35,40 65,40 80,25" fill="none" stroke="#fff" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>

                    <div className="text-center my-4">
                      <div className="bg-blue-800 text-white py-1 mb-1">
                        <h2 className="text-xl font-bold">CERTIFICATE</h2>
                      </div>
                      <div className="text-gray-700 mb-1 text-sm">OF COMPLETION</div>
                      <div className="text-red-600 font-bold text-lg mb-3">CHỨNG NHẬN HOÀN THÀNH KHÓA HỌC</div>
                      
                      <div className="text-gray-700 text-sm">
                        <p>Chứng chỉ mẫu</p>
                        <h3 className="text-lg font-bold text-blue-800 my-1">NGUYỄN VĂN A</h3>
                        <p className="mb-2">Has completed the training program:</p>
                        <h2 className="text-red-600 font-bold text-lg mb-1">{selectedCertificate.name}</h2>
                        <div className="text-xs text-gray-600 mt-2">Issue Date: {selectedCertificate.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Button chức năng */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleRejectCertificate}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Đánh dấu vi phạm
                </button>
                <button
                  onClick={handleApproveCertificate}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Duyệt
                </button>
              </div>
            </motion.div>
          )}
          
        </motion.div>
      );
}