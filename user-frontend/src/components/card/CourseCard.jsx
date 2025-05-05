import { useNavigate } from "react-router-dom";

function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-start justify-center bg-gray-100 rounded-lg py-2 px-2 hover:scale-105 duration-200 hover:shadow-lg"
      onClick={() => navigate(`/services/${course.id}`)}
    >
      <img src={course.cover_image}></img>
      <div className="font-bold">{course.name}</div>
      <div className="text-sm">{course.description}</div>
    </div>
  );
}

export default CourseCard;
