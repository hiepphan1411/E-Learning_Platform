import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

function SuccessPage() {
  const { courseId } = useParams();
  const { user } = JSON.parse(localStorage.getItem("user")) || { user: {} };
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
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
          categoryObject: data.category || {
            name: "Uncategorized",
            field: "Other",
          },
          price: data.price || 0,
          date: data.date
            ? new Date(data.date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          statusbar: data.statusbar || "Chờ duyệt",
          certificate: data.certificate || null,
          lession: data.lession || null,

          outstanding: data.outstanding || false,
          description: data.description || "Chưa có mô tả",
        };
        setCourse(formattedData);
      })
      .catch((err) => {
        console.error("fetch() error:", err);
      });
  }, [courseId]);
  const handleStartLearning = () => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-50">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={200}
      />

      {course ? (
        <>
          <p className="text-xl text-gray-700 mb-8">
            Bạn đã tham gia khóa học {course.name} của HiGi. Chúc bạn có những
            phút giây
            <br />
            học tập vui vẻ và đạt kết quả tốt nhất nhé!
          </p>

          <p className="text-gray-500 mb-12">
            Người hướng dẫn - {course.actor || "Unknown"}
          </p>

          <button
            onClick={handleStartLearning}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md text-lg transition-colors"
          >
            BẮT ĐẦU HỌC
          </button>
        </>
      ) : (
        <p className="text-xl text-gray-700 mb-8">
          Đang tải thông tin khóa học...
        </p>
      )}
    </div>
  );
}

export default SuccessPage;
