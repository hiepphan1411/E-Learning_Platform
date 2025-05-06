import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";;
import CourseForm from "../components/teacher/CourseForm";
import VideoUpload from "../components/teacher/VideoUpload";

function TeacherCourseManagement({ isAdding = false, isEditing = false }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/teacher/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
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
      const response = await fetch(`/api/courses/${id}`);
      const data = await response.json();
      setSelectedCourse(data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleAddCourse = () => {
    navigate('/teacher/courses/add');
  };

  const handleEditCourse = (courseId) => {
    navigate(`/teacher/courses/edit/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
        setCourses(courses.filter(course => course.id !== courseId));
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
      <h1 className="text-2xl font-bold mb-6">Course Management</h1>
      
      <div className="mb-6">
        <button 
          onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
          {courses.length === 0 ? (
            <p>No courses found. Start by adding a new course.</p>
          ) : (
            <ul>
              {courses.map(course => (
                <li key={course.id} className="border-b py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.students} enrolled</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleCourseSelect(course)}
                        className="text-blue-500 hover:underline"
                      >
                        Manage Videos
                      </button>
                      <button 
                        onClick={() => handleEditCourse(course.id)}
                        className="text-green-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedCourse && (
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Videos for {selectedCourse.title}
            </h2>
            <VideoUpload courseId={selectedCourse.id} />
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Current Videos:</h3>
              {selectedCourse.videos && selectedCourse.videos.length > 0 ? (
                <ul className="space-y-2">
                  {selectedCourse.videos.map(video => (
                    <li key={video.id} className="border-b py-2">
                      <div className="flex justify-between">
                        <p>{video.title}</p>
                        <div className="flex space-x-2">
                          <button className="text-green-500 hover:underline">Edit</button>
                          <button className="text-red-500 hover:underline">Delete</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No videos uploaded for this course yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherCourseManagement;
