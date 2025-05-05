import { useEffect, useState } from "react";
import CourseCard from "../components/card/CourseCard";

function ServicePage() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/all-data/courses")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("fetch() got:", data);
        const formattedData = data.map((course) => ({
          id: course.id || course._id,
          actor: course.actor || "Unknown",
          image: course.image || course.cover_image || "../avatarAdmin.png",
          name: course.name || "Untitled Course",
          category: course.category
            ? typeof course.category === "object"
              ? `${course.category.field} - ${course.category.name}`
              : course.category
            : "Uncategorized",
          categoryObject: course.category || {
            name: "Uncategorized",
            field: "Other",
          },
          price: course.price || 0,
          date: course.date
            ? new Date(course.date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          statusbar: course.statusbar || "Chờ duyệt",
          certificate: course.certificate || null,
          video_courses: course.video_courses || [],
          outstanding: course.outstanding || false,

          _original: course,
          description: course.description || "Chưa có mô tả",
        }));
        setCourses(formattedData);
      })
      .catch((err) => {
        console.error("fetch() error:", err);
      });
  }, []);

  return (
    <div className="flex flex-col px-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-medium">Course</h1>
        <div className="grid grid-cols-4 gap-6">
          {courses.map((cou, index) => (
            <CourseCard key={index} course={cou} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
