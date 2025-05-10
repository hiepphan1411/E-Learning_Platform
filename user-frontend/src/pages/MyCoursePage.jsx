import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageSrc } from "../utils/processBase64";

function MyCoursePage() {
  const [userData, setUserData] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);

        fetch(`http://localhost:5000/api/user-courses/${parsedUserData.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.error) {
              setUserCourses(data);
            }
          })
          .catch((err) => {
            setError("Không thể tải khóa học");
            console.error("Error fetching courses:", err);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Lỗi localStorage:", error);
        setLoading(false);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Đang tải...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  function getDaysRemaining(expiryDate) {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const filteredCourses = userCourses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Khóa học của tôi</h1>

      {userCourses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Bạn chưa đăng ký khóa học nào</p>
          <Link to="/services" className="text-blue-600 hover:underline">
            Khám phá khóa học
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={getImageSrc(course.cover_image)}
                    alt={course.name}
                    className="w-full h-48 object-cover object-top"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "../avatarAdmin.png";
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {course.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          Ngày mua:{" "}
                          {new Date(course.purchaseDate).toLocaleDateString()}
                        </span>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            getDaysRemaining(course.expiryDate) <= 14
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          còn lại {getDaysRemaining(course.expiryDate)} ngày
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="mt-4 block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Vào học
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Không tìm thấy khóa học nào phù hợp
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCoursePage;
