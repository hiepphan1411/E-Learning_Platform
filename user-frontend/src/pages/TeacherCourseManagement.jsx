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
      const response = await fetch(
        `http://localhost:5000/api/all-data/courses/by/id/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }
      const data = await response.json();
      setSelectedCourse({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        cover_image: data.cover_image,
        lession: data.lession || [],
      });
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError(error.message);
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
        const res = await fetch(
          `http://localhost:5000/api/all-data/courses/by/id/${courseId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to delete course");
        }

        setCourses(courses.filter((course) => course.id !== courseId));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  if (isAdding) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Add New Course</h1>
        <CourseForm />
      </div>
    );
  }

  if (isEditing && selectedCourse) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
        <CourseForm initialData={selectedCourse} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý khóa học</h1>

      <div className="mb-6">
        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm khóa học mới
        </button>
      </div>

      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="flex flex-cols gap-6">
        <div className="w-full p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Khóa học của bạn</h2>
          {courses.length === 0 ? (
            <p>Chưa có khóa học nào. Hãy bắt đầu thêm khóa học mới.</p>
          ) : (
            <ul className="grid grid-cols-3 gap-6">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="border-b rounded py-4 px-4 bg-gray-50 shadow-md hover:shadow-xl hover:bg-gray-100 duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-gray-600">
                        Ngày tạo:{" "}
                        {new Date(course.posted_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Trạng thái: {course.statusbar}
                      </p>
                    </div>
                    <div className="flex items-center justify-between space-x-2 gap-2">
                      <button
                        onClick={() => handleEditCourse(course.id)}
                        className="text-green-500 hover:underline text-base"
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-500 hover:underline text-base"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseManagement;
