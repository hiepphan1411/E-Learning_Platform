import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getImageSrc } from "../utils/processBase64";
import { getYouTubeVideoId } from "../utils/videoUtils";

function CourseTrialPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10 * 60); 
  const videoRef = useRef(null);
  const [showLockModal, setShowLockModal] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      navigate("/login");
      return;
    }

    setLoading(true);
    fetch(`http://localhost:5000/api/all-data/courses/by/id/${courseId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const formattedData = {
          id: data.id || data._id,
          actor: data.actor || "Unknown",
          image: data.image || data.cover_image || "../avatarAdmin.png",
          name: data.name || "Untitled Course",
          category: data.category
            ? typeof data.category === "object"
              ? `${data.category.field} - ${data.category.name}`
              : data.category
            : "Uncategorized",
          price: data.price || 0,
          description: data.description || "No description available",
          lession: data.lession || [] 
        };
        setCourse(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("fetch() error:", err);
        setLoading(false);
      });
  }, [courseId, navigate]);

  useEffect(() => {
    if (!loading && course) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, course]);

    const renderVideo = (videoUrl) => {
      const videoId = getYouTubeVideoId(videoUrl);
  
      if (!videoId) {
        return (
          <div className="bg-gray-100 p-8 rounded-lg text-center shadow-inner border border-gray-200">
            <div className="text-gray-500 text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Video không khả dụng hoặc URL không hợp lệ
            </div>
          </div>
        );
      }
  
      return (
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
          <iframe
            className="w-full h-[400px] max-h-[550px] min-h-[300px] rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePurchaseCourse = () => {
    navigate(`/payment/${courseId}`);
  };

  const handleSelectLesson = (index) => {
    if (index <= 1) { 
      setCurrentLessonIndex(index);
    } else {
      setShowLockModal(true);
    }
  };

  const handleSelectVideo = (index) => {
    setSelectedVideoIndex(index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Link to="/courses" className="text-blue-600 hover:underline">
          Browse all courses
        </Link>
      </div>
    );
  }

  const currentLesson = course.lession && course.lession.length > 0 
    ? course.lession[currentLessonIndex]
    : null;

  if (timeLeft === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Your trial session has ended</h2>
          <p className="text-gray-600 mb-6">
            Thank you for trying out this course. To continue learning, please purchase the full course.
          </p>
          <button
            onClick={handlePurchaseCourse}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
          >
            Purchase Full Course
          </button>
          <Link to="/services" className="block mt-4 text-teal-600 hover:underline">
            Browse other courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {showLockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in-down">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <svg className="h-10 w-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Locked Content</h3>
              <p className="text-gray-600 mb-6">
                This lesson is part of the full course. Purchase the complete course to unlock all content and features.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handlePurchaseCourse}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Purchase Full Course
                </button>
                <button
                  onClick={() => setShowLockModal(false)}
                  className="w-full sm:w-auto border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <Link to={`/services/${courseId}`} className="flex items-center text-gray-700 hover:text-teal-600">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to course details
        </Link>
        <div className="flex items-center">
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center mr-4">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
            </svg>
            Trial time: {formatTime(timeLeft)}
          </div>
          <button
            onClick={handlePurchaseCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Get Full Access
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-blue-600 text-white">
              <h3 className="text-lg font-semibold">Course Content</h3>
            </div>
            <div className="p-2">
              <p className="text-sm text-gray-500 mb-3 px-2">
                <span className="font-medium">Trial access:</span> First 2 lessons only
              </p>
              <ul className="space-y-1">
                {course.lession && course.lession.map((lesson, index) => (
                  <li 
                    key={index} 
                    className={`p-3 rounded-md cursor-pointer transition ${
                      currentLessonIndex === index 
                        ? "bg-teal-50 border-l-4 border-b;ue-600" 
                        : index <= 1 ? "hover:bg-gray-50" : "opacity-50"
                    }`}
                    onClick={() => handleSelectLesson(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {index <= 1 ? (
                          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                        <span className={index > 1 ? "text-gray-500" : ""}>
                          {lesson.name || `Lesson ${index + 1}`}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {index <= 1 ? (lesson.duration || "10 min") : "Locked"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden shadow-lg mb-6">
              {currentLesson && currentLesson.video_courses && currentLesson.video_courses.length > 0 ? (
                <>
                  {renderVideo(currentLesson.video_courses[selectedVideoIndex].link)}
                  
                  {currentLesson.video_courses.length > 1 && (
                    <div className="bg-gray-900 p-2">
                      <div className="flex overflow-x-auto space-x-2 py-1">
                        {currentLesson.video_courses.map((video, idx) => (
                          <button 
                            key={idx}
                            onClick={() => handleSelectVideo(idx)}
                            className={`px-3 py-2 text-sm rounded-md whitespace-nowrap ${
                              selectedVideoIndex === idx 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {video.name || `Video ${idx + 1}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center aspect-video bg-gray-800 text-white">
                  <div className="text-center p-6">
                    <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium">Trial Video Preview</h3>
                    <p className="text-sm text-gray-400 mt-2">
                      This is a preview of {course.name}. Purchase the full course for complete access.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">
                {currentLesson ? currentLesson.name : course.name} 
                <span className="ml-2 text-sm bg-teal-100 text-blue-800 px-2 py-1 rounded">Trial</span>
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">
                  {currentLesson && currentLesson.description 
                    ? currentLesson.description
                    : "This is a trial preview of the course content. Purchase the full course to access all lessons, resources, and exercises."}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Ready to continue learning?</h3>
              <p className="mb-4">Unlock the full course to access all lessons, exercises, and earn a certificate.</p>
              <button
                onClick={handlePurchaseCourse}
                className="bg-white text-teal-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Purchase Full Course Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseTrialPage;
