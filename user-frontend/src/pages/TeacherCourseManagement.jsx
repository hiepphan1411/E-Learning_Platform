import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseForm from "../components/teacher/CourseForm";
import VideoUpload from "../components/teacher/VideoUpload";

function TeacherCourseManagement({ isAdding = false, isEditing = false }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        if (!userInfo) {
          throw new Error("User not found");
        }

        const response = await fetch(
          `http://localhost:5000/api/teacher/courses/${userInfo.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!isAdding) {
      fetchCourses();
    }

    if (isEditing && courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId, isEditing, isAdding]);

  const fetchCourseDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/all-data/courses/by/id/${id}`);
      const data = await response.json();
      setSelectedCourse(data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleAddCourse = () => {
    navigate("/teacher/courses/add");
  };

  const handleEditCourse = (courseId) => {
    navigate(`/teacher/courses/edit/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await fetch(`/api/courses/${courseId}`, { method: "DELETE" });
        setCourses(courses.filter((course) => course.id !== courseId));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  if (isAdding) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Add New Course</h1>
          </div>
          <div className="p-6">
            <CourseForm />
          </div>
        </div>
      </div>
    );
  }

  if (isEditing && selectedCourse) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Edit Course</h1>
          </div>
          <div className="p-6">
            <CourseForm initialData={selectedCourse} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý khóa học</h1>
        <button
          onClick={handleAddCourse}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Thêm khóa học mới
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg text-gray-700">Đang tải...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Khóa học của bạn</h2>
          </div>
          
          <div className="p-6">
            {courses.length === 0 ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="mt-4 text-gray-600 text-lg">Chưa có khóa học nào. Hãy bắt đầu thêm khóa học mới.</p>
                <button
                  onClick={handleAddCourse}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  Thêm khóa học
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                      <h3 className="font-medium text-lg text-gray-800 truncate">{course.name}</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          Ngày tạo: {new Date(course.posted_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm mb-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          course.statusbar === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : course.statusbar === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {course.statusbar}
                        </span>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4 border-t border-gray-100 pt-4">
                        <button
                          onClick={() => handleEditCourse(course.id)}
                          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Chỉnh sửa
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherCourseManagement;