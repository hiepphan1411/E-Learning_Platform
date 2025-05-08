import { useEffect, useState } from "react";
import { getImageSrc } from "../../utils/processBase64";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/course-author/${course.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setAuthor(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching author: ", err);
      });
  }, [course.id]);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">
      <div className="relative">
        <img
          src={getImageSrc(course.image)}
          alt={course.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "../avatarAdmin.png";
          }}
        />
        {course.outstanding && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {course.categoryObject?.name || "Uncategorized"}
          </span>
          <div className="text-right">
            {course.price > 0 ? (
              <span className="font-bold text-lg text-emerald-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(course.price)}
              </span>
            ) : (
              <span className="font-bold text-lg text-green-600">Free</span>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">
          {course.name}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">
          {course.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src={author ? getImageSrc(author.avatarData) : "../PPH.png"}
              alt="Instructor"
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">
              {author ? author.name : "Undifined"}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(course.date).toLocaleDateString()}
          </div>
        </div>

        <Link
          to={`/services/${course.id}`}
          className="mt-4 inline-block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
